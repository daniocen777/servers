/* Ruta => /api/uploads/ */
const { Router } = require("express");
const router = Router();

const fileUpload = require('express-fileupload');
router.use(fileUpload());

const { validarJWT } = require("../middlewares/validar_token");

const uploadController = require("../controladores/upload_controller");


router.get("/:coleccion/:foto", validarJWT, uploadController.getImagen);

router.put("/:coleccion/:id", validarJWT, uploadController.subirArchivo);


module.exports = router;
