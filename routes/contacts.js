const express = require("express");
const router = express.Router();

const { crtlContacts } = require("../controllers/contacts");

const { validId } = require("../middlewares/isValidId");
const { validateBody } = require("../middlewares/validateBody");
const { authentificate } = require("../middlewares/authentificate");

const {
  IsEmptyBody,
  IsEmptyBodyFavorite,
} = require("../middlewares/isEmptyBody");

const { validationSchema, validationFavorite } = require("../models/Contacts");

router.use(authentificate);

router
  .route("/")
  .get(crtlContacts.getAllContactsController)
  .post(
    IsEmptyBody,
    validateBody(validationSchema),
    crtlContacts.createContactController
  );

router
  .route("/:id")
  .get(validId, crtlContacts.getContactByIdController)
  .put(
    validId,
    IsEmptyBody,
    validateBody(validationSchema),
    crtlContacts.updateContactController
  )
  .delete(validId, crtlContacts.deleteContactController);

router
  .route("/:id/favorite")
  .patch(
    validId,
    IsEmptyBodyFavorite,
    validateBody(validationFavorite),
    crtlContacts.updateContactStatus
  );

module.exports = router;
