import jsonwebtoken from "jsonwebtoken";
import TokenModel from "../models/token-model.js";
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
}

export default new TokenService();
