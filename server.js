import express from "express";
import { connectDB } from "./config/database.js";
import { configDotenv } from "dotenv";
import homePageRouter from "./routes/getHomeRoute.js";
import addTeamRouter from "./routes/addTeamRoute.js";
import { logger } from "./config/logger.js";
import toobusy_js from "toobusy-js";
import helmet from "helmet";

configDotenv();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
toobusy_js.maxLag(500); // Adjust sensitivity to avoid false positives
app.use(express.json());

// Ensure database connection for every request
app.use(async (req, res, next) => {
	try {
		await connectDB();
		next();
	} catch (error) {
		logger.error("Database connection failed:", error);
		res.status(500).json({
			success: false,
			message: "Internal Server Error: Database connection failed",
		});
	}
});

// Log incoming requests
app.use((req, _, next) => {
	logger.info(`Incoming request: ${req.method} ${req.url}`);
	next();
});

// Routes
app.use("/api/home", homePageRouter);
app.use("/api/home", addTeamRouter);

// Error handling
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

// Export the app for Vercel
export default app;

// Start server locally (development only)
if (process.env.STAGE !== "production") {
	const startServer = async () => {
		try {
			await connectDB();
			logger.info("Database connection established.");
			app.listen(PORT, () => {
				logger.info(`Server is listening on port ${PORT}`);
			});
		} catch (error) {
			logger.error(`Error starting the server: ${error.message}`);
			process.exit(1);
		}
	};

	startServer();
}
