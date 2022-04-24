const { Role } = require("../models/index");

const createRole = async (req, res) => {
    try {
      const {nombre} = req.body;
      const newRole = await Role.create({ nombre: nombre });
      res.status(200).json({
        msg: `Se creo correctamente el role`,
        data: newRole
    });
      
    } catch (error) {
        res.status(404).json({error});
    }
}

module.exports = createRole;