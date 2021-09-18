const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();
const { validarCampos } = require("../middlewares/validar_campos");

const authController = require("../controllers/auth.controller");

router.post(
  "/login",
  [
    check("correo", "Correo inválido").isEmail(),
    check("password", "Debe ingresar su contraseña").not().isEmpty(),
    validarCampos,
  ],
  authController.login
);

/* Autenticación con google */
router.post(
  "/google",
  [check("id_token", "El token es necesario").not().isEmpty(), validarCampos],
  authController.googleSignin
);

module.exports = router;
