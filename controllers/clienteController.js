//importacion del modelo
const Clientes = require('../models/Clientes');

//agrega un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body);

    try {
        //almacenar el registro
        await cliente.save();
        res.json({
            mensaje: 'Se agrego un nuevo cliente'
        })
    } catch (error) {
        //ver cual es el error
        res.send(error);
        next();
    }
}

//muestra todos los clientes
exports.mostrarClientes = async (req, res, next) => {
    try {
        //consultar los clientes
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        //verificar si hay un error
        console.log(error);
        next();
    }
}

//muestra un cliente por su id
exports.mostrarCliente = async (req, res, next) => {
    const cliente = await Clientes.findById(req.params.idCliente);

    if (!cliente) {
        res.json({
            mensaje: 'Ese cliente no existe'
        })
        next();
    }

    //mostrar el cliente
    res.json(cliente);
}

//actualiza un cliente por id
exports.actualizarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({
            _id: req.params.idCliente
        }, 
        req.body, 
        {
            new: true
        })
        res.json(cliente);
    } catch (error) {
        res.send(error);
        next();
    }
}

//elimina el cliente por id
exports.eliminarCliente = async (req, res, next) =>{
    try {
        await Clientes.findByIdAndDelete({ _id: req.params.idCliente});
        res.json({
            mensaje: 'Se elimino correctamente al cliente'
        })
    } catch (error) {
        console.log(error);
        next();        
    }
}