const Carrito = require('../models/Carrito');

// Obtener carrito del usuario
exports.obtenerCarrito = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    let carrito = await Carrito.findOne({ usuario: usuarioId }).populate('items.producto');

    if (!carrito) {
      carrito = new Carrito({ usuario: usuarioId, items: [] });
      await carrito.save();
    }

    res.json(carrito);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener carrito', error: error.message });
  }
};

// Agregar al carrito
exports.agregarAlCarrito = async (req, res) => {
  try {
    const { usuarioId, productoId, cantidad, talla } = req.body;

    let carrito = await Carrito.findOne({ usuario: usuarioId });

    if (!carrito) {
      carrito = new Carrito({ usuario: usuarioId, items: [] });
    }

    const itemIndex = carrito.items.findIndex(
      p => p.producto.toString() === productoId && p.talla === talla
    );

    if (itemIndex > -1) {
      carrito.items[itemIndex].cantidad += cantidad || 1;
    } else {
      carrito.items.push({ producto: productoId, cantidad: cantidad || 1, talla });
    }

    await carrito.save();
    const carritoActualizado = await Carrito.findById(carrito._id).populate('items.producto');
    res.json({ mensaje: 'Prenda agregada al carrito', carrito: carritoActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar al carrito', error: error.message });
  }
};