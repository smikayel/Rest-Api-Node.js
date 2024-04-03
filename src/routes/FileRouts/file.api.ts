import { Router } from 'express';
import { uploadFile, deleteFile } from './file.api.handlers';
import { WithAuth } from '@src/middleware/AuthMiddleware';
import { multerMiddleware } from '@src/middleware/MulterMiddleware';
import validator, { RequestPart } from '@src/middleware/validator';
import fileSchema from './file.schema';

const router = Router();

router.post('/upload', WithAuth, multerMiddleware.single('file'), uploadFile);
router.delete('/delete/:id', WithAuth, validator(fileSchema.idValidation, RequestPart.PARAMS), deleteFile);

export default router;
