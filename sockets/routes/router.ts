import { Router } from "express";
import MessagesController from "../controller/message_controller";

const router = Router();

const messageController = new MessagesController();

router.get("/mensajes", messageController.testGet); // Prueba
// Envío de mensaje a usuario específico
router.post("/mensajes/:id", messageController.enviarMensajePrivado);
// Envío de mensaje a todos los usuarios conectados
router.post("/mensajes", messageController.enviarMensajeATodos);
// Obtener los IDs de todos los usuarios conectados
router.get("/usuarios", messageController.getIDs);
// Obtener los datos de todos los usuarios conectados
router.get("/usuarios/detalle", messageController.getUsuarios);

export default router;
