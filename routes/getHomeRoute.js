import express from "express"
import getHomePageController from "../controllers/getHomeController.js"
const router = express.Router()

router.get('/Home', getHomePageController.getCommitte)

router.get('/Home', (req,res,next) => {
    return res.send("hello from route 2")
})

export default router