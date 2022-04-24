const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig");
const { User } = require("../models/index");


module.exports = (req, res, next) => {

    // Comprobar que exista el token
    if(!req.headers.authorization) {
        res.status(401).json({ msg: "Acceso no autorizado" });
    } else {
        // Comprobar la validez del token
        let token = req.headers.authorization.split(" ")[1]; // lo convierte en una lista, en la posicion 0 esta Bearer y en la 1 el token por eso seleccionamos la posicion 1

        // Comprobar la validez del token
        jwt.verify(token, authConfig.secret, (err, decoded) => { // el decoded es el payload (usuario)
            if(err) {
                res.status(500).json({ msg: "Ha sucedido el siguiente error: "+err})
            } else {
                User.findByPk(decoded.user.id, { include: "Role" }).then(user => { // cuando pasamos el token y verificamos el token buscamos el usuario por id que esta dentro del payload del token y sacamos el usuario junto con los roles que tiene
                   req.user = user;
                   next();
                }) 
            }
        })
    }
};