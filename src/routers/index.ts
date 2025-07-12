import { Router } from "express";

import api from './api'
import root from './root'

const router = Router()

router.use('/api', api)
router.use('/', root)

export default router