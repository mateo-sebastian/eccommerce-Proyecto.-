// Ajusta la ruta base según tu backend (normalmente /api/carrito)
const API_URL = '/api/productos';
const API_CARRITO_URL = '/api/carrito'; 
const USUARIO_ID = '6a9a47b37f7e40887b3a05d1';

const gridProductos = document.getElementById('grid-productos');
const botonesFiltro = document.querySelectorAll('.btn-filtro');

// Elementos del Carrito
const sidebarCarrito = document.getElementById('sidebar-carrito');
const overlay = document.getElementById('overlay');
const btnAbrirCarrito = document.getElementById('btn-abrir-carrito');
const btnCerrarCarrito = document.getElementById('btn-cerrar-carrito');
const itemsCarritoContainer = document.getElementById('items-carrito');
const contadorCarrito = document.getElementById('contador-carrito');
const totalPrecioElem = document.getElementById('total-precio');

let productosCargados = [];
let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
  obtenerProductos();
  obtenerCarritoDB();
  configurarFiltros();
  configurarEventosCarrito();
});

// 1. Cargar el catálogo
async function obtenerProductos(estilo = 'todos') {
  try {
    let url = API_URL;
    if (estilo !== 'todos') url += `?estilo=${estilo}`;

    const respuesta = await fetch(url);
    productosCargados = await respuesta.json();
    renderizarProductos(productosCargados);
  } catch (error) {
    gridProductos.innerHTML = `<p>Error al conectar con el servidor.</p>`;
  }
}

// 2. Obtener el carrito desde MongoDB
async function obtenerCarritoDB() {
  try {
    const res = await fetch(`${API_CARRITO_URL}/${USUARIO_ID}`);
    if (!res.ok) return;

    const data = await res.json();
    if (data && data.items) {
      carrito = data.items
        .filter(item => item.producto)
        .map(item => ({
          _id: item.producto._id,
          nombre: item.producto.nombre,
          precio: item.producto.precio,
          cantidad: item.cantidad,
          talla: item.talla || 'M'
        }));
      actualizarCarritoUI();
    }
  } catch (err) {
    console.warn('Sincronización de carrito pendiente:', err);
  }
}

function renderizarProductos(productos) {
  gridProductos.innerHTML = '';
  if (!productos || productos.length === 0) {
    gridProductos.innerHTML = '<p>No hay prendas disponibles.</p>';
    return;
  }

  productos.forEach(prod => {
    const card = document.createElement('div');
    card.classList.add('card-producto');

    const tallasHTML = prod.tallas && prod.tallas.length > 0 
      ? prod.tallas.map(t => `<span class="badge-talla">${t}</span>`).join('') 
      : '';

    card.innerHTML = `
      <div>
        ${prod.imagenUrl ? `<img src="${prod.imagenUrl}" alt="${prod.nombre}" class="img-producto">` : ''}
        <span class="badge-estilo">${prod.estilo}</span>
        <h3>${prod.nombre}</h3>
        <p class="descripcion">${prod.descripcion}</p>
        
        <div class="tallas-container">
          <span class="label-tallas">Tallas:</span>
          <div class="lista-tallas">${tallasHTML}</div>
        </div>
      </div>
      <div>
        <p class="precio">$${prod.precio.toFixed(2)}</p>
        <button class="btn-agregar" onclick="window.agregarAlCarrito('${prod._id}')">Agregar al carrito</button>
      </div>
    `;
    gridProductos.appendChild(card);
  });
}

function configurarFiltros() {
  botonesFiltro.forEach(boton => {
    boton.addEventListener('click', (e) => {
      botonesFiltro.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      obtenerProductos(e.target.dataset.estilo);
    });
  });
}

// 3. Función global para agregar prendas al hacer clic
window.agregarAlCarrito = async function(productoId) {
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
      await obtenerCarritoDB();
      abrirCarrito();
    } else {
      console.error('Error al responder el servidor:', res.status);
    }
  } catch (err) {
    console.error('Error al agregar prenda:', err);
  }
};

// 4. Función global para eliminar prendas del carrito
window.eliminarDelCarrito = async function(productoId) {
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
    console.error('Error al eliminar prenda:', err);
  }
};

function actualizarCarritoUI() {
  itemsCarritoContainer.innerHTML = '';
  let totalItems = 0;
  let totalPrecio = 0;

  if (carrito.length === 0) {
    itemsCarritoContainer.innerHTML = '<p class="carrito-vacio">El carrito está vacío</p>';
  } else {
    carrito.forEach(item => {
      totalItems += item.cantidad;
      totalPrecio += item.precio * item.cantidad;

      const itemDiv = document.createElement('div');
      itemDiv.classList.add('item-carrito');
      itemDiv.innerHTML = `
        <div class="item-info">
          <h4>${item.nombre}</h4>
          <p>Cant: ${item.cantidad} x $${item.precio.toFixed(2)}</p>
        </div>
        <button class="btn-eliminar" onclick="window.eliminarDelCarrito('${item._id}')">✕</button>
      `;
      itemsCarritoContainer.appendChild(itemDiv);
    });
  }

  contadorCarrito.textContent = totalItems;
  totalPrecioElem.textContent = `$${totalPrecio.toFixed(2)}`;
}

function configurarEventosCarrito() {
  btnAbrirCarrito.addEventListener('click', abrirCarrito);
  btnCerrarCarrito.addEventListener('click', cerrarCarrito);
  overlay.addEventListener('click', cerrarCarrito);
}

function abrirCarrito() {
  sidebarCarrito.classList.add('open');
  overlay.classList.add('active');
}

function cerrarCarrito() {
  sidebarCarrito.classList.remove('open');
  overlay.classList.remove('active');
}