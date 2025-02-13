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
      next(error);
    }
  },

  addCommittee: async (req, res, next) => {
    try {
      const { committee, logo, colors, socialMediaLinks, homePage, aboutPage, events } = req.body;

      const newCommittee = await PageService.addCommittee({
        committee,
        logo,
        colors,
        socialMediaLinks,
        homePage,
        aboutPage,
        events
      });

      return res.status(201).json({
        success: true,
        message: "Committee added successfully",
        committee: newCommittee
      });

    } catch (error) {
      logger.error(`Error adding committee: ${error.message}`);
      next(error);
    }
  },

  getHomePage: async (req, res, next) => {
    try {
      const homePageInfo = await PageService.getPageInfo("home");
      if (!homePageInfo) {
        logger.error("Home page info not found.");
        return res.status(404).json({ success: false, error: "Home page not found." });
      }

      logger.info("Successfully fetched home page info.");
      res.status(200).json({ success: true, homePageInfo });
    } catch (error) {
      logger.error(`Error in getHomePage API: ${error.message}`);
      next(error);
    }
  },

  uploadMegaEvents: async (req, res, next) => {
    const { folderName, committee } = req.query;
    const { title, date } = req.body;
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, error: "No files uploaded" });
      }

      const filePaths = req.files.map(file => ({
        title, 
        image: `/assets/${folderName}/mega_events/${file.filename}`,       
        date,         
      }));

      await PageService.uploadMegaEvents(filePaths, committee);

      res.status(200).json({
        success: true,
        message: "Mega events uploaded successfully!",
        filePaths
      });
    } catch (error) {
      logger.error(`Error uploading mega events: ${error.message}`);
      next(error);
    }
  },

  uploadCompetition: async (req, res, next) => {
    const { folderName, committee } = req.query;
    const { title, date } = req.body;
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, error: "No files uploaded" });
      }

      const filePaths = req.files.map(file => ({
        title, 
        image: `/assets/${folderName}/competition/${file.filename}`,       
        date,         
      }));

      await PageService.uploadCompetitionImages(filePaths, committee);

      res.status(200).json({
        success: true,
        message: "Competition images uploaded successfully!",
        filePaths
      });
    } catch (error) {
      logger.error(`Error uploading competition images: ${error.message}`);
      next(error);
    }
  },

  uploadReviews: async (req, res, next) => {
    const { committee } = req.query;
    const { review, author, jobTitle } = req.body;

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
        committeeInfo: updatedCommittee
      });
    } catch (error) {
      logger.error(`Error uploading review: ${error.message}`);
      next(error);
    }
  },

  uploadCommitteeLogo: async (req, res, next) => {
    const { folderName, committee } = req.query;

    try {
      if (!req.file) {
        return res.status(400).json({ success: false, error: "No file uploaded" });
      }

      if (!folderName) {
        return res.status(400).json({ success: false, error: "Missing folderName" });
      }

      const filePath = `/assets/${folderName}/committee_logo/${req.file.filename}`;

      if (!committee) {
        return res.status(400).json({ success: false, error: "Missing committee parameter" });
      }

      const updatedPage = await PageService.uploadCommitteeLogo(filePath, committee);

      return res.status(200).json({
        success: true,
        newLogo: updatedPage
      });

    } catch (error) {
      logger.error(`Error uploading committee logo: ${error.message}`);
      next(error);
    }
  },

  uploadMegaEvents: async (req, res, next) => {
    const { folderName, committee } = req.query;
    const { title, date } = req.body;
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, error: "No files uploaded" });
      }

      const filePaths = req.files.map(file => ({
        title, 
        image: `/assets/${folderName}/mega_events/${file.filename}`,       
        date,         
      }));

      await PageService.uploadMegaEvents(filePaths, committee);

      res.status(200).json({
        success: true,
        message: "Mega events uploaded successfully!",
        filePaths
      });
    } catch (error) {
      logger.error(`Error uploading mega events: ${error.message}`);
      next(error);
    }
  },

  uploadCompetition: async (req, res, next) => {
    const { folderName, committee } = req.query;
    const { title, date } = req.body;
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, error: "No files uploaded" });
      }

      const filePaths = req.files.map(file => ({
        title, 
        image: `/assets/${folderName}/competition/${file.filename}`,       
        date,         
      }));

      await PageService.uploadCompetitionImages(filePaths, committee);

      res.status(200).json({
        success: true,
        message: "Competition images uploaded successfully!",
        filePaths
      });
    } catch (error) {
      logger.error(`Error uploading competition images: ${error.message}`);
      next(error);
    }
  },

  uploadReviews: async (req, res, next) => {
    const { committee } = req.query;
    const { review, author, jobTitle } = req.body;

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
        committeeInfo: updatedCommittee
      });
    } catch (error) {
      logger.error(`Error uploading review: ${error.message}`);
      next(error);
    }
  },

  uploadCommitteeLogo: async (req, res, next) => {
    const { folderName, committee } = req.query;

    try {
      if (!req.file) {
        return res.status(400).json({ success: false, error: "No file uploaded" });
      }

      if (!folderName) {
        return res.status(400).json({ success: false, error: "Missing folderName" });
      }

      const filePath = `/assets/${folderName}/committee_logo/${req.file.filename}`;

      if (!committee) {
        return res.status(400).json({ success: false, error: "Missing committee parameter" });
      }

      const updatedPage = await PageService.uploadCommitteeLogo(filePath, committee);

      return res.status(200).json({
        success: true,
        newLogo: updatedPage
      });

    } catch (error) {
      logger.error(`Error uploading committee logo: ${error.message}`);
      next(error);
    }
  },

  uploadHistory: async (req, res, next) => {
    const { folderName, committee } = req.query;
    const { date, description } = req.body;

    try {
      if (!folderName || !committee || !date || !description) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, error: "No files uploaded" });
      }

      const historyData = req.files.map(file => ({
        date,
        image: `/assets/${folderName}/history/${file.filename}`,
        description,
      }));

      const updatedHistory = await PageService.uploadHistory(historyData, committee);
      
      return res.status(200).json({
        success: true,
        message: "History uploaded successfully!",
        updatedHistory
      });
    } catch (error) {
      logger.error(`Error uploading history: ${error.message}`);
      next(error);
    }
  },

  uploadIeeeTeamMembers: async (req, res, next) => {
    const { folderName, committee } = req.query;
    const { name, jobTitle } = req.body;

    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, error: "No files uploaded" });
      }

      const teaMemberssData = req.files.map(file => ({
        name, 
        image: `/assets/${folderName}/ieee-teamMembers/${file.filename}`,       
        jobTitle,         
      }));

      const updatedData = await PageService.uploadIeeeTeamMembers(teaMemberssData, committee);
      res.status(200).json({
        success: true,
        message: "History uploaded successfully!",
        updatedData
      });
    } catch (error) {
      logger.error(`Error uploading history: ${error.message}`);
      next(error);
    }
  },

  uploadEvents: async (req, res, next) => {
    const { committee } = req.query;
    const eventData = req.body;

    try {
      const updatedEvents = await PageService.uploadEvents(eventData, committee);
      res.status(200).json({
        success: true,
        message: "Events uploaded successfully!",
        updatedEvents
      });
    } catch (error) {
      logger.error(`Error uploading events: ${error.message}`);
      next(error);
    }
  },

  deleteImage: async (req, res, next) => {
    const { imageID } = req.params;
    const { committee } = req.query;

    try {
      await PageService.deleteImage(imageID, committee);
      res.status(204).end()
    } catch (error) {
      logger.error(`Error deleting image: ${error.message}`);
      next(error);
    }
  },

  updateCommittee: async (req, res, next) => {
    const { committeeName } = req.params;
    const updateData = req.body;

    try {
      const updatedCommittee = await PageService.updateCommittee(committeeName, updateData);

      if (!updatedCommittee) {
        logger.error(`Committee '${committeeName}' not found.`);
        return res.status(404).json({ success: false, error: "Committee not found." });
      }

      res.status(200).json({
        success: true,
        message: "Committee updated successfully",
        updatedCommittee
      });
    } catch (error) {
      logger.error(`Error updating committee: ${error.message}`);
      next(error);
    }
  },

  deleteCommittee: async (req, res, next) => {
    const { committeeName } = req.params;

    try {
      const deletedCommittee = await PageService.deleteCommittee(committeeName);

      if (!deletedCommittee) {
        logger.error(`Committee '${committeeName}' not found.`);
        return res.status(404).json({ success: false, error: "Committee not found." });
      }

      res.status(200).json({
        success: true,
        message: "Committee deleted successfully",
        deletedCommittee
      });
    } catch (error) {
      logger.error(`Error deleting committee: ${error.message}`);
      next(error);
    }
  }
};

export default pageController;
