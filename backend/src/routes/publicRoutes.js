import { Router } from 'express';
import {
  createApplication,
  getPrograms,
  getSpecialists,
  getReviews,
  getBlog,
  getBlogPost,
  getServicePage
} from '../controllers/publicController.js';

export const publicRouter = Router();

publicRouter.get('/programs', getPrograms);
publicRouter.get('/specialists', getSpecialists);
publicRouter.get('/reviews', getReviews);
publicRouter.get('/blog', getBlog);
publicRouter.get('/blog/:slug', getBlogPost);
publicRouter.get('/services/:slug', getServicePage);
publicRouter.post('/applications', createApplication);
