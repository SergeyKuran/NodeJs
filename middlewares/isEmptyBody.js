const { HttpError } = require("../middlewares/httpError");
const { validationFavorite } = require("../models/Contacts");

const IsEmptyBody = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return next(HttpError(400, `Missing fields`));
  }

  next();
};

const IsEmptyBodyFavorite = (req, res, next) => {
  const { error } = validationFavorite.validate(req.body);

  if (error) {
    return next(HttpError(400, `Missing fields! ${error.message}`));
  }

  next();
};

module.exports = {
  IsEmptyBody,
  IsEmptyBodyFavorite,
};
