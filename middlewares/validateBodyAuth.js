const { HttpError } = require("./httpError");

const validateBodyAuth = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return next(HttpError(400, `${error.message}`));
    }

    next();
  };
};

module.exports = {
  validateBodyAuth,
};
