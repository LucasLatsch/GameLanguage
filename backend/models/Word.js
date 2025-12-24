import mongoose from "mongoose";

const wordSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    term: String,
    translation: String,
  },
  { timestamps: true }
);

export default mongoose.model("Word", wordSchema);
