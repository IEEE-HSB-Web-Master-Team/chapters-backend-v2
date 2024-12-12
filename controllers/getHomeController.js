import HomePageService from "../services/homePageService.js";
import { logger } from "../config/logger.js";

const getHomePageController = {
  getCommitte: async (req, res, next) => {
    let { committee } = req.query;

    committee = committee ? committee.trim() : "";

    if (!committee) {
      next('route')
      logger.error("Committee name is required in getCommitte API.");
      return res.status(400).json({ success: false, error: "Committee name is required." });
    }

    try {
      const committeeInfo = await HomePageService.getCommitte(committee);

      if (!committeeInfo) {
        logger.error(`Committee '${committee}' does not exist.`);
        return res.status(404).json({ success: false, error: "Committee not found." });
      }

      logger.info(`Successfully fetched info for committee '${committee}'.`);
      res.status(200).json({ success: true, committeeInfo });
    } catch (error) {
      logger.error(`Error in getCommitte API: ${error.message}`);
      res.status(500).json({ success: false, error: "Internal Server Error." });
    }
  },
};

export default getHomePageController;
