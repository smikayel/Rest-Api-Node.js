import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { RouteError } from '@src/other/classes';
import { userRepository } from '@src/index';
import PwdUtil from '../../util/PwdUtil'
import { Request, Response } from 'express';
import { tick } from '@src/util/misc';
import jwt from 'jsonwebtoken';
import EnvVars from '@src/constants/EnvVars';
import logger from 'jet-logger';
import { TokenPayload } from '@src/middleware/AuthMiddleware';

// Errors
export const AUTHENTICATION_FAILED_ERR = 'Email or password wrong!';
export const SOMETHING_WENT_WRONG_ERR = 'Something went wrong!'

export const Errors = {
  Unauth: 'Unauthorized',
  EmailNotFound(email: string) {
    return `User with email "${email}" not found`;
  },
} as const;

export const login = async (req: Request, res: Response) => {

  const email = req.body.email
  const password = req.body.password

  // Fetch user
  const user = await userRepository.findOne({where: { email }});
  if (!user) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      Errors.EmailNotFound(email),
    );
  }
  // Check password
  const hash = (user.password ?? ''),
  pwdPassed = await PwdUtil.compare(password, hash);
  if (!pwdPassed) {
    // If password failed, wait 500ms this will increase security
    await tick(500);
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED, 
      Errors.Unauth,
    );
  }
  try {
    const AuthToken = jwt.sign({ email, id: user.id }, EnvVars.Jwt.Secret, { expiresIn: EnvVars.Jwt.Exp });
    const refreshToken = jwt.sign({ email, id: user.id }, EnvVars.refreshJwt.Secret, { expiresIn: EnvVars.refreshJwt.Exp });

    user.refreshToken = refreshToken //save refresh token also in database (to be sure that the token is correct, and it's not old token)
    userRepository.save(user)

    res.status(HttpStatusCodes.OK).json({AuthToken, refreshToken, user: {id: user.id, email: user.email}});
  } catch (err) {
	logger.err(err)
	res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: SOMETHING_WENT_WRONG_ERR });
  }
}

export const updateRefreshToken =  async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken
  try {
    const decodedToken = jwt.verify(refreshToken, EnvVars.refreshJwt.Secret) as TokenPayload;
    const { id } = decodedToken;
    const user = await userRepository.findOne({where: { id }});
    if (!user || user.refreshToken  != refreshToken) {
      return res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: 'Invalid token!' });
    }
    const updatedRefreshToken = jwt.sign({ email: user.email, id: user.id }, EnvVars.refreshJwt.Secret, { expiresIn: EnvVars.refreshJwt.Exp });

  } catch (err) {
    logger.err(err)
    return res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: 'Invalid or expired token' });
  }
}

// **** Export default **** //
export default {
  login,
  updateRefreshToken
} as const;
