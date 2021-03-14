import { Router } from 'express'
import UserRoutes from './User'
import FileRoutes from './Files'
import ProcessRoutes from './Process'

const router = Router();

router.use('/user', UserRoutes)
router.use('/file', FileRoutes)
router.use('/process', ProcessRoutes)

export default router;