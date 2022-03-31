import { Router } from "express";
import UserController from "../controllers/user-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";

const authRouter = new Router();

authRouter.post("/registration", UserController.registration);
authRouter.post("/login", UserController.login);
authRouter.post("/logout", UserController.logout);
authRouter.post("/resetPassword", UserController.resetPassword);
authRouter.get("/refresh", UserController.refresh);
authRouter.get("/activateUser/:link", UserController.activateUser);
authRouter.post("/activateNewPassword", UserController.activateNewPassword);

// authRouter.get("/test", authMiddleware, (req, res) => {
//   res.json(`success ${req.user.email}`);
// });

export default authRouter;
