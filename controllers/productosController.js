//importacion del modelo
const Productos = require('../models/Productos');

//importacion de librerarias
const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato no válido'))
        }
    }
}

//pasar la configuracion y el campo
const upload = multer(configuracionMulter).single('imagen');

//sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({
                mensaje: error
            })
        }
        return next();
    })
}

//agrega nuevos productos
exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body);
    try {

        if (req.file.filename) {
            producto.imagen = req.file.filename
        }

        await producto.save();
        res.json({
            mensaje: 'Se agrego un nuevo producto'
        })
    } catch (error) {
        console.log(error);
        next();
    }
}

//muestra todos los productos
exports.mostrarProductos = async (req, res, next) => {
    try {
        //obtener todos los productos
        const productos = await Productos.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }
}

//muestra un producto por id
exports.mostrarProducto = async (req, res, next) => {
    const producto = await Productos.findById(req.params.idProducto);

    if (!producto) {
        res.json({
            mensaje: 'El producto no existe'
        })
        return next();
    }

    //mostrar el producto
    res.json(producto);
}

//actualiza el producto por id
exports.actualizarProducto = async (req, res, next) => {
    try {
        // construir un nuevo producto
        let nuevoProducto = req.body;

        // verificar si hay imagen
        if (req.file) {
            nuevoProducto.imagen = req.file.filename;
        } else {
            let productoAnterior = await Productos.findById(req.params.idProducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Productos.findOneAndUpdate({
                _id: req.params.idProducto
            },
            nuevoProducto, {
                new: true
            })
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}

//elimina un producto por id
exports.eliminarProducto = async (req, res, next) => {
    try {
        await Productos.findByIdAndDelete({
            _id: req.params.idProducto
        });
        res.json({
            mensaje: 'El producto se ha eliminado'
        })
    } catch (error) {
        console.log(error);
        next();        
    }
}

//busquedar producto
exports.buscarProducto = async (req, res, next) => {
    try {
        //obtener el query
        const {query} = req.params;
        const producto = await Productos.find({nombre: new RegExp(query, 'i')});
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}