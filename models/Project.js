import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  slug: { type: String, unique: true },
  scanCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
});

export default mongoose.model("Project", projectSchema);
