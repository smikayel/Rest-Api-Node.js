import { Response } from "express";
import logger from "jet-logger";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { AuthenticatedRequest } from "@src/middleware/AuthMiddleware";

export const FILE_UPLOAD_ERR = "File upload failed!";

export const uploadFile = async (req: AuthenticatedRequest, res: Response) => {
 
  try {
    res.status(HttpStatusCodes.CREATED).json('');
  } catch (error) {
    logger.err(error);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: FILE_UPLOAD_ERR });
  }
};

// **** Export default **** //
export default {
  uploadFile,
} as const;
