
const express = require('express')
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');

const app = express();


app.get('/usuario', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({estado: true}, 'nombre email role estado google img')
            .skip(desde)
            .limit(limite)
            .exec((err, usuarios) => {

                if(err){
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                Usuario.countDocuments({estado: true}, (err, conteo) => {

                    res.json({
                        ok: true,
                        total: conteo,
                        usuarios

                    });
                })
            })

});

app.post('/usuario', (req, res) => {

    let persona = req.body
    //creamos instancia del esquema Usuario que tiene las confg de usuarioSchema models
    let usuario = new Usuario({
        nombre: persona.nombre,
        email: persona.email,
        password: bcrypt.hashSync(persona.password, 10), 
        role: persona.role
    })
    //guardarmos el user en la bd
    usuario.save((err, userDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: userDB
        })
    });

});


app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;
    //con _.pick validamos en un arreglo la data del objeto que si se puede actualizar 
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, userDB) => {
        
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }


        res.json({
            ok: true,
            usuario: userDB
        
        })

    })
});


app.delete('/usuario/:id', (req, res) => {
    
    let id = req.params.id

    let cambiaEstado = {
        estado: false
    }
    //ELiminamos un user de la bd
    //Usuario.findByIdAndRemove(id, {new: true},(err, usuarioEliminado) => {
    Usuario.findByIdAndUpdate(id, cambiaEstado, {new: true},(err, usuarioEliminado) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(usuarioEliminado === null){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado.'
                }
            })
        }

        res.json({
            ok: true,
            usuario: usuarioEliminado
        })

    })


});


module.exports = app;