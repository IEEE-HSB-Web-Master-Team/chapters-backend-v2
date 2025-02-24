import mongoose from "mongoose";

const Schema = mongoose.Schema;

const socialMediaLinksSchema = new Schema({
    facebook: { type: String, required: false },
    insta: { type: String, required: false },
});

const reviewSchema = new Schema({
    review: String,
    author: String,
    jobTitle: String
});

const imageSchema = new Schema({
    title: String,
    image: String,
    date: String
});

const homePageSchema = new Schema({
    main: { type: String, required: false },
    aboutUs: {
        description: { type: String, required: false },
    },
    megaEvents: {
        description: { type: String, required: false },
        images: [imageSchema]
    },
    competition: {
        images: [imageSchema]
    },
    reviews: [reviewSchema],
    whyJoin: {
        mainTitle: { type: String, default: "Why Choose IEEE Helwan" },
        description: [{ type: String }]
    }
});

const visionSchema = new Schema({
    title: String,
    description: {
        mission: String,
        vision: String
    }
});

const historySchema = new Schema({
    date: String,
    description: String,
    image: String
});

const teamMemberSchema = new Schema({
    name: String,
    jobTitle: String,
    image: String
});

const aboutPageSchema = new Schema({
    main: { type: String, required: false }, 
    hero: {
        title: String,
        description: String
    },
    vision: visionSchema,
    history: {
        title: String,
        description: [historySchema]
    },
    team: {
        title: String,
        members: [teamMemberSchema]
    }
});

const eventSchema = new Schema({
    location: String,
    date: String,
    name: String,
    description: String,
    mainImage: String,
    images: [String]
});

const eventsSchema = new Schema({
    main: { type: String, required: false },
    megaEvents: {
        description: { title: String },
        images: [imageSchema]
    },
    timeline: {
        dates: [String],
        events: [eventSchema]
    }
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
    },
    logo: { type: String },
    colors: colorSchema,
    gallery: { 
        images: [{ type: String }]
    },
    socialMediaLinks: socialMediaLinksSchema,
    homePage: homePageSchema,
    aboutPage: aboutPageSchema,
    events: eventsSchema,
});

const App = mongoose.model("App", appSchema);

export default App;