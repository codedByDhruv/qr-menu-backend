import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  type: String,
  url: String,
});

export default mongoose.model("Content", contentSchema);
