import express from "express"
import getHomePageController from "../controllers/getHomeController.js"
import { upload } from '../helpers/multer.js'

const router = express.Router()

router.get('/committee', getHomePageController.getCommittee)

router.get('', getHomePageController.getHomePage)

router.post('/mega-events', upload.array('images'), getHomePageController.uploadMegaEvents)

router.post('/competition', upload.array('images'), getHomePageController.uploadCompetition)

export default router