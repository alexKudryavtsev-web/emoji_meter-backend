import { Router } from "express";

const reportRouter = new Router();

reportRouter.get("/read", (req, res) => res.json("read"));
reportRouter.post("/create", (req, res) => res.json("read"));
reportRouter.post("/update", (req, res) => res.json("read"));

export default reportRouter;
