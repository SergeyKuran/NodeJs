const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveError, validatorsAtUpdate } = require("../models/hooks");
const {
  passwordValidationRegex,
  emailValidationRegex,
} = require("../utils/validation/constans/regex");

const schemaUser = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

schemaUser.post("save", handleSaveError);
schemaUser.pre("findOneAndUpdate", validatorsAtUpdate);
schemaUser.post("findOneAndUpdate", handleSaveError);

const userSingupSchema = Joi.object({
  email: Joi.string().pattern(emailValidationRegex).required(),
  password: Joi.string().min(6).pattern(passwordValidationRegex).required(),
});

const userSinginSchema = Joi.object({
  email: Joi.string().pattern(emailValidationRegex).required(),
  password: Joi.string().required(),
});

const User = model("user", schemaUser);

module.exports = {
  User,
  userSingupSchema,
  userSinginSchema,
};
