const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveError, validatorsAtUpdate } = require("./hooks");

const schemaContacts = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set name for email"],
    },
    phone: {
      type: String,
      required: [true, "Set name for phone "],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

schemaContacts.post("save", handleSaveError);
schemaContacts.pre("findOneAndUpdate", validatorsAtUpdate);
schemaContacts.post("findOneAndUpdate", handleSaveError);

const validationSchemaContacts = model("contact", schemaContacts);

const validationSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .min(5)
    .max(40)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "ua"] },
    })
    .required(),

  phone: Joi.string().min(8).max(30).required(),
  favorite: Joi.boolean().default(false),
});

const validationFavorite = Joi.object({
  favorite: Joi.boolean().default(false).valid(true, false).required(),
});

module.exports = {
  validationSchemaContacts,
  validationSchema,
  validationFavorite,
};
