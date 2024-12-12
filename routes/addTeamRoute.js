import express from "express";
import { validateRequest } from "../middlewares/teamValidation.js";
import teamController from "../controllers/addTeamController.js";
import { addTeamSchema } from "../validationScehma/addTeamSchema.js"

const router = express.Router();

router.post('/add-team', validateRequest(addTeamSchema), teamController.addTeam);

export default router;
