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

// Agregar al carrito (Corregido)
exports.agregarAlCarrito = async (req, res) => {
  try {
    const { usuarioId, productoId, cantidad, talla } = req.body;
    const cantidadAgregar = Number(cantidad) || 1;

    let carrito = await Carrito.findOne({ usuario: usuarioId });

    if (!carrito) {
      carrito = new Carrito({ usuario: usuarioId, items: [] });
    }

    const itemIndex = carrito.items.findIndex(
      p => p.producto.toString() === productoId && p.talla === talla
    );

    if (itemIndex > -1) {
      carrito.items[itemIndex].cantidad += cantidadAgregar;
      carrito.markModified('items'); 
    } else {
      carrito.items.push({ 
        producto: productoId, 
        cantidad: cantidadAgregar, 
        talla 
      });
    }

    await carrito.save();
    const carritoActualizado = await carrito.populate('items.producto');

    res.json({ 
      mensaje: 'Prenda agregada al carrito', 
      carrito: carritoActualizado 
    });

  } catch (error) {
    res.status(500).json({ 
      mensaje: 'Error al agregar al carrito', 
      error: error.message 
    });
  }
};

// Eliminar prenda del carrito
exports.eliminarDelCarrito = async (req, res) => {
  try {
    const { usuarioId, productoId, talla } = req.body;
    let carrito = await Carrito.findOne({ usuario: usuarioId });

    if (carrito) {
      carrito.items = carrito.items.filter(
        item => !(item.producto.toString() === productoId && item.talla === talla)
      );
      
      await carrito.save();
      const carritoActualizado = await carrito.populate('items.producto');
      return res.json({ mensaje: 'Producto eliminado', carrito: carritoActualizado });
    }

    res.status(404).json({ mensaje: 'Carrito no encontrado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar', error: error.message });
  }
}; 