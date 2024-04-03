import { WithAuth } from '@src/middleware/AuthMiddleware';
import validator, { RequestPart } from '@src/middleware/validator';
import { Router } from 'express';
import { createUser, updateOne, _delete as deleteUser, } from './user.api.handlers';
import userSchema from './user.schema';

const router = Router();

router.post('/signup', validator(userSchema.userAccount, RequestPart.BODY), createUser);
router.put('/:userId', validator(userSchema.userUpdate, RequestPart.BODY), updateOne);
router.delete('/:userId', WithAuth, deleteUser);

export default router;
