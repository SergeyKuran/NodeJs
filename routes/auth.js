const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const { userSingupSchema, userSinginSchema } = require("../models/Users");
const { validateBodyAuth } = require("../middlewares/validateBodyAuth");
const { IsEmptyBody } = require("../middlewares/isEmptyBody");

router.post(
  "/users/register",
  IsEmptyBody,
  validateBodyAuth(userSingupSchema),
  authController.singup
);

router.post(
  "/users/login",
  IsEmptyBody,
  validateBodyAuth(userSinginSchema),
  authController.singin
);

module.exports = router;
