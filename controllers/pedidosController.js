//importacion del modelo
const Pedidos = require('../models/Pedidos');

exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.json({
            mensaje: 'Se agrego un nuevo pedido'
        })
    } catch (error) {
        console.log(error);
        next();
    }
}

//muestra todos los pedidos
exports.mostrarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json(pedidos);
    } catch (error) {
        console.log(error);
        next();
    }
}

//muestra un pedido por id
exports.mostrarPedido = async (req, res, next) => {
    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
        path: 'pedido.producto',
        model: 'Productos'
    });

    //si no existe el pedido
    if (!pedido) {
        res.json({
            mensaje: 'Ese pedido no exite'
        });
        return next();
    }

    //mostrar el pedido
    res.json(pedido);
}

//actualizar el pedido por id
exports.actualizarPedido = async (req, res, next) => {
    try {
        const pedido = await Pedidos.findOneAndUpdate({
                _id: req.params.idPedido,
            },
            req.body, {
                new: true
            }
        ).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json(pedido);
    } catch (error) {
        console.log(error);
        next();
    }
}

//elimina un pedido por id
exports.eliminarPedido = async (req, res, next) => {
    try {
        await Pedidos.findOneAndDelete({
            _id: req.params.idPedido
        });
        res.json({
            mensaje: 'Se elimino el pedido correctamente'
        })
    } catch (error) {
        console.log(error);
        next();
    }
}