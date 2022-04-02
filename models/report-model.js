import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ReportSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  emojis: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  date: {
    type: Number,
    required: true,
  },
});

export default model("Report", ReportSchema);
