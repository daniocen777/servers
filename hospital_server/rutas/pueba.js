const { Router } = require("express");

const router = Router();
const controladorPrueba = require("../controladores/controlador_prueba");

router.post("/", controladorPrueba.addUser);

module.exports = router;
