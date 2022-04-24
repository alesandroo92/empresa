const { check, validationResult } = require("express-validator");

const validateCreateUser = [
  check("nombre").exists().not().isEmpty().isString().withMessage('Ingrese un nombre correcto'),
  check("apellido").exists().not().isEmpty().isString().withMessage('Ingrese un apellido correcto'),
  check("email").exists().not().isEmpty().isEmail().withMessage('Ingrese un email correcto'),
  check("roleId").exists().not().isEmpty().isNumeric().withMessage('Ingrese un id correcto'),
  
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    res.status(403).send({ errors: err.array() });
  }
};

module.exports = {validateCreateUser}