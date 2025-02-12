import express from "express"
import pageController from "../controllers/pageController.js"
import { upload } from '../helpers/multer.js'
import { Auth } from "../middlewares/checkingAuth.js"

const router = express.Router()

router.get('/committee', pageController.getCommittee)

router.get('', pageController.getHomePage)

// router.use(Auth)

router.post('/committee', pageController.addCommittee)

router.patch('/committee/:committeeName', pageController.updateCommittee)

router.delete('/committee/:committeeName', pageController.deleteCommittee)

router.post('/mega-events', upload.array('images'), pageController.uploadMegaEvents) 
 
router.post('/competition', upload.array('images'), pageController.uploadCompetition)

router.post('/committee-logo', upload.single('logo'), pageController.uploadCommitteeLogo) 

// router.post('/about-us', upload.array('images'))

router.post('/reviews', pageController.uploadReviews)

export default router