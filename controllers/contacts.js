const { contactsServices } = require("../services/contactsServices");
const { ControllerWrapper } = require("../utils/ControllerWrapper");
const { HttpError } = require("../middlewares/httpError");

const getAllContactsController = async (req, res) => {
  const userId = req.user._id;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const data = await contactsServices.listContacts(userId, skip, limit);
  res.json(data);
};

const getContactByIdController = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  const dataContacts = await contactsServices.getById(id, userId);

  if (!dataContacts) throw HttpError(404);

  res.json(dataContacts);
};

const createContactController = async (req, res) => {
  const userId = req.user._id;
  const dataContacts = await contactsServices.addContact(req.body, userId);

  if (!dataContacts) throw HttpError(400, `Missing required ${req.body} field`);

  res.status(201).json(dataContacts);
};

const updateContactController = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  const dataContacts = await contactsServices.updateContact(
    id,
    req.body,
    userId
  );
  
  if (!dataContacts) throw HttpError(404);

  res.status(200).json(dataContacts);
};

const deleteContactController = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const dataContacts = await contactsServices.removeContact(id, owner);

  if (!dataContacts) throw HttpError(404);

  res.status(200).json({ message: "Contact deleted" });
};

const updateContactStatus = async (req, res) => {
  const { id } = req.params;

  const dataContacts = await contactsServices.updateStatusContact(id, req.body);

  if (!dataContacts) throw HttpError(404);

  res.status(200).json(dataContacts);
};

const crtlContacts = {
  getAllContactsController: ControllerWrapper(getAllContactsController),
  getContactByIdController: ControllerWrapper(getContactByIdController),
  createContactController: ControllerWrapper(createContactController),
  updateContactController: ControllerWrapper(updateContactController),
  deleteContactController: ControllerWrapper(deleteContactController),
  updateContactStatus: ControllerWrapper(updateContactStatus),
};

module.exports = {
  crtlContacts,
};
