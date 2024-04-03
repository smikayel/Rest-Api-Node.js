import logger from "jet-logger";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { userRepository } from "@src/index";
import { User } from "@src/repos/entities/User";
import PwdUtil from "../../util/PwdUtil";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "@src/middleware/AuthMiddleware";

export const USER_NOT_FOUND_ERR = "User not found";
export const USER_CREATE_FAILED_ERR = "Failed to create user";

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = new User();
  user.email = email;
  user.password = await PwdUtil.getHash(password);

  try {
    const savedUser = await userRepository.save(user);
    res.status(HttpStatusCodes.CREATED).json(savedUser);
  } catch (error) {
    logger.err(error);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: USER_CREATE_FAILED_ERR });
  }
};

export const getUserInfo = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user
    if (!user) {
      throw Error(USER_NOT_FOUND_ERR)
    }
    res.status(HttpStatusCodes.OK).json({id: user.id, message: `Hello user ${user.email}!`});
  } catch (error) {
    logger.err(error);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: USER_NOT_FOUND_ERR });
  }
};

// **** Export default **** //
export default {
  createUser,
} as const;
