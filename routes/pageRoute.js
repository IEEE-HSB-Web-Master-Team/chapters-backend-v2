import express from "express"
import pageController from "../controllers/pageController.js"
import { upload } from '../helpers/multer.js'

const router = express.Router()

router.get('/committee', pageController.getCommittee)

router.get('', pageController.getHomePage)

router.post('/mega-events', upload.array('images'), pageController.uploadMegaEvents)

router.post('/competition', upload.array('images'), pageController.uploadCompetition)

router.post('/committee-logo', upload.single('logo'), pageController.uploadCommitteeLogo)

// router.post('/about-us', upload.array('images'))

router.post('/reviews', pageController.uploadReviews)

export default router