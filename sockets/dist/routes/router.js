"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var message_controller_1 = __importDefault(require("../controller/message_controller"));
var router = express_1.Router();
var messageController = new message_controller_1.default();
router.get("/mensajes", messageController.testGet);
router.post("/mensajes", messageController.testPost);
router.post("/mensajes/:id", messageController.testPostId);
exports.default = router;
