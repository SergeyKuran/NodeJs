const { validationSchemaContacts } = require("../models/Contacts");

const listContacts = async (ownerId) => {
  return await validationSchemaContacts.find({ owner: ownerId });
};

const getById = async (id, owner) => {
  return await validationSchemaContacts.findOne({ _id: id, owner });
};

const addContact = async (body, owner) => {
  const newContact = await validationSchemaContacts.create({ ...body, owner });

  if (!newContact) throw new Error();

  return newContact;
};

const updateContact = async (id, body) => {
  return await validationSchemaContacts.findByIdAndUpdate({ _id: id }, body, {
    new: true,
  });
};

const removeContact = async (id) => {
  return await validationSchemaContacts.findByIdAndRemove({ _id: id });
};

const updateStatusContact = async (contactId, body) => {
  return await validationSchemaContacts.findByIdAndUpdate(
    { _id: contactId },
    body,
    {
      new: true,
    }
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
