import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Assignment } from '../models/Assignment';
import { assignmentQueue } from '../queues/queue';
import { broadcast } from '../ws/server';
import { extractTextFromFile } from '../services/fileExtractor';

const router = Router();

const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['.pdf', '.txt', '.png', '.jpg', '.jpeg'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) cb(null, true);
    else cb(new Error('Unsupported file type'));
  },
});

router.post('/', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const { title, dueDate, subject, className, questionTypes, additionalInstructions } =
      req.body;

    if (!title || !dueDate || !subject || !className) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let parsedQTypes;
    try {
      parsedQTypes = typeof questionTypes === 'string' ? JSON.parse(questionTypes) : questionTypes;
    } catch {
      return res.status(400).json({ error: 'Invalid questionTypes format' });
    }

    if (!Array.isArray(parsedQTypes) || parsedQTypes.length === 0) {
      return res.status(400).json({ error: 'At least one question type is required' });
    }

    for (const qt of parsedQTypes) {
      if (!qt.type || qt.count < 1 || qt.marksEach < 1) {
        return res.status(400).json({ error: 'Invalid question type data' });
      }
    }

    let filePath: string | undefined;
    let fileText: string | undefined;

    if (req.file) {
      filePath = req.file.path;
      fileText = await extractTextFromFile(filePath, req.file.mimetype);
    }

    const assignment = await Assignment.create({
      title,
      dueDate,
      subject,
      className,
      questionTypes: parsedQTypes,
      additionalInstructions: additionalInstructions || '',
      filePath,
      fileText,
      status: 'queued',
    });

    const job = await assignmentQueue.add('generate', { assignmentId: assignment.id });

    await Assignment.findByIdAndUpdate(assignment.id, { jobId: job.id });

    broadcast({ type: 'job:queued', assignmentId: assignment.id });

    return res.status(201).json({ assignment });
  } catch (err: any) {
    console.error('POST /assignments error:', err);
    return res.status(500).json({ error: err.message });
  }
});

router.get('/', async (_req: Request, res: Response) => {
  try {
    const assignments = await Assignment.find()
      .select('title dueDate subject className status createdAt')
      .sort({ createdAt: -1 });
    return res.json({ assignments });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });
    return res.json({ assignment });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });
    return res.json({ message: 'Deleted' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

router.post('/:id/regenerate', async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });

    await Assignment.findByIdAndUpdate(req.params.id, {
      status: 'queued',
      output: undefined,
      error: undefined,
    });

    const job = await assignmentQueue.add('generate', { assignmentId: assignment.id });
    await Assignment.findByIdAndUpdate(req.params.id, { jobId: job.id });

    broadcast({ type: 'job:queued', assignmentId: assignment.id });

    return res.json({ message: 'Regeneration queued' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
