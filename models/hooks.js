const handleSaveError = (error, data, next) => {
  const { name, code } = error;
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;

  next();
};

const validatorsAtUpdate = function (next) {
  this.options.validatorsAtUpdate = true;
  this.option.new = true;
  next();
};

module.exports = {
  handleSaveError,
  validatorsAtUpdate,
};
