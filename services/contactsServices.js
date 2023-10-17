const { validationSchemaContacts } = require("../models/Contacts");

const listContacts = async (userId, skip, limit) => {
  const user = await validationSchemaContacts.find(
    { owner: userId },
    { skip, limit }
  );
  return user;
};

const getById = async (id, userId) => {
  return await validationSchemaContacts
    .findOne({ _id: id, owner: userId })
    .populate("owner", "username email");
};

const addContact = async (body, userId) => {
  const newContact = await validationSchemaContacts.create({
    ...body,
    owner: userId,
  });

  if (!newContact) throw new Error();

  return newContact;
};

const updateContact = async (id, body, userId) => {
  return await validationSchemaContacts.findOneAndUpdate(
    { _id: id, owner: userId },
    body,
    { new: true }
  );
};

const removeContact = async (id, owner) => {
  return await validationSchemaContacts.findOneAndRemove({ _id: id, owner });
};

const updateStatusContact = async (contactId, body) => {
  return await validationSchemaContacts.findOneAndUpdate(
    { _id: contactId },
    body
  );
};

const contactsServices = {
  listContacts,
  getById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
};

module.exports = {
  contactsServices,
};
