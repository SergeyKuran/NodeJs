const { HttpError } = require("../middlewares/httpError");
const { ControllerWrapper } = require("../utils/ControllerWrapper");
const { User } = require("../models/Users");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

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

  const payload = {
    id: userFind._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  res.status(200).json({
    token,
    user: {
      email: userFind.email,
      subscription: userFind.subscription,
    },
  });
};

// const logout = async (req, res) => {
//   const { id } = req.body;
//   const user = User.findById(id);

//   if (!user) throw HttpError(401, "Not authorized");
//   res.status(201).json({ message: "No Content" });
// };

const current = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

module.exports = {
  singup: ControllerWrapper(singup),
  singin: ControllerWrapper(singin),
  // logout: ControllerWrapper(logout),
  current: ControllerWrapper(current),
};
