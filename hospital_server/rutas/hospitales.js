/* Ruta => /api/hospitales */
const { Router } = require("express");

const router = Router();

const { check } = require("express-validator");
// Middlewares
const { validarCampos } = require("../middlewares/validar_campos");
const { validarJWT } = require("../middlewares/validar_token");

const hospitalController = require("../controladores/hospital_controller");

router.get("/", validarJWT, hospitalController.listaHospitales);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del hospital es requerido").not().isEmpty(),
    validarCampos,
  ],
  hospitalController.agregarHospital
);

module.exports = router;
