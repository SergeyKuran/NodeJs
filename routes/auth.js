const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const { userSingupSchema, userSinginSchema } = require("../models/Users");
const { validateBodyAuth } = require("../middlewares/validateBodyAuth");
const { IsEmptyBody } = require("../middlewares/isEmptyBody");

const { authentificate } = require("../middlewares/authentificate");

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

// router.post("/users/logout", authController.logout);

router.get("/users/current", authentificate, authController.current);

module.exports = router;
