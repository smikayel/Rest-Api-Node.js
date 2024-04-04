import { Response } from 'express'
import fs from 'fs'
import logger from 'jet-logger'
import HttpStatusCodes from '@src/constants/HttpStatusCodes'
import { AuthenticatedRequest } from '@src/middleware/AuthMiddleware'
import { Files } from '@src/repos/entities/Files'
import { filesRepository, userRepository } from '@src/index'
import { PaginationRequest } from '@src/middleware/PaginationMiddleware'

export const FILE_UPLOAD_ERR = 'File upload failed!'
export const FILE_DOWNLOAD_ERR = 'File download failed!'
export const VALIDATE_ERR = 'File was not provided!'

export const uploadFile = async (req: AuthenticatedRequest, res: Response) => {
	try {
		if (!req.user) {
			throw Error('Something went wrong!')
		}
		if (!req.file) {
			return res
				.status(HttpStatusCodes.BAD_GATEWAY)
				.json({ error: VALIDATE_ERR })
		}

		const userId = req.user.id
		const user = await userRepository.findOne({ where: { id: userId } })
		if (!user) {
			throw Error('User not found!')
		}

		const { originalname, mimetype, path, size } = req.file
		const file = new Files()
		file.name = originalname
		file.mimeType = mimetype
		file.size = size
		file.path = path
		file.user = user
		await filesRepository.save(file)

		res.status(HttpStatusCodes.CREATED).json({
      id: file.id,
			message: req.file,
		})
	} catch (error) {
		logger.err(error)
		res
			.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: FILE_UPLOAD_ERR })
	}
}

export const deleteFile = async (req: AuthenticatedRequest, res: Response) => {
	try {

		const fileId = parseInt(req.params.id)
  	const file = await filesRepository.findOne({ where: { id: fileId }, relations: ['user']})

		if (!file || file.user.id != req.user?.id) {
			return res.status(404).json({ error: 'File not found' })
		}

		fs.unlinkSync(file.path)
		await filesRepository.remove(file)

		res.status(HttpStatusCodes.OK).json({ message: 'File deleted successfully' })
	} catch (error) {
		logger.err(error)
		res
			.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: FILE_UPLOAD_ERR })
	}
}

export const updateFile = async (req: AuthenticatedRequest, res: Response) => {
	try {
		if (!req.user) {
			throw Error('Something went wrong!')
		}
		if (!req.file) {
			return res
				.status(HttpStatusCodes.BAD_GATEWAY)
				.json({ error: VALIDATE_ERR })
		}

    const fileId = parseInt(req.params.id)
  	const file = await filesRepository.findOne({ where: { id: fileId }, relations: ['user']})

		if (!file || file.user.id != req.user?.id) {
			return res.status(404).json({ error: 'File not found' })
		}
    // remove old file (new file already saved with multer)
    fs.unlinkSync(file.path)

    const { originalname, mimetype, path, size } = req.file
		
		file.name = originalname
		file.mimeType = mimetype
		file.size = size
		file.path = path

    const updatedFile = await filesRepository.save({
      ...file,
      mimetype,
      size,
      path,
      name: originalname,
    });

		res.status(HttpStatusCodes.CREATED).json({
      id: updatedFile.id,
			message: req.file,
		})
	} catch (error) {
		logger.err(error)
		res
			.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: FILE_UPLOAD_ERR })
	}
}

export const downloadFile = async (req: AuthenticatedRequest, res: Response) => {
	try {
		if (!req.user) {
			throw Error('Something went wrong!')
		}
    const fileId = parseInt(req.params.id)
  	const file = await filesRepository.findOne({ where: { id: fileId }, relations: ['user']})

		if (!file || file.user.id != req.user?.id) {
			return res.status(404).json({ error: 'File not found' })
		}
    
    fs.access(file.path, fs.constants.F_OK, (err) => {
      if (err) {
        // If file does not exist, return 404 Not Found
        res.status(404).send('File not found');
        return;
      }
  
      // If file exists, set appropriate headers and send the file
      res.setHeader('Content-disposition', 'attachment; filename=' + file.name);
      const fileStream = fs.createReadStream(file.path);
      fileStream.pipe(res);
    });
	} catch (error) {
		logger.err(error)
		res
			.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: FILE_DOWNLOAD_ERR })
	}
}

export const listFiles = async (req: PaginationRequest, res: Response) => {
	try {
		if (!req.user) {
			throw Error('Something went wrong!')
		}
    const userId = req.user.id

    const files = await filesRepository.findAndCount({
      where: { user: { id: userId } },
      take: req.pageSize,
      skip: req.skip,
    });

    res
    .status(HttpStatusCodes.OK)
    .json({ results: files[0] })
	} catch (error) {
		logger.err(error)
		res
			.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: error })
	}
}


// **** Export default **** //
export default {
	uploadFile,
  deleteFile,
  updateFile,
  downloadFile,
  listFiles
} as const
