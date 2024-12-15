import App from "../models/homePageModel.js"; 
import { logger } from "../config/logger.js";

class HomePageService {
    static async getPageInfo(committeeName) {
        try {
            const committeeInfo = await App.findOne({ committee: committeeName.toLowerCase() });
            
            if (!committeeInfo) {
                logger.error(`No committee found for: ${committeeName.toLowerCase()}`);
            }

            logger.info(`Committee found: ${committeeInfo.committee}`);
            return committeeInfo; 
        } catch (error) {
            logger.error(`Error fetching committee: ${error.message}`);
            throw new Error(`Error fetching committee: ${error.message}`);
        } 
    }
}

export default HomePageService;