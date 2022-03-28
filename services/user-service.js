import UserModel from "../models/user-model.js";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import TokenService from "./token-service.js";
import UserDto from "../dto/user-dto.js";
import ApiError from "../errors/api-error.js";
import EmailService from "./email-service.js";
import TokenModel from "../models/token-model.js";

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`email ${email} is busy`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationUserLink = v4();

    await EmailService.sendActivationUserEmail(
      email,
      `${process.env.API_URL}/api/auth/activateUser/${activationUserLink}`
    );

    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationUserLink,
    });
    const userDto = new UserDto(user);

    return {
      user: userDto,
    };
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    const comparedPassword = bcrypt.compare(password, user.password);

    if (!comparedPassword) {
      throw ApiError.BadRequest("wrong password");
    }

    if (!user.isActivate) {
      throw ApiError.BadRequest("user is not activate");
    }

    const userDto = new UserDto(user);
    const tokens = await TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      user: userDto,
      ...tokens,
    };
  }

  async logout(refreshToken) {
    return await TokenService.removeToken(refreshToken);
  }

  async activateUser(activationUserLink) {
    const user = await UserModel.findOne({ activationUserLink });
    if (!user) {
      throw ApiError.BadRequest("invalid link");
    }
    user.isActivate = true;
    await user.save();
  }

  async refresh(refreshToken) {
    const userData = await TokenService.verifyRefreshToken(refreshToken);
    const tokenFromDB = await TokenModel.findOne({ refreshToken });

    if (!userData || !tokenFromDB) {
      throw ApiError.BadRequest("invalid refresh token");
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);

    const tokens = await TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(user._id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }

  async getNewPassword(email) {}
}

export default new UserService();
