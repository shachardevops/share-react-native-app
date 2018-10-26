import validator from 'validator';
const validate = (value, rules, connectedValue) => {
  let isValid = true;
  for (let rule in rules) {
    switch (rule) {
      case 'isEmail':
        isValid = isValid && emailValidator(value);
        break;
      case 'minLength':
        isValid = isValid && minLengthValidator(value, rules[rule]);
        break;

      case 'equalTo':
        isValid = isValid && equalToValidatror(value, connectedValue[rule]);
        break;
      case 'notEmpty':
        isValid = isValid && notEmptyValidator(value);
        break;
      default:
        isValid = true;
    }
  }
  return isValid;
};
const emailValidator = value => {
  return validator.isEmail(value);
};

const minLengthValidator = (value, minLength) => {
  return value.length >= minLength;
};

const equalToValidatror = (value, checkValue) => {
  return value === checkValue;
};
const notEmptyValidator = value => {
  return !!value.trim();
};
export default validate;
