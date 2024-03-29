const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatoria"],
    unique: true,
  },
  estado: {
    type: Boolean,
    required: true,
    default: true,
  },
  // Usuario que creó la categoría
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  // Relación con categoría
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  descripcion: { type: String },
  disponible: { type: Boolean, default: true },
});

ProductoSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};

module.exports = model("Producto", ProductoSchema);
