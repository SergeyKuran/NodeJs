const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const {
  userSingupSchema,
  userSinginSchema,
  userEmailSchema,
} = require("../models/Users");
const { validateBodyAuth } = require("../middlewares/validateBodyAuth");
const { IsEmptyBody } = require("../middlewares/isEmptyBody");

const { authentificate } = require("../middlewares/authentificate");
const storage = require("../middlewares/upload");

router.post(
  "/register",
  IsEmptyBody,
  validateBodyAuth(userSingupSchema),
  authController.singup
);

router.post(
  "/login",
  IsEmptyBody,
  validateBodyAuth(userSinginSchema),
  authController.singin
);

router.post("/logout", authentificate, authController.logout);

router.get("/current", authentificate, authController.current);

router
  .route("/")
  .get(authentificate, authController.findUsersStatusFavorite)
  .patch(authentificate, authController.updateUserSubscription);

router.patch(
  "/avatars",
  authentificate,
  storage.single("avatar"),
  authController.updateAvatar
);

router.get("/verify/:verificationToken", authController.verify);

router.post(
  "/verify",
  validateBodyAuth(userEmailSchema),
  authController.resendVerify
);

module.exports = router;
