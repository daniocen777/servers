const Role = require("../models/role.model");
const Usuario = require("../models/usuario.model");

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
    throw new Error(`El usuario con ${id} no existe`);
  }
};

module.exports = { validRole, validEmail, validUserForId };
