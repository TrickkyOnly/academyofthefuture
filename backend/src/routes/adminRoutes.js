import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import {
  listApplications,
  getStats,
  upsertReview,
  upsertSpecialist,
  upsertBlogPost,
  upsertPage
} from '../controllers/adminController.js';

export const adminRouter = Router();
adminRouter.use(requireAuth);

adminRouter.get('/applications', listApplications);
adminRouter.get('/stats', getStats);
adminRouter.post('/reviews', upsertReview);
adminRouter.post('/specialists', upsertSpecialist);
adminRouter.post('/blog', upsertBlogPost);
adminRouter.post('/pages', upsertPage);
