import { Router } from "express";

import authMiddleware from "../../middleware/auth.middleware";

import { create, getComments } from "./comment.controller";

const router = Router();

router.post("/:ticketId", authMiddleware(), create);

router.get("/:ticketId", authMiddleware(), getComments);

export default router;
