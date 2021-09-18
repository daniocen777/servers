const funciones = require("../utils/functions");

const Producto = require("../models/producto.model");

class ProductosDataAccess {
  async listar(limite, desde) {
    const query = { estado: true };
    const [total, productos] = await Promise.all([
      Producto.countDocuments(query),
      Producto.find(query)
        .populate("usuario", "nombre")
        .skip(Number(desde))
        .limit(Number(limite)),
    ]);

    return funciones.responderOK("OK", 200, {
      total,
      productos,
    });
  }

  async crear(nombre, usuario) {
    // Validar existencia de categoría
    const productoDB = await Categoria.findOne({ nombre });
    if (productoDB) {
      return funciones.responderError(`El producto ${nombre} ya existe`, 400);
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
}

module.exports = ProductosDataAccess.prototype;
