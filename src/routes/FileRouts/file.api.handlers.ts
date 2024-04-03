import { Response } from 'express'
import fs from 'fs'
import logger from 'jet-logger'
import HttpStatusCodes from '@src/constants/HttpStatusCodes'
import { AuthenticatedRequest } from '@src/middleware/AuthMiddleware'
import { Files } from '@src/repos/entities/Files'
import { filesRepository, userRepository } from '@src/index'

export const FILE_UPLOAD_ERR = 'File upload failed!'
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

// **** Export default **** //
export default {
	uploadFile,
  deleteFile
} as const
