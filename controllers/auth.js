const { ControllerWrapper } = require("../utils/ControllerWrapper");
const authServices = require("../services/authServices");
const { HttpError } = require("../middlewares/httpError");

const singup = async (req, res) => {
  const user = await authServices.singup(req.body);

  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const singin = async (req, res) => {
  const { token, user } = await authServices.singin(req.body);

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res) => {
  await authServices.logout(req.user._id);

  res.status(204).json({ message: "Logout success" });
};

const current = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const findUsersStatusFavorite = async (req, res) => {
  const { favorite } = req.query;
  const findContacts = await authServices.findUsersStatusFavorite(favorite);

  res.status(200).json({ findContacts });
};

const updateUserSubscription = async (req, res) => {
  const subscriptionArray = ["starter", "pro", "business"];
  const { _id } = req.user;
  const { subscription } = req.body;
  const test = subscriptionArray.includes(subscription);
  if (!test)
    throw HttpError(
      400,
      `Unfortunately, there is no such package. Choose one from ${subscriptionArray}`
    );

  const updateUser = await authServices.updateUserSubscription(
    _id,
    subscription
  );

  res.status(200).json(updateUser);
};

module.exports = {
  singup: ControllerWrapper(singup),
  singin: ControllerWrapper(singin),
  logout: ControllerWrapper(logout),
  current: ControllerWrapper(current),
  findUsersStatusFavorite: ControllerWrapper(findUsersStatusFavorite),
  updateUserSubscription: ControllerWrapper(updateUserSubscription),
};
