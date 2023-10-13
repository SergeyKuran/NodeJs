const nameValidationRegex = /^[A-Z][a-zA-Z '.-]*[A-Za-z][^-]$/;
const passwordValidationRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const emailValidationRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

module.exports = {
  nameValidationRegex,
  passwordValidationRegex,
  emailValidationRegex,
};
