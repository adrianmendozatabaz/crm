//importaciones
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//modelo
const Usuarios = require('../models/Usuarios');

exports.registrarUsuario = async (req, res) => {
    //leer los datos del usuario
    const usuario = new Usuarios(req.body);

    usuario.password = await bcrypt.hash(req.body.password, 12);

    try {
        await usuario.save();
        res.json({
            mensaje: 'Usuario Creado Correctamente'
        })
    } catch (error) {
        console.log(error);
        res.json({
            mensaje: 'Hubo un error'
        })
    }
}

exports.autenticarUsuario = async (req, res, next) => {
    //buscar el usuario
    const {
        email,
        password
    } = req.body;
    const usuario = await Usuarios.findOne({
        email
    })

    if (!usuario) {
        //si el usuario no existe
        await res.status(401).json({
            mensaje: 'El usuario no existe'
        });
        next();
    } else {
        //el usuario existe
        if (!bcrypt.compareSync(password, usuario.password)) {
            //si la pass es incorrecta
            await res.status(401).json({
                mensaje: 'Password Incorrecta'
            });
            next();
        } else {
            //password correcto y firmar el token
            const token = jwt.sign({
                email: usuario.email,
                nombre: usuario.nombre,
                id: usuario._id
            }, 'LLAVESECRETA', {
                expiresIn: '1h'
            });

            //retornar el token
            res.json({
                token
            })
        }
    }
}