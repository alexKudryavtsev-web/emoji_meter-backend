import jsonwebtoken from "jsonwebtoken";
import ResetPasswordTokenModel from "../models/reset-password-token-model.js";
import TokenModel from "../models/token-model.js";
import UserModel from "../models/user-model.js";
const { sign, verify } = jsonwebtoken;

class TokenService {
  async generateTokens(payload) {
    const accessToken = sign(payload, process.env.SECRET_ACCESS, {
      expiresIn: "15m",
    });
    const refreshToken = sign(payload, process.env.SECRET_REFRESH, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }

  async saveToken(userId, refreshToken) {
    const candidate = await TokenModel.findOne({ userId });
    if (candidate) {
      candidate.refreshToken = refreshToken;
      return candidate.save();
    }

    return await TokenModel.create({ userId, refreshToken });
  }

  async generateTokenForResetPassword(payload) {
    const token = sign(payload, process.env.SECRET_RESET_PASSWORD, {
      expiresIn: "2h",
    });
    return token;
  }

  async saveTokenForResetPassword(
    activationResetPasswordLink,
    resetPasswordToken
  ) {
    return await ResetPasswordTokenModel.create({
      activationResetPasswordLink,
      resetPasswordToken,
    });
  }

  async saveTokenForResetPassword(
    email,
    activationResetPasswordLink,
    resetPasswordToken
  ) {
    const user = await UserModel.findOne({ email });
    const candidate = await ResetPasswordTokenModel.findOne({
      userId: user._id,
    });
    if (candidate) {
      candidate.activationResetPasswordLink = activationResetPasswordLink;
      candidate.resetPasswordToken = resetPasswordToken;
      return candidate.save();
    }

    return await ResetPasswordTokenModel.create({
      userId: user._id,
      activationResetPasswordLink,
      resetPasswordToken,
    });
  }

  async removeToken(refreshToken) {
    return await TokenModel.findOneAndDelete({ refreshToken });
  }

  async verifyRefreshToken(refreshToken) {
    try {
      return verify(refreshToken, process.env.SECRET_REFRESH);
    } catch (e) {
      return null;
    }
  }

  async verifyAccessToken(accessToken) {
    try {
      return verify(accessToken, process.env.SECRET_ACCESS);
    } catch (e) {
      return null;
    }
  }

  async verifyResetPasswordToken(resetPasswordToken) {
    try {
      return verify(resetPasswordToken, process.env.SECRET_RESET_PASSWORD);
    } catch (e) {
      return null;
    }
  }
}

export default new TokenService();
