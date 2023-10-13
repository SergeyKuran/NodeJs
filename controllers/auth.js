const { HttpError } = require("../middlewares/httpError");
const { User } = require("../models/Users");
const { ControllerWrapper } = require("../utils/ControllerWrapper");
const bcryptjs = require("bcryptjs");

const singup = async (req, res) => {
  const { email, password } = req.body;
  const userFind = await User.findOne({ email });

  if (userFind) throw HttpError(409, `Email "${email}" in use`);

  const hashPassword = await bcryptjs.hash(password, 10);

  const user = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const singin = async (req, res) => {
  const { email, password } = req.body;
  const userFind = await User.findOne({ email });

  if (!userFind) throw HttpError(401, `"Email or password is wrong"`);

  const comparePassword = await bcryptjs.compare(password, userFind.password);

  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = "dsddsds";

  res.status(200).json({
    token: token,
    user: {
      email: userFind.email,
      subscription: userFind.subscription,
    },
  });
};

module.exports = {
  singup: ControllerWrapper(singup),
  singin: ControllerWrapper(singin),
};
