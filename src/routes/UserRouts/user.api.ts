import validator, { RequestPart } from '@src/middleware/validator';
import { Router } from 'express';
import { createUser, getUserInfo } from './user.api.handlers';
import userSchema from './user.schema';
import { WithAuth } from '@src/middleware/AuthMiddleware';

const router = Router();

router.post('/signup', validator(userSchema.userAccount, RequestPart.BODY), createUser);
router.get('/info', WithAuth, getUserInfo);

export default router;
