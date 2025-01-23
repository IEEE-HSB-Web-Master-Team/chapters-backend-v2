import express from "express";
import { connectDB } from "./config/database.js";
import { configDotenv } from "dotenv";
import homePageRouter from "./routes/getHomeRoute.js";
import addTeamRouter from "./routes/addTeamRoute.js";
import { logger } from "./config/logger.js";
import helmet from "helmet";

configDotenv();

const app = express();
app.use(helmet());
app.use(express.json());

// Connect to the database
connectDB()
	.then(() => {
		logger.info("Database connection established.");
	})
	.catch((error) => {
		logger.error(`Error connecting to database: ${error.message}`);
		process.exit(1); // Exit if database connection fails
	});

// Log incoming requests
app.use((req, _, next) => {
	logger.info(`Incoming request: ${req.method} ${req.url}`);
	next();
});

// Routes
app.use("/api/home", homePageRouter);
app.use("/api/home", addTeamRouter);

// Error handling middleware
app.use((error, req, res, next) => {
	logger.error(`Error: ${error.message}`);
	logger.error(`Stack trace: ${error.stack}`);

	const statusCode = error.statusCode || 500;

	res.status(statusCode).json({
		success: false,
		message: error.message || "Internal Server Error",
		stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
	});
});

// Comment out app.listen() for Vercel
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     logger.info(`Server is listening on port ${PORT}`);
// });

export default app; // Export app for Vercel
