import express from "express"
import getHomePageController from "../controllers/getHomeController.js"
const router = express.Router()

router.get('/committee', getHomePageController.getCommittee)

router.get('', getHomePageController.getHomePage)

export default router