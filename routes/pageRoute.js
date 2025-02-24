import express from "express"
import pageController from "../controllers/pageController.js"
import { upload } from '../helpers/multer.js'
import { Auth } from "../middlewares/checkingAuth.js"

const router = express.Router()

router.get('/committee', pageController.getCommittee)

router.get('', pageController.getHomePage)

router.post('/contact', pageController.addContact)

router.use(Auth)

router.post('/committee', pageController.addCommittee)

router.patch('/committee/:committeeName', pageController.updateCommittee)

router.delete('/committee/:committeeName', pageController.deleteCommittee)

router.post('/mega-events', upload.array('images'), pageController.uploadMegaEvents) 
 
router.post('/competition', upload.array('images'), pageController.uploadCompetition)

router.post('/committee-logo', upload.single('logo'), pageController.uploadCommitteeLogo) 

router.post('/history', upload.array('images'), pageController.uploadHistory) 

router.post('/ieee-teamMembers', upload.array('images'), pageController.uploadIeeeTeamMembers)

router.get('/gallery', pageController.getGallery)

// ? WTF!
// router.post('/events', upload.array('images'), pageController.uploadEvents)

router.delete('/image/:imageID', pageController.deleteImage)

router.post('/reviews', pageController.uploadReviews)

router.get('/contacts', pageController.getContacts)

export default router