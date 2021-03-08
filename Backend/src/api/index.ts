import { Router } from 'express'
import UserRoutes from './User'
import FileRoutes from './Files'

const router = Router();

router.use('/user', UserRoutes)
router.use('/file', FileRoutes)

export default router;