import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

export const connectDB = async () => {
	if (!process.env.MONGO_URL)
		throw new Error("MongoDB connection string not found");
	try {
		await mongoose.connect(process.env.MONGO_URL);

		console.log("Connected to MongoDB successfully!");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error.message);
		process.exit(1);
	}
};
