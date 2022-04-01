import { Router } from "express";
import authMiddleware from "../middleware/auth-middleware.js";
import ReportController from "../controllers/report-controller.js";

const reportRouter = new Router();

reportRouter.get("/read", authMiddleware, ReportController.readReports);
reportRouter.post("/create", authMiddleware, ReportController.createReport);

export default reportRouter;
