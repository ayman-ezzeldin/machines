import mongoose from "mongoose";

const machineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // العامل
}, { timestamps: true });

export default mongoose.models.Machine || mongoose.model("Machine", machineSchema);
