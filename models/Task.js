import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["pending", "completed", "error"], default: "pending" },
  machine: { type: mongoose.Schema.Types.ObjectId, ref: "Machine", required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // admin
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // employee
  // errorMessage: { type: String }, // لو فيه مشكلة
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model("Task", taskSchema);
