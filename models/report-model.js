import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ReportSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  report: {
    type: Map,
    of: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
});

export default model(ReportSchema);
