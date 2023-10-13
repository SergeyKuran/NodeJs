const express = require("express");
const router = express.Router();

const { crtlContacts } = require("../controllers/contacts");

const { validId } = require("../middlewares/isValidId");

const { validateBody } = require("../middlewares/validateBody");

const {
  IsEmptyBody,
  IsEmptyBodyFavorite,
} = require("../middlewares/isEmptyBody");

const { validationSchema, validationFavorite } = require("../models/Contacts");

router
  .route("/contacts")
  .get(crtlContacts.getAllContactsController)
  .post(validateBody(validationSchema), crtlContacts.createContactController);

router
  .route("/contacts/:id")
  .get(validId, crtlContacts.getContactByIdController)
  .put(
    validId,
    IsEmptyBody,
    validateBody(validationSchema),
    crtlContacts.updateContactController
  )
  .delete(validId, crtlContacts.deleteContactController);

router
  .route("/contacts/:id/favorite")
  .patch(
    validId,
    IsEmptyBodyFavorite,
    validateBody(validationFavorite),
    crtlContacts.updateContactStatus
  );

module.exports = router;
