const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  estilo: {
    type: String,
    required: true,
    enum: ['sk8', 'y2k', 'gotico', 'mixto']
  },
  categoria: {
    type: String,
    required: true // Ej: Pantalones, Hoodies, Accesorios, Calzado, Tops
  },
  tallas: {
    type: [String],
    default: ['S', 'M', 'L', 'XL']
  },
  imagenUrl: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Producto', productoSchema);