import express from "express";
import { validateRequest } from "../middlewares/teamValidation.js";
import teamController from "../controllers/addTeamController.js";
import { addTeamSchema } from "../validationScehma/addTeamSchema.js"

const router = express.Router();

router.post('/add-team', validateRequest(addTeamSchema), teamController.addTeam);

router.get('/teams', teamController.getTeams);

router.patch('/teams', teamController.updateTeam)

router.delete('/teams', teamController.deleteTeam)

export default router;
