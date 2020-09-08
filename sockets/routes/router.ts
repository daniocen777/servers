import { Router } from "express";
import MessagesController from "../controller/message_controller";

const router = Router();

const messageController = new MessagesController();

router.get("/mensajes", messageController.testGet);
router.post("/mensajes", messageController.testPost);
router.post("/mensajes/:id", messageController.testPostId);

export default router;
