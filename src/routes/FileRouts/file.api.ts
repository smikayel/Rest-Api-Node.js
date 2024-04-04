import { Router } from 'express';
import { uploadFile, deleteFile, updateFile, downloadFile, listFiles } from './file.api.handlers';
import { WithAuth } from '@src/middleware/AuthMiddleware';
import { multerMiddleware } from '@src/middleware/MulterMiddleware';
import validator, { RequestPart } from '@src/middleware/validator';
import fileSchema from './file.schema';
import { WithPagination } from '@src/middleware/PaginationMiddleware';

const router = Router();

router.post('/upload', WithAuth, multerMiddleware.single('file'), uploadFile);
router.get('/list', WithAuth, WithPagination, listFiles);
router.put('/update/:id', WithAuth, validator(fileSchema.idValidation, RequestPart.PARAMS), multerMiddleware.single('file'), updateFile);
router.delete('/delete/:id', WithAuth, validator(fileSchema.idValidation, RequestPart.PARAMS), deleteFile);
router.get('/download/:id', WithAuth, validator(fileSchema.idValidation, RequestPart.PARAMS), downloadFile);


export default router;
