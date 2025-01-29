import express from "express";
import { connectDB } from "./config/database.js";
import { configDotenv } from "dotenv";
import homePageRouter from "./routes/pageRoute.js";
import addTeamRouter from "./routes/teamRoute.js";
import { logger } from "./config/logger.js";
import toobusy_js from "toobusy-js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

configDotenv();

const PORT = process.env.PORT || 5000;
const app = express();

// Middlewares
app.use(
	helmet({
		crossOriginResourcePolicy: false,
	})
);
toobusy_js.maxLag(200);

app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "public", "assets")));
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

app.use(cors()); // Allows requests from any origin

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
