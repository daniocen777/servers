const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

const authController = require("../controllers/auth.controller");
const { validarCampos } = require("../middlewares/validar_campos");

router.post(
  "/login",
  [
    check("correo", "Correo inválido").isEmail(),
    check("password", "Debe ingresar su contraseña").not().isEmpty(),
    validarCampos,
  ],
  authController.login
);

module.exports = router;
