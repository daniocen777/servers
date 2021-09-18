const Role = require("../models/role.model");
const { Usuario, Categoria, Producto } = require("../models");

/* Usuario */
const validRole = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está permitido`);
  }
};

const validEmail = async (correo = "") => {
  const email = await Usuario.findOne({ correo });
  if (email) {
    throw new Error(`El correo ${correo} ya está registrado`);
  }
};

const validUserForId = async (id = "") => {
  const user = await Usuario.findById(id);
  if (!user) {
    throw new Error(`El usuario con id: ${id} no existe`);
  }
};

/* Categorías */
const validarCategoriaPorId = async (id = "") => {
  const categoria = await Categoria.findById(id);
  if (!categoria) {
    throw new Error(`La categoría con id: ${id} no existe`);
  }
};

/* Productos */
const validarProductoPorId = async (id = "") => {
  const producto = await Producto.findById(id);
  if (!producto) {
    throw new Error(`Producto con id: ${id} no existe`);
  }
};

module.exports = {
  validRole,
  validEmail,
  validUserForId,
  validarCategoriaPorId,
  validarProductoPorId,
};
