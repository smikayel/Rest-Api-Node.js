import validator, { RequestPart } from '@src/middleware/validator';
import { Router } from 'express';
import { login, updateRefreshToken } from './auth.api.handlers';
import authSchema from './auth.schema';

const router = Router();

router.post('/signin', validator(authSchema.login, RequestPart.BODY), login);
router.post('/signin/new_token', validator(authSchema.newToken, RequestPart.BODY), updateRefreshToken);

export default router;
