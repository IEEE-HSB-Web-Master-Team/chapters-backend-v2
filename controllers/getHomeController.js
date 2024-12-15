import HomePageService from "../services/homePageService.js";
import { logger } from "../config/logger.js";

const getHomePageController = {
  getCommittee: async (req, res, next) => {
    let { committee } = req.query;

    committee = committee ? committee.trim() : "";

    if (!committee) {
      logger.error("Committee name is required.");
      return res.status(400).json({ success: false, error: "Committee name is required." });
    }

    try {
      const committeeInfo = await HomePageService.getPageInfo(committee);

      if (!committeeInfo) {
        logger.error(`Committee '${committee}' does not exist.`);
        return res.status(404).json({ success: false, error: "Committee not found." });
      }

      logger.info(`Successfully fetched info for committee.`);
      res.status(200).json({ success: true, committeeInfo });
    } catch (error) {
      logger.error(`Error in getCommitte API: ${error.message}`);
      res.status(500).json({ success: false, error: "Internal Server Error." });
    }
  },

  getHomePage: async (req, res, next) => {
    try {
      const homePageInfo = await HomePageService.getPageInfo('home');
      
      if (!homePageInfo) {
        logger.error("Home page info not found.");
        return res.status(404).json({ success: false, error: "Home page not found." });
      }

      logger.info("Successfully fetched home page info.");
      res.status(200).json({ success: true, homePageInfo });
    } catch (error) {
      logger.error(`Error in getHomePage API: ${error.message}`);
      res.status(500).json({ success: false, error: "Internal Server Error." });
    }
  },
};

export default getHomePageController;
