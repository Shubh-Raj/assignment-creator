import express from 'express';
import cors from 'cors';
import path from 'path';
import assignmentsRouter from './routes/assignments';
import pdfRouter from './routes/pdf';

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/assignments', assignmentsRouter);
app.use('/api/assignments', pdfRouter);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

export default app;
