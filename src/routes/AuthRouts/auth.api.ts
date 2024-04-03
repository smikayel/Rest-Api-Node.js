import validator, { RequestPart } from '@src/middleware/validator';
import { Router } from 'express';
import { login, updateRefreshToken, logout } from './auth.api.handlers';
import authSchema from './auth.schema';
import { WithAuth } from '@src/middleware/AuthMiddleware';

const router = Router();

router.post('/signin', validator(authSchema.login, RequestPart.BODY), login);
router.post('/signin/new_token', validator(authSchema.newToken, RequestPart.BODY), updateRefreshToken);
router.get('/logout', WithAuth, logout);

export default router;
