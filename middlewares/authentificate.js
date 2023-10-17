const { HttpError } = require("./httpError");

const { User } = require("../models/Users");

const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const authentificate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);

    if (!user) {
      return next(HttpError(401));
    }
    req.user = user;

    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = {
  authentificate,
};
