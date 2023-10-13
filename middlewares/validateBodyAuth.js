const { HttpError } = require("./httpError");

const validateBodyAuth = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      //   const missingField = error.details[0].context.key;
      return next(HttpError(400, `${error.message}`));
    }

    next();
  };
};

module.exports = {
  validateBodyAuth,
};
