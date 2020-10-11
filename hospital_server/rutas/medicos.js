/* Ruta => /api/hospitales */
const { Router } = require("express");

const router = Router();

const { check } = require("express-validator");
// Middlewares
const { validarCampos } = require("../middlewares/validar_campos");
const { validarJWT } = require("../middlewares/validar_token");

const medicoController = require("../controladores/medico_controller");

router.get("/", validarJWT, medicoController.listaMedicos);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del médicoes requerido").not().isEmpty(),
    check("hospital", "El ID del hospital debe ser válido").isMongoId(),
    validarCampos,
  ],
  medicoController.agregarMedico
);

module.exports = router;
