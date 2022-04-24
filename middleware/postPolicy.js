module.exports = {

    show(req, res, next) {
        if(req.user.id === req.post.userId || req.user.roleId === 1) { 
            next();
        } else {
           res.status(404).json({ msg: "No estas autorizado para ver este post" })
        }
    },

    update(req, res, next) {
        if(req.user.id === req.post.userId || req.user.roleId === 1) { 
            next();
        } else {
            res.status(404).json({ msg: "No estas autorizado para editar este post" });
        }
    },
}