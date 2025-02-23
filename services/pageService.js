import App from "../models/pageModel.js"; 
import Contact from "../models/contactModel.js"
import { logger } from "../config/logger.js";
import { ObjectId } from 'mongodb';
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

    static async addCommittee({ committee, logo, colors, socialMediaLinks, homePage, aboutPage, events }) {
        try {
            const newCommittee = new App({
                committee,
                logo,
                colors,
                socialMediaLinks,
                homePage,
                aboutPage,
                events
            });

            await newCommittee.save();
            return newCommittee;
        } catch (error) {
            throw new Error("Error adding committee: " + error.message);
        }
    }

    static async addContact(data) {
        try {
            const newContact = new Contact(data);
            await newContact.save();
            return newContact;
        } catch (error) {
            logger.error("Error in PageService.addContact:", error);
            throw error; 
        }
    }

    static async getContacts() {
        try {
            const data = await Contact.find({}, { updatedAt: 0, __v: 0 });
            return data;
        } catch (error) {
            logger.error("Error fetching contacts:", error);
            throw error; 
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

    static async uploadHistory(historyData, committeeName) {
        try {
            const updateHistory = await App.findOneAndUpdate(
                { committee: committeeName },
                {
                    $push: {
                        'aboutPage.history.description': historyData
                    }
                },
                { new: true, upsert: true }
            );
    
            return updateHistory;
        } catch (error) {
            console.error("Error uploading history:", error);
            throw error;
        }
    }
    
    static async uploadIeeeTeamMembers(teamMembersData, committeeName) {
        try {
            const updateTeam = await App.findOneAndUpdate(
                { committee: committeeName },
                {
                    $push: {
                        'aboutPage.team.members': teamMembersData
                    }
                },
                { new: true, upsert: true }
            );
    
            return updateTeam;
        } catch (error) {
            logger.error("Error uploading IEEE team members:", error);
            throw error;
        }
    }
    
    static async uploadEvents(eventsData, committeeName) {
        try {
            const updateEvents = await App.findOneAndUpdate(
                { committee: committeeName },
                {
                    $push: {
                        'events.timeline.events': eventsData 
                    }
                },
                { new: true, upsert: true }
            );
    
            return updateEvents;
        } catch (error) {
            logger.error("Error uploading events:", error);
            throw error;
        }
    }
    


    static async uploadMegaEvents(filePaths, committeeName) {
        try {
            const updatedCommittee = await App.findOneAndUpdate(
                { committee: committeeName },  
                {
                    $push: {
                        'homePage.megaEvents.images': { $each: filePaths }, 
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
                        'homePage.competition.images': { $each: filePaths }, 
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

    static async updateCommittee(committeeName, updateData) {
        try {
            const updatedCommittee = await App.findOneAndUpdate(
                { committee: committeeName.toLowerCase() },
                { $set: updateData },
                { new: true }
            );

            if (!updatedCommittee) {
                throw new Error('Committee not found.');
            }

            return updatedCommittee;
        } catch (error) {
            throw new Error(`Error updating committee: ${error.message}`);
        }
    }

    // !Zyad-Amr masterpiece
    static async deleteImage(imageID, committeeName) {
        try {
            const committee = await App.findOne({ committee: committeeName }).lean();
            if (!committee) return { success: false, message: "Committee not found." };
    
            let isDeleted = false;
    
            // time complexity: O(Keys)
            async function recursiveSearch(obj, path = []) {
                for (const key of Object.keys(obj)) {

                    if(key === 'buffer') continue; // heavy pruning

                    const currentPath = [...path, key];
                    if (Array.isArray(obj[key])) {
                        for (let i = 0; i < obj[key].length; i++) {
                            if (obj[key][i]._id?.toString() === imageID) {
                                const arrayPath = currentPath.join('.'); // homePage.blabla.x
                                await App.updateOne(
                                    { committee: committeeName },
                                    { $pull: { [arrayPath]: { _id: new ObjectId(imageID) } } }
                                );
                                isDeleted = true;
                                return;
                            }
                            if (typeof obj[key][i] === 'object') {
                                await recursiveSearch(obj[key][i], currentPath);
                                if (isDeleted) return;
                            }
                        }
                    }
                    // DFS for nested objects... go study it!
                    else if (typeof obj[key] === 'object' && obj[key] !== null) {
                        await recursiveSearch(obj[key], currentPath);
                        if (isDeleted) return;
                    }
                }
            }
    
            await recursiveSearch(committee);
            
            return isDeleted 
                ? { success: true, message: "Image deleted successfully." }
                : { success: false, message: "Image not found." };
    
        } catch (error) {
            logger.error(`Error deleting image: ${error.message}`);
            return { success: false, error: "Error deleting image." };
        }
    }          
}

export default PageService;