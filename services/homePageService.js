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

    static async uploadMegaEvents(filePaths) {
        try {
            const updatedCommittee = await App.findOneAndUpdate(
                { committee: 'home' },  
                {
                    $push: {
                        'home_page.mega_events.images': { $each: filePaths }, 
                    }
                },
                { new: true, upsert: true } 
            );
    
            if (!updatedCommittee) {
                logger.error(`Failed to upload mega events.`);
                throw new Error('Failed to upload mega events.');
            }
    
            logger.info(`Successfully uploaded mega events: ${filePaths}`);
            return updatedCommittee;
        } catch (err) {
            logger.error(`Error uploading mega events: ${err.message}`);
            throw new Error(`Error uploading mega events: ${err.message}`);
        }
    }
    
    static async uploadCompetitionImages(filePaths) {
        try {
            const updatedCommittee = await App.findOneAndUpdate(
                { committee: 'home' },  
                {
                    $push: {
                        'home_page.competition.images': { $each: filePaths }, 
                    }
                },
                { new: true, upsert: true }
            );
    
            if (!updatedCommittee) {
                logger.error(`Failed to upload competition images.`);
                throw new Error('Failed to upload competition images.');
            }
    
            logger.info(`Successfully uploaded competition images: ${filePaths}`);
            return updatedCommittee;
        } catch (err) {
            logger.error(`Error uploading competition images: ${err.message}`);
            throw new Error(`Error uploading competition images: ${err.message}`);
        }
    }
}

export default HomePageService;