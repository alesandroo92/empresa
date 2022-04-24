const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig");


module.exports = {

    // Login
    signIn(req, res) {

        let { email, password } = req.body;

        // Buscar usuario
        User.findOne({
            where: {
                email : email
            }
        }).then(user => {
            if(!user) {
                res.status(404).json({ msg: "Usuario con este correo no encontrado" });
            } else {
                if(bcrypt.compareSync(password, user.password)) {
                    
                    // Si la contraseña coincide devolvemos token
                    let token = jwt.sign({ user: user }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });
                    res.status(200).json({
                        msg: "Usuario autenticado correctamente",
                        user: user,
                        token: token
                    });

                } else {
                    res.status(401).json({ msg: "Contraseña incorrecta" });
                }
            }
        }).catch(err => {
            res.status(500).json({ msg: "Se ha producido el siguiente error: "+err});
        });
    },

    // Registro
    signUp(req, res) {

        // Encriptamos la contraseña
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds)); // lo convertimos a un numero
     
        //Crear un usuario
        User.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: password,
            roleId: req.body.roleId
            
        }).then(user => {
            
            // Creamos el token
            let token = jwt.sign({ user: user }, authConfig.secret, {
                expiresIn: authConfig.expires
            });

            res.status(200).json({
                msg: "Usuario creado correctamente",
                user: user,
                token: token
            });
        }).catch(err => {
            res.status(500).json("Se ha producido el siguiente error: "+err);
        });
    }
};