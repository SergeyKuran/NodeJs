const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const { userSingupSchema, userSinginSchema } = require("../models/Users");
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

router.patch("/avatars", authentificate, storage.single("avatar"));

router
  .route("/")
  .get(authentificate, authController.findUsersStatusFavorite)
  .patch(authentificate, authController.updateUserSubscription);

module.exports = router;
