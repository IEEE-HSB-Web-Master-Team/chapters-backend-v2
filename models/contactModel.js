import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, "Please enter a valid email"]
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

export default Contact