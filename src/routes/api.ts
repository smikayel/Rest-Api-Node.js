import { Router } from 'express'
import Paths from './constants/Paths'
import authRouter from './AuthRouts'
import userRouter from './UserRouts'
import fileRouter from './FileRouts'



// **** Base Routers For Api **** //
const apiRouter = Router()

apiRouter.use(Paths.Users.Base, userRouter)
apiRouter.use(Paths.Auth.Base, authRouter)
apiRouter.use(Paths.File.Base, fileRouter)

export default apiRouter
