const { isValidObjectId } = require("mongoose");
const { HttpError } = require("./httpError");

const validId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(HttpError(400, `This ${id} is not valid`));
  }
  next();
};

module.exports = {
  validId,
};
