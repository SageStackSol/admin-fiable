import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    overview: String,
    description:{type: String},

    yearCompleted: String,

    clientName: String,
    clientLocation: String,
    clientIndustry: String,

    scopeOfWork: String,
    size: String,

    pinned: {
      type: Boolean,
      default: false,
    },

    mainImage: {
      type: String, // 🌄 Cloudinary URL
      required: true,
    },

    images: [
      {
        type: String, // multiple image URLs
      },
    ],

    video: {
      type: String, // Cloudinary video URL
    },
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);