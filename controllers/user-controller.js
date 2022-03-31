import UserService from "../services/user-service.js";

const cookiesConfig = {
  maxAge: 30 * 24 * 60 * 60 * 1000,
  httpOnly: true,
};

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.registration(email, password);

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, cookiesConfig);

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie("refreshToken");

      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, cookiesConfig);

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async activateUser(req, res, next) {
    try {
      const { link } = req.params;
      await UserService.activateUser(link);

      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { email } = req.body;
      const token = await UserService.resetPassword(email);

      return res.json({ token });
    } catch (e) {
      next(e);
    }
  }

  async activateNewPassword(req, res, next) {
    try {
      const { activationResetPasswordLink, newPassword } = req.body;

      const user = await UserService.activateNewPassword(
        activationResetPasswordLink,
        newPassword
      );
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
