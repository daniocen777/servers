/* Ruta => /api/todo/ */
const { Router } = require("express");

const router = Router();

// Middlewares
const { validarCampos } = require("../middlewares/validar_campos");
const { validarJWT } = require("../middlewares/validar_token");

const busquedaController = require("../controladores/busqueda_controller");

// Búsqueda de todas las colecciones
router.get("/:busqueda", [validarJWT], busquedaController.buscar);
// Búsqueda colección específica
router.get("/coleccion/:tabla/:busqueda", [validarJWT], busquedaController.buscarColeccion);

module.exports = router;
