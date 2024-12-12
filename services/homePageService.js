import App from "../models/homePageModel.js"; 

class HomePageService {
    static async getCommitte(committeeName) {
        try {
            const committeeInfo = await App.findOne({ committee: committeeName.toLowerCase() });
            
            if (!committeeInfo) {
                console.log("No committee found for:", committeeName.toLowerCase());
            }

            console.log(committeeInfo); 
            return committeeInfo; 
        } catch (error) {
            console.error("Error fetching committee:", error.message);
            throw new Error(`Error fetching committee: ${error.message}`);
        } 
    }
}

export default HomePageService;