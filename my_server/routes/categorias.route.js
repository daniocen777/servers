const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

const { validarJwt, validarCampos, adminRol } = require("../middlewares");
const { validarCategoriaPorId } = require("../helpers/db_validators");

const categoriasController = require("../controllers/categorias.controller");

// URL =>  localhost:8080/api/categorias

/* Lista */
router.get("/", categoriasController.listar);
/* Obtener por Id */
router.get(
  "/:id",
  [
    check("id", "Id inválido").isMongoId(),
    check("id").custom(validarCategoriaPorId),
    validarCampos,
  ],
  categoriasController.obtenerPorId
);
/* Crear */
router.post(
  "/",
  [
    validarJwt,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  categoriasController.crear
);
/* Editar */
router.put(
  "/:id",
  [
    validarJwt,
    check("id", "Id inválido").isMongoId(),
    check("id").custom(validarCategoriaPorId),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  categoriasController.editar
);
/* Eliminar */
router.delete(
  "/:id",
  [
    validarJwt,
    adminRol,
    check("id", "Id inválido").isMongoId(),
    check("id").custom(validarCategoriaPorId),
    validarCampos,
  ],
  categoriasController.eliminar
);

module.exports = router;
