const { validationSchemaContacts } = require("../models/Contacts");

const listContacts = async () => {
  return await validationSchemaContacts.find();
};

const getById = async (id) => {
  return await validationSchemaContacts.findById(id);
};

const addContact = async (body) => {
  const newContact = await validationSchemaContacts.create({ ...body });

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

const serviceContact = {
  listContacts,
  getById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
};

module.exports = {
  serviceContact,
};
