/* Ruta => /api/usuarios */
const { Router } = require("express");

const router = Router();

const { check } = require("express-validator");
// Middlewares
const { validarCampos } = require("../middlewares/validar_campos");
const { validarJWT } = require("../middlewares/validar_token");

const usuarioController = require("../controladores/usuario_controller");

// Lista de usuarios => requiere token
router.get("/", validarJWT, usuarioController.usuariosLista);

// Agregar usuario, sin validación de token
router.post(
  "/",
  [
    check("nombre", "El nombre es requerido").not().isEmpty(),
    check("email", "El correo no es válido").isEmail(),
    validarCampos,
  ],
  usuarioController.agregarUsuario
);

// Editar usuario
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es requerido").not().isEmpty(),
    check("email", "El correo no es válido").isEmail(),
    check("rol", "El rol es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  usuarioController.actualizarUsuario
);

router.delete("/:id", validarJWT, usuarioController.eliminarUsuario);

module.exports = router;
