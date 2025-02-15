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

    if (teamData["teamMembers"].filter(Boolean).length < 3) {
      logger.error("At least three members are required.");
      return res.status(400).json({
        success: false,
        error: "At least three members are required.",
      });
    }

    try {
      logger.info(`Creating team for committee: ${committe}, Team Name: ${teamName}`);
      const newTeam = await Team.create(teamData);
      logger.info(`Team created successfully: ${JSON.stringify(newTeam)}`);
      return res.status(201).json({ success: true, data: newTeam });
    } catch (error) {
      logger.error(`Error saving team: ${error.message}`);
      return next(error);
    }
  },

  getTeams: async (req, res, next) => {
    try {
      const teams = await Team.find();

      if (teams.length === 0) {
        return res.status(200).json({ success: true, message: "No teams have been registered!" });
      }

      return res.status(200).json({ success: true, data: teams });
    } catch (err) {
      console.error("Error fetching teams:", err);
      return res
        .status(500)
        .json({ success: false, message: "An error occurred while fetching teams." });
    }
  },

  updateTeam: async (req, res, next) => {
    const { id } = req.params; 
    const { committee: committe, teamName, teamMember1, teamMember2, teamMember3, teamMember4, teamMember5, teamMember6 } = req.body;
  
    if (!id) {
      logger.error("Team ID is required.");
      return res.status(400).json({ success: false, error: "Team ID is required." });
    }
  
    // Ensure teamMembers is passed in as an array
    const teamMembers = [
      teamMember1,
      teamMember2,
      teamMember3,
      teamMember4,
      teamMember5,
      teamMember6,
    ];
  
    try {
      const updatedTeam = await Team.findByIdAndUpdate(
        id,
        { committe, teamName, teamMembers },
        { new: true }  
      );
  
      if (!updatedTeam) {
        logger.error(`Team not found for ID: ${id}`);
        return res.status(404).json({ success: false, error: "Team not found." });
      }
  
      logger.info(`Team updated successfully: ${JSON.stringify(updatedTeam)}`);
      return res.status(200).json({ success: true, data: updatedTeam });
    } catch (err) {
      logger.error(`Error updating team: ${err.message}`);
      return res.status(500).json({ success: false, error: "An error occurred while updating the team." });
    }
  },  

  deleteTeam: async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
      logger.error("Team ID is required.");
      return res.status(400).json({ success: false, error: "Team ID is required." });
    }

    try {
      const deletedTeam = await Team.findByIdAndDelete(id);

      if (!deletedTeam) {
        logger.error(`Team not found for ID: ${id}`);
        return res.status(404).json({ success: false, error: "Team not found." });
      }

      logger.info(`Team deleted successfully: ${JSON.stringify(deletedTeam)}`);
      return res.status(200).json({ success: true, message: "Team deleted successfully." });
    } catch (err) {
      logger.error(`Error deleting team: ${err.message}`);
      return res.status(500).json({ success: false, error: "An error occurred while deleting the team." });
    }
  },
};

export default teamController;
