import { object, string } from 'joi';

const contactSchema = object({
  name: string().min(2).max(100).required(),
  email: string().email().required(),
  company: string().allow('', null),
  message: string().min(5).max(1000).required(),
});

export default contactSchema;
