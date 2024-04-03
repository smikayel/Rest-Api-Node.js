import { Router } from 'express';
import { uploadFile } from './file.api.handlers';
import { WithAuth } from '@src/middleware/AuthMiddleware';

const router = Router();

router.post('/', WithAuth, uploadFile);

export default router;
