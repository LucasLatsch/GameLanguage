import mongoose from "mongoose";

const wordSchema = new mongoose.Schema(
  {
    term: {
      type: String,
      required: true,
    },
    translation: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
  { timestamps: true },
);

export default mongoose.model("Word", wordSchema);
