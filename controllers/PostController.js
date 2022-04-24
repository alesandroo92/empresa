const { Post } = require("../models/index");
const { User } = require("../models/index");

module.exports = {

    async createPost (req, res) {
        try {
          const {userId, contenido} = req.body;
          const newPost = await Post.create({ 
              userId: userId,
              contenido: contenido
             });
          res.status(200).json({
            msg: `Se creo correctamente el Post`,
            data: newPost
        });
          
        } catch (error) {
            res.status(404).json({"Se ha producido el siguiente error: ":error});
        }
    },

    async findAll(req, res) {
        let posts = await Post.findAll({
            attributes: ["id", "userId", "contenido"],
            include: [{ model: User, attributes: [ "nombre", "apellido", "email" ] }]
        });

        res.json(posts);
    },

    // Show
    async show(req, res, next) {
        let post = await Post.findByPk(req.params.id, {
            attributes: ["id", "userId", "contenido"],
            include: [{ model: User, attributes: [ "nombre", "apellido" ] }]
        });

        if(!post) {
            res.status(404).json({ msg: "Post no encontrado" });
        } else {
            req.post = post;
            next();
            res.json(post);
            
        }
    },

    // Update
    async update(req, res) {
        let post = await Post.findByPk(req.params.id, {
            attributes: ["id", "userId", "contenido"]
        });

        if(!post) {
            res.status(500).json({ msg: "Post no encontrado" });
        } else {
            
            post.contenido = req.body.contenido;

            post.save().then(post => {
                res.json({
                    msg: "Post editado correctamente",
                    data: post
                })
            }) 
        }
    },

    // Delete
    async delete(req, res) {
        let post = await Post.findByPk(req.params.id, {
            attributes: ["id"]
        });

        if(!post) {
            res.status(500).json({ msg: "Post no encontrado" });
        } else {
            post.destroy().then(post => {
                res.json({ msg: "El post ha sido eliminado correctamente" });
            })
            
        }
    }
}