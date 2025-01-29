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
        primary: { type: String, default: "#a11616" },
        secondary: { type: String, default: "#671718" },
        primaryLight: { type: String, default: "#ffded9" },
        background: { type: String, default: "#ffffff" },
        section: { type: String, default: "#fff9f9" },
        text: { type: String, default: "#333333" },
        wText: { type: String, default: "#ffffff" },
        bText: { type: String, default: "#000000" },
    },
    dark: {
        primary: { type: String, default: "#ff4d4d" },
        secondary: { type: String, default: "#a11616" },
        background: { type: String, default: "#1a0000" },
        section: { type: String, default: "#2e0000" },
        text: { type: String, default: "#ffcccc" },
        wText: { type: String, default: "#ffffff" },
        bText: { type: String, default: "#330000" },
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