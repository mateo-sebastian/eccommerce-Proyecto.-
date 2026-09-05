// Define la URL base del carrito y tu usuario de prueba de MongoDB Atlas
const API_CARRITO_URL = '/api/carritos'; 
const USUARIO_ID = '6a9a47b37f7e40887b3a05d1'; 

document.addEventListener('DOMContentLoaded', () => {
  obtenerProductos();
  obtenerCarritoDB(); // Carga el carrito real desde Mongo al entrar
  configurarFiltros();
  configurarEventosCarrito();
});

// 1. Obtener carrito directamente desde MongoDB
async function obtenerCarritoDB() {
  try {
    const res = await fetch(`${API_CARRITO_URL}/${USUARIO_ID}`);
    const data = await res.json();
    if (res.ok && data.items) {
      // Mapeamos los datos para que encajen con tu interfaz
      carrito = data.items.map(item => ({
        _id: item.producto._id,
        nombre: item.producto.nombre,
        precio: item.producto.precio,
        cantidad: item.cantidad,
        talla: item.talla || 'M'
      }));
      actualizarCarritoUI();
    }
  } catch (err) {
    console.error('Error al cargar carrito de MongoDB:', err);
  }
}

// 2. Guardar en MongoDB al hacer clic en "Agregar al carrito"
async function agregarAlCarrito(productoId) {
  const producto = productosCargados.find(p => p._id === productoId);
  if (!producto) return;

  try {
    const res = await fetch(`${API_CARRITO_URL}/agregar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuarioId: USUARIO_ID,
        productoId: productoId,
        cantidad: 1,
        talla: 'M'
      })
    });

    if (res.ok) {
      await obtenerCarritoDB(); // Vuelve a pedir los datos a la BD para refrescar la pantalla
      abrirCarrito();
    }
  } catch (err) {
    console.error('Error enviando a la base de datos:', err);
  }
}

// 3. Eliminar de MongoDB
async function eliminarDelCarrito(productoId) {
  try {
    const res = await fetch(`${API_CARRITO_URL}/eliminar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuarioId: USUARIO_ID,
        productoId: productoId,
        talla: 'M'
      })
    });

    if (res.ok) {
      await obtenerCarritoDB();
    }
  } catch (err) {
    console.error('Error al borrar de la BD:', err);
  }
}