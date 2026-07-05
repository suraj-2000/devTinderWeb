import validator from "validator";

export const userLoginValidation = (firstName, lastName,emailId, password, isLogin) => {
  const errors = {};

  if (!emailId.trim()) {
    errors.email = "Email is required";
  } else if (!validator.isEmail(emailId)) {
    errors.email = "Invalid email format";
  }

  if (!password.trim()) {
    errors.password = "Password is required";
  } else if(!validator.isStrongPassword(password)) {
        errors.password = "Please enter strong password.";
    }
    
  if(!isLogin) {
        if (!firstName.trim()) {
            errors.firstName = "First name is required";
        }
        if (!lastName.trim()) {
            errors.lastName = "Last name is required";
        }
    }

  return errors;
};