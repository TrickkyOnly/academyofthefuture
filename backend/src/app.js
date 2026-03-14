import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from './config/env.js';
import { publicRouter } from './routes/publicRoutes.js';
import { authRouter } from './routes/authRoutes.js';
import { adminRouter } from './routes/adminRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json({ limit: '2mb' }));
app.use(morgan('combined'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

app.get('/health', (_, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRouter);
app.use('/api', publicRouter);
app.use('/api/admin', adminRouter);

app.use(errorHandler);
