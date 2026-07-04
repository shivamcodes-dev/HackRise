const validator = require("validator");

const validate = (data) => {
  const mandatoryField = ["firstName", "emailId", "password"];

  //yha ye check karega ki pure data me mendaroryField me jo hai vo hai ya nhi aur return true false
  const IsAllowed = mandatoryField.every((k) => Object.keys(data).includes(k));

  if (!IsAllowed) {
    throw new Error("Some Field Missing");
  }

  if (!validator.isEmail(data.emailId)) {
    throw new Error("Invalid Email! plz try again..");
  }

  if (!validator.isStrongPassword(data.password)) {
    throw new Error("Plese provide a strong Password");
  }
};

module.exports = validate;
