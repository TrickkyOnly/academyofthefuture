import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { requireAuth } from '../middlewares/auth.js';
import {
  listApplications,
  getStats,
  upsertReview,
  upsertSpecialist,
  upsertBlogPost,
  upsertPage
} from '../controllers/adminController.js';
import { uploadImage } from '../controllers/uploadController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.resolve(__dirname, '../../uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadsDir),
  filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`)
});
const upload = multer({ storage });

export const adminRouter = Router();
adminRouter.use(requireAuth);

adminRouter.get('/applications', listApplications);
adminRouter.get('/stats', getStats);
adminRouter.post('/reviews', upsertReview);
adminRouter.post('/specialists', upsertSpecialist);
adminRouter.post('/blog', upsertBlogPost);
adminRouter.post('/pages', upsertPage);
adminRouter.post('/upload', upload.single('file'), uploadImage);
