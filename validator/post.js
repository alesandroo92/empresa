const { check, validationResult } = require("express-validator");

const validateCreatePost = [
  check("userId").exists().not().isEmpty().isNumeric().withMessage('Ingrese un id correcto'),  
  
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

module.exports = {validateCreatePost}