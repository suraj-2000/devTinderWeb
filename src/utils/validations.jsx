import validator from "validator";

export const userLoginValidation = (emailId, password) => {
  const errors = {};

  if (!emailId.trim()) {
    errors.email = "Email is required";
  } else if (!validator.isEmail(emailId)) {
    errors.email = "Invalid email format";
  }

  if (!password.trim()) {
    errors.password = "Password is required";
  }

  return errors;
};