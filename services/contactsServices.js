const { validationSchemaContacts } = require("../models/Contacts");

const listContacts = async (userId, skip, limit) => {
  const user = await validationSchemaContacts
    .find({ owner: userId })
    .skip(skip)
    .limit(limit)
    .populate("owner", "username email");
  return user;
};

const getById = async (id, userId) => {
  return await validationSchemaContacts.findOne({ _id: id, owner: userId });
};

const addContact = async (body, userId) => {
  return await validationSchemaContacts.create({
    ...body,
    owner: userId,
  });
};

const updateContact = async (id, body, userId) => {
  return await validationSchemaContacts.findOneAndUpdate(
    {
      _id: id,
      owner: userId,
    },
    body,
    { new: true }
  );
};

const removeContact = async (id, owner) => {
  return await validationSchemaContacts.findByIdAndRemove({ _id: id, owner });
};

const updateStatusContact = async (contactId, body) => {
  return await validationSchemaContacts.findByIdAndUpdate(
    { _id: contactId },
    body,
    { new: true }
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
