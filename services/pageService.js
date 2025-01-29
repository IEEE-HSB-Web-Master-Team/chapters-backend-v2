import App from "../models/pageModel.js"; 
import { logger } from "../config/logger.js";

class PageService {
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

    static async uploadReviews(reviewData, committeeName) {
        try {
            const updatedCommittee = await App.findOneAndUpdate(
                { committee: committeeName }, 
                {
                    $push: {
                        'home_page.reviews': reviewData, 
                    },
                },
                { new: true } 
            );
    
            if (!updatedCommittee) {
                logger.error(`Committee '${committeeName}' not found.`);
                throw new Error('Committee not found.');
            }
    
            logger.info(`Review uploaded successfully for committee: ${committeeName}`);
            return updatedCommittee;
        } catch (err) {
            logger.error(`Error uploading review: ${err.message}`);
            throw new Error(`Error uploading review: ${err.message}`);
        }
    }

    static async uploadMegaEvents(filePaths, committeeName) {
        try {
            const updatedCommittee = await App.findOneAndUpdate(
                { committee: committeeName },  
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
    
    static async uploadCompetitionImages(filePaths, committeeName) {
        try {
            const updatedCommittee = await App.findOneAndUpdate(
                { committee: committeeName },  
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

    static async uploadCommitteeLogo(filePath, committeeName) {
        try {
            const updatedCommittee = await App.findOneAndUpdate(
                { committee: committeeName },  
                { $set: { logo: filePath } },  
                { new: true, upsert: false }   
            );
    
            if (!updatedCommittee) {
                throw new Error("Committee not found.");
            }
    
            return updatedCommittee;
        } catch (err) {
            console.error("Error updating committee logo:", err);
            throw err;
        }
    }
}

export default PageService;