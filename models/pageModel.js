import mongoose from "mongoose";

const Schema = mongoose.Schema;

const socialMediaLinksSchema = new Schema({
    facebook: { type: String, required: false },
    insta: { type: String, required: false },
});

const homePageSchema = new Schema({
    about_us: {
        description: { type: String, required: false },
    },
    mega_events: {
        description: { type: String, required: false },
        images: {
            type: [String],
            required: false
        }
    },
    competition: {
        images: {
            type: [String],
            required: false
        }
    },
    reviews: {
        type: [{
            review: String,
            author: String,
            jobTitle: String
        }]
    },
    why_join: {
        main_title: {
            type: String,
            default: "why choose IEEE helwan"
        }, 
        description: [{ type: String }] 
    },
});

const colorSchema = new Schema({
    light: {
        primary: { type: String, default: "#4A90E2" },
        secondary: { type: String, default: "#50E3C2" },
        background: { type: String, default: "#F5F5F5" },
        text: { type: String, default: "#333333" },
    },
    dark: {
        primary: { type: String, default: "#1A73E8" },
        secondary: { type: String, default: "#34A853" },
        background: { type: String, default: "#121212" },
        text: { type: String, default: "#FFFFFF" },
    },
});

const appSchema = new Schema({
    committee: { 
        type: String, 
        unique: true, 
        lowercase: true, 
        required: true, 
        // enum: ["ras", "cs", 'pes'] 
    },
    logo: {
        type: String
    },
    colors: colorSchema, 
    social_media_links: socialMediaLinksSchema,  
    home_page: homePageSchema,  
    about_page: { type: Object, default: {} }, 
});

const App = mongoose.model("App", appSchema);

export default App;