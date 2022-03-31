import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ResetPasswordTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  resetPasswordToken: {
    type: String,
    required: true,
  },
  activationResetPasswordLink: {
    type: String,
    required: true,
  },
});

export default model("ResetPasswordToken", ResetPasswordTokenSchema);
