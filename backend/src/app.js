import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import { publicRouter } from './routes/publicRoutes.js';
import { authRouter } from './routes/authRoutes.js';
import { adminRouter } from './routes/adminRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json({ limit: '200kb' }));
app.use(morgan('combined'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

app.get('/health', (_, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRouter);
app.use('/api', publicRouter);
app.use('/api/admin', adminRouter);

app.use(errorHandler);
