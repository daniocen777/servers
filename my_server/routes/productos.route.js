const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

const { validarJwt, validarCampos, adminRol } = require("../middlewares");
const {
  /* validRole,
  validEmail,
  validUserForId, */
  validarCategoriaPorId,
} = require("../helpers/db_validators");

const productosController = require("../controllers/productos.controller");

// URL =>  localhost:8080/api/productos

// Lista
router.get("/", productosController.listar);
/* Crear */
router.post(
  "/",
  [
    validarJwt,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "Id inválido").isMongoId(),
    check("categoria").custom(validarCategoriaPorId),
    validarCampos,
  ],
  productosController.crear
);

module.exports = router;
