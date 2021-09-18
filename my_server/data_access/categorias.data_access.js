const funciones = require("../utils/functions");

const Categoria = require("../models/categoria.model");

class CategoriasDataAccess {
  async listar(limite, desde) {
    const query = { estado: true };
    const [total, categorias] = await Promise.all([
      Categoria.countDocuments(query),
      Categoria.find(query)
        .populate("usuario", "nombre")
        .populate("categoria", "nombre")
        .skip(Number(desde))
        .limit(Number(limite)),
    ]);

    return funciones.responderOK("OK", 200, {
      total,
      categorias,
    });
  }

  async obtenerPorId(id) {
    const categoria = await Categoria.findById(id).populate(
      "usuario",
      "nombre"
    );

    return funciones.responderOK("OK", 200, categoria);
  }

  async crear(nombre, usuario) {
    // Validar existencia de categoría
    const categoriaDB = await Categoria.findOne({ nombre });
    if (categoriaDB) {
      return funciones.responderError(`La categoría ${nombre} ya existe`, 400);
    }
    // Generar data
    const data = {
      nombre,
      usuario,
    };
    const categoria = new Categoria(data);
    await categoria.save();
    return funciones.responderOK("OK", 201, categoria);
  }

  async editar(id, data, usuarioLogueado) {
    data.nombre = data.nombre.toUpperCase();
    data.usuario = usuarioLogueado;
    const categoria = await Categoria.findByIdAndUpdate(id, data, {
      new: true,
    });
    return funciones.responderOK("OK", 200, categoria);
  }
  async eliminar(id) {
    const categoria = await Categoria.findByIdAndUpdate(
      id,
      { estado: false },
      { new: true }
    );
    return funciones.responderOK("OK", 200, categoria);
  }
}

module.exports = CategoriasDataAccess.prototype;
