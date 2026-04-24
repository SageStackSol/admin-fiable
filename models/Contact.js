import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String, // ✅ added

    service: {
      type: String,
      enum: [
        "Architectural Design",
        "Construction Consultation",
        "Construction Execution",
        "Interior Designing",
        "Landscaping",
      ],
    },

    message: String,

    status: {
      type: String,
      enum: ["new", "approached", "success", "rejected"],
      default: "new",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema);
