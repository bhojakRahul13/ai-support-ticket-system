import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { create, getTickets, updateStatus } from "./ticket.controller";
import upload from "../../config/multer";
import { createTicketSchema } from "./ticket.validation";
import validateRequest from "../../middleware/validate.middleware";

const router = Router();

router.post("/", authMiddleware(), upload.single("attachment"), validateRequest(createTicketSchema), create);
router.get("/", authMiddleware(), getTickets);
router.patch("/:id/status", authMiddleware(), updateStatus);

export default router;
