import mongoose from "mongoose";

const { Schema, model } = mongoose;

const RecoveryTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  recoveryToken: {
    type: String,
    required: true,
  },
});

export default model("RecoveryToken", RecoveryTokenSchema);
