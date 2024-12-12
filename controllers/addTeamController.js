import Team from "../models/teamModel.js";
import { logger } from "../config/logger.js";


const teamController = {
    addTeam: async (req, res, next) => {
        
        const { committe, teamName, teamMember1, teamMember2, teamMember3, teamMember4, teamMember5, teamMember6 } = req.body;

        if (!committe) {
          logger.error("Committee name is required.");
          return res.status(400).json({ success: false, error: "Committee name is required." });
        }

        const teamData = {
          committe,
          teamName,
          teamMembers: [teamMember1, teamMember2, teamMember3, teamMember4, teamMember5, teamMember6],
      };
        
        if (teamData['teamMembers'].filter(Boolean).length < 3) {
          logger.error("At least three members are required.");
          return res.status(400).json({ 
            success: false, 
            error: "At least three members are required." 
          });
        }

        try {
            logger.info(`Creating team for committee: ${committe}, Team Name: ${teamName}`);
            const newTeam = await Team.create(teamData);
            logger.info(`Team created successfully: ${JSON.stringify(newTeam)}`);
            return res.status(201).json({ success: true, data: newTeam });
          } catch (error) {
            logger.error(`Error saving team: ${error.message}`);
            return next(error)
          }
    }
}

export default teamController