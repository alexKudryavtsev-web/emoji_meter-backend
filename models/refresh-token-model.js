import mongoose from "mongoose";
const { Schema, model } = mongoose;

const RefreshTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

export default model("RefreshToken", RefreshTokenSchema);
