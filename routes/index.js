//importacion de librerias
const express = require('express');
const router = express.Router();

//importacion de los controller
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

//middleware para proteger las rutas
const auth = require('../middleware/auth');

module.exports = function () {

    //agrega nuevos clientes via post
    router.post('/clientes',
        auth,
        clienteController.nuevoCliente
    );

    //obtener todos los clientes
    router.get('/clientes',
        auth,
        clienteController.mostrarClientes
    );

    //muestra un cliente en especifico
    router.get('/clientes/:idCliente',
        auth,
        clienteController.mostrarCliente
    );

    //actualizar cliente
    router.put('/clientes/:idCliente',
        auth,
        clienteController.actualizarCliente
    );

    //eliminar cliente
    router.delete('/clientes/:idCliente',
        auth,
        clienteController.eliminarCliente
    );

    /* PRODUCTOS */
    //nuevos productos
    router.post('/productos',
        auth,
        productosController.subirArchivo,
        productosController.nuevoProducto
    );

    //muestra todos los productos
    router.get('/productos',
        auth,
        productosController.mostrarProductos
    );

    //muestra un producto por id
    router.get('/productos/:idProducto',
        auth,
        productosController.mostrarProducto
    );

    //actualizar productos
    router.put('/productos/:idProducto',
        auth,
        productosController.subirArchivo,
        productosController.actualizarProducto
    );

    //eliminar un producto
    router.delete('/productos/:idProducto',
        auth,
        productosController.eliminarProducto
    );

    //busqueda de productos
    router.post('/productos/busqueda/:query',
        auth,
        productosController.buscarProducto
    );

    /* PEDIDOS */
    //agrega nuevos pedidos
    router.post('/pedidos/nuevo/:idUsuario',
        auth,
        pedidosController.nuevoPedido
    );

    //muestra todos los pedidos
    router.get('/pedidos',
        auth,
        pedidosController.mostrarPedidos
    );

    //mostrar pedido por id
    router.get('/pedidos/:idPedido',
        auth,
        pedidosController.mostrarPedido
    );

    //actualizar un pedido
    router.put('/pedidos/:idPedido',
        auth,
        pedidosController.actualizarPedido
    );

    //eliminar pedido por id
    router.delete('/pedidos/:idPedido',
        auth,
        pedidosController.eliminarPedido
    );

    //usuarios
    router.post('/crear-cuenta',
        auth,
        usuariosController.registrarUsuario
    );

    router.post('/iniciar-sesion',
        usuariosController.autenticarUsuario
    );

    return router;
}