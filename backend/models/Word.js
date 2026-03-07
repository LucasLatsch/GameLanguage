import mongoose from "mongoose";

const wordSchema = new mongoose.Schema(
  {
    term: String,
    translation: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Word", wordSchema);
