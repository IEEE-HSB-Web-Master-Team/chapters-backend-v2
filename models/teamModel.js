import mongoose from "mongoose";

const { Schema } = mongoose;

const teamSchema = new Schema(
  {
    committe: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    teamName: {
      type: String,
      unique: true,
      required: true
    },
    teamMembers: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Team = mongoose.model("Team", teamSchema);

export default Team;
