import { Router, Request, Response } from 'express';
import { Assignment } from '../models/Assignment';

const router = Router();

router.get('/:id/pdf', async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment || assignment.status !== 'done' || !assignment.output) {
      return res.status(404).json({ error: 'Assignment output not ready' });
    }

    const { output } = assignment;
    const sectionsHtml = output.sections
      .map(
        (section) => `
        <div class="section">
          <h3 class="section-title">${section.title}</h3>
          <p class="section-instruction"><em>${section.instruction}</em></p>
          <ol class="questions">
            ${section.questions
              .map(
                (q) => `
              <li>
                <span class="q-text">${q.text}</span>
                <span class="q-meta">[${q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)} — ${q.marks} Mark(s)]</span>
              </li>
            `
              )
              .join('')}
          </ol>
        </div>
      `
      )
      .join('');

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; }
  body { font-family: 'Times New Roman', serif; color: #000; background: #fff; padding: 40px 60px; }
  h1 { text-align: center; font-size: 22px; margin-bottom: 4px; }
  h2, h3.sub { text-align: center; font-size: 16px; font-weight: normal; margin: 2px 0; }
  .meta { display: flex; justify-content: space-between; margin: 20px 0 8px; font-weight: bold; }
  .instruction { font-weight: bold; margin-bottom: 16px; }
  .student-info { margin-bottom: 24px; }
  .student-info .field { display: flex; gap: 8px; margin-bottom: 8px; font-weight: bold; }
  .student-info .line { border-bottom: 1px solid #000; flex: 1; min-width: 200px; }
  .section { margin-bottom: 28px; }
  .section-title { font-size: 16px; font-weight: bold; text-align: center; margin-bottom: 4px; }
  .section-instruction { text-align: center; margin-bottom: 12px; color: #333; }
  .questions { padding-left: 20px; }
  .questions li { margin-bottom: 12px; line-height: 1.5; }
  .q-meta { font-size: 12px; color: #555; margin-left: 8px; }
  .divider { border: none; border-top: 1px solid #000; margin: 20px 0; }
  .end { text-align: center; font-weight: bold; margin-top: 24px; }
</style>
</head>
<body>
  <h1>${output.schoolName}</h1>
  <h2 class="sub">Subject: ${output.subject}</h2>
  <h2 class="sub">Class: ${output.className}</h2>
  <div class="meta">
    <span>Time Allowed: ${output.timeAllowed}</span>
    <span>Maximum Marks: ${output.totalMarks}</span>
  </div>
  <p class="instruction">All questions are compulsory unless stated otherwise.</p>
  <hr class="divider">
  <div class="student-info">
    <div class="field"><span>Name:</span><div class="line"></div></div>
    <div class="field"><span>Roll Number:</span><div class="line"></div></div>
    <div class="field"><span>Section:</span><div class="line"></div></div>
  </div>
  <hr class="divider">
  ${sectionsHtml}
  <p class="end">— End of Question Paper —</p>
</body>
</html>`;

    // Use puppeteer if available, else return HTML for client-side printing
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const puppeteer = require('puppeteer') as typeof import('puppeteer');
      const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'load' });

      const pdf = await page.pdf({ format: 'A4', printBackground: true, margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' } });
      await browser.close();

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${assignment.title.replace(/\s+/g, '_')}.pdf"`,
      });
      return res.send(pdf);
    } catch {
      // Puppeteer unavailable — return HTML for browser print
      res.set('Content-Type', 'text/html');
      return res.send(html);
    }
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
