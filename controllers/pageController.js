import PageService from "../services/pageService.js";
import { logger } from "../config/logger.js";

const pageController = {
  getCommittee: async (req, res, next) => {
    let { committee } = req.query;

    committee = committee ? committee.trim() : "";

    if (!committee) {
      logger.error("Committee name is required.");
      return res.status(400).json({ success: false, error: "Committee name is required." });
    }

    try {
      const committeeInfo = await PageService.getPageInfo(committee);

      if (!committeeInfo) {
        logger.error(`Committee '${committee}' does not exist.`);
        return res.status(404).json({ success: false, error: "Committee not found." });
      }

      logger.info("Successfully fetched info for committee.");
      res.status(200).json({ success: true, committeeInfo });
    } catch (error) {
      logger.error(`Error in getCommittee API: ${error.message}`);
      res.status(500).json({ success: false, error: "Internal Server Error." });
    }
  },

  getHomePage: async (req, res, next) => {
    try {
      const homePageInfo = await PageService.getPageInfo('home');
      
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

  uploadMegaEvents: async (req, res, next) => {

    const { folderName, committee } = req.query

    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, error: "No files uploaded" });
      }
  
      const filePaths = req.files.map(file => `/assets/${folderName}/mega_events/${file.filename}`);
  
      await PageService.uploadMegaEvents(filePaths, committee);
  
      res.status(200).json({
        success: true,
        message: "Mega events uploaded successfully!",
        filePaths, 
      });
    } catch (error) {
      logger.error(`Error uploading mega events: ${error.message}`);
      res.status(500).json({ success: false, error: "Failed to upload mega events" });
    }
  },

  uploadCompetition: async (req, res, next) => {

    const { folderName, committee } = req.query

    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, error: "No files uploaded" });
      }
  
      const filePaths = req.files.map(file => `/assets/${folderName}/competition/${file.filename}`);
  
      await PageService.uploadCompetitionImages(filePaths, committee);
  
      res.status(200).json({
        success: true,
        message: "Competition images uploaded successfully!",
        filePaths,
      });
    } catch (error) {
      logger.error(`Error uploading competition images: ${error.message}`);
      res.status(500).json({ success: false, error: "Failed to upload competition images" });
    }
  },

  uploadReviews: async(req, res, next) => {
    const { committee } = req.query
    const { review, author, jobTitle } = req.body;
    console.log(committee)
    console.log(req.body)
    
    if (!committee || !review || !author || !jobTitle) {
      logger.error("Missing required fields for review upload.");
      return res.status(400).json({ success: false, error: "Missing required fields." });
    }


    try {
      const reviewData = { review, author, jobTitle };
      const updatedCommittee = await PageService.uploadReviews(reviewData, committee);

      res.status(200).json({
          success: true,
          message: "Review uploaded successfully!",
          committeeInfo: updatedCommittee,
      });
    } catch (error) {
        logger.error(`Error uploading review: ${error.message}`);
        res.status(500).json({ success: false, error: "Failed to upload review." });
    }
  }
};

export default pageController;
