import multer from 'multer'

export const multerMiddleware = multer({ dest: 'storage/' })
