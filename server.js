import express from "express";
import { connectDB } from "./config/database.js";
import { configDotenv } from "dotenv";
import homePageRouter from "./routes/getHomeRoute.js";
import addTeamRouter from "./routes/addTeamRoute.js";
import { logger } from "./config/logger.js";
import toobusy_js from "toobusy-js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import cors from "cors";
import helmet from "helmet";
import App from "./models/homePageModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

configDotenv();

const PORT = process.env.PORT || 5000;
const app = express();

// Middlewares
app.use(helmet());
toobusy_js.maxLag(200);

app.use(express.json());
app.use("/assets", express.static(path.join("..", "public", "assets"))); // maybe the error of getting images because of this!!
app.use(cors());

app.use((req, res, next) => {
	if (toobusy_js()) {
		logger.warn("Server is busy");
		res
			.status(503)
			.json({ success: false, message: "Server too busy, try again later." });
	} else {
		next();
	}
});

// App
app.use((req, _, next) => {
	logger.info(`Incoming request: ${req.method} ${req.url}`);
	next();
});

app.use("/api/home", homePageRouter);
app.use("/api/home", addTeamRouter);

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
