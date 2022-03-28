import ApiError from "../errors/api-error.js";
import TokenService from "../services/token-service.js";

export default async function authMiddleware(req, res, next) {
  try {
    if (!req.headers.authorization) {
      next(ApiError.UnathorizedError());
    }

    const accessToken = req.headers.authorization.split(" ")[1];
    const userData = await TokenService.verifyAccessToken(accessToken);

    if (!accessToken || !userData) {
      next(ApiError.UnathorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    next(e);
  }
}
