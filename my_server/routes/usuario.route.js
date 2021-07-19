const { Router } = require("express");
const { check } = require("express-validator");

const {
  validarCampos,
  validarJwt,
  validarRol,
  adminRol,
} = require("../middlewares");

const {
  validRole,
  validEmail,
  validUserForId,
} = require("../helpers/db_validators");
const userController = require("../controllers/user.controller");

const router = Router();

router.get("/", userController.getUsers);
/* Crear usuario */
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check(
      "password",
      "La contraseña debe tener al menos 6 caracteres"
    ).isLength({
      min: 6,
    }),
    check("correo", "El correo es obligatorio").not().isEmpty(),
    check("correo", "El correo no es válido").isEmail(),
    /* check("rol", "No es un rol permitido").isIn(["ADMIN_ROLE", "USER_ROLE"]), */
    /* Validar rol contra la BD: Crear una colección en la BD (roles) */
    check("rol").custom(validEmail),
    //  check("rol").custom( (rol) => validRole(rol))
    check("rol").custom(validRole),
    validarCampos,
  ],
  userController.crearUsuario
);
/* Actualizar usuario */
router.put(
  "/:id",
  [
    check("id", "Id inválido").isMongoId(),
    check("id").custom(validUserForId),
    check("rol").custom(validRole),
    validarCampos,
  ],

  userController.editarUsuario
);

/* Eliminar usuario => estado = false*/
router.delete(
  "/:id",
  [
    validarJwt,
    //adminRol,
    validarRol("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "Id inválido").isMongoId(),
    check("id").custom(validUserForId),
    validarCampos,
  ],
  userController.eliminarUsuario
);

module.exports = router;
