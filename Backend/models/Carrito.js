const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
    unique: true
  },
  items: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
      },
      cantidad: {
        type: Number,
        required: true,
        min: 1,
        default: 1
      },
      talla: {
        type: String,
        default: 'M'
      }
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Carrito', carritoSchema);