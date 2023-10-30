const { User } = require("../models/Users");
const { HttpError } = require("../middlewares/httpError");
const { validationSchemaContacts } = require("../models/Contacts");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const gravatar = require("gravatar");

const { JWT_SECRET } = process.env;

const singup = async (body) => {
  const { email, password } = body;

  const userFind = await User.findOne({ email });

  if (userFind) throw HttpError(409, `Email "${email}" in use`);

  const avatarURL = await gravatar.url(email);
  const hashPassword = await bcryptjs.hash(password, 10);

  return await User.create({
    ...body,
    password: hashPassword,
    avatarURL,
  });
};

const singin = async (body) => {
  const userFind = await User.findOne({ email: body.email });

  if (!userFind) throw HttpError(401, `"Email or password is wrong"`);

  const comparePassword = await bcryptjs.compare(
    body.password,
    userFind.password
  );

  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: userFind._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  const user = await User.findByIdAndUpdate(userFind._id, { token });

  return {
    token: token,
    user,
  };
};

const logout = async (userId) => {
  await User.findByIdAndUpdate({ _id: userId }, { token: "" });
};

const findUsersStatusFavorite = async (boolean) => {
  return await validationSchemaContacts.find({ favorite: boolean });
};

const updateUserSubscription = async (userId, subscription) => {
  const user = await User.findByIdAndUpdate(
    { _id: userId },
    { subscription },
    { new: true }
  );

  if (!user) throw HttpError(404, `Id: ${userId} not found`);

  return user;
};

const updateAvatar = async (_id, pathAvatar) => {
  const user = await User.findByIdAndUpdate(
    { _id: _id },
    { avatarURL: pathAvatar },
    { new: true }
  );

  if (!user) throw HttpError(404, `Id: ${_id} not found`);

  return user;
};

const authServices = {
  singup,
  singin,
  logout,
  findUsersStatusFavorite,
  updateUserSubscription,
  updateAvatar,
};

module.exports = authServices;
