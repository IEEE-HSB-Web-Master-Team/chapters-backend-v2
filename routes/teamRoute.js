import express from "express";
import { validateRequest } from "../middlewares/teamValidation.js";
import teamController from "../controllers/teamController.js";
import { addTeamSchema } from "../validationScehma/addTeamSchema.js"
import { Auth } from "../middlewares/checkingAuth.js";

const router = express.Router();

router.post('/add-team', validateRequest(addTeamSchema), teamController.addTeam);

router.use(Auth)

router.get('/teams', teamController.getTeams);

router.patch('/team/:id', teamController.updateTeam)

router.delete('/team/:id', teamController.deleteTeam)

export default router;
