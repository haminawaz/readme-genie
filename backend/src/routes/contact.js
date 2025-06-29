import { Router } from 'express';
const router = Router();
const { bodyValidator } = '../middlewares/joi.js';
import { contactUs } from '../controllers/contact';

// POST /contact - send email to admin, validated by Joi
router.post(
  '/',
  bodyValidator('contactSchema'),
  contactUs
);

export default router;
