const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');

router.get('/:usuarioId', carritoController.obtenerCarrito);
router.post('/agregar', carritoController.agregarAlCarrito);
router.post('/eliminar', carritoController.eliminarDelCarrito);
router.post('/vaciar', carritoController.vaciarCarrito);

module.exports = router;