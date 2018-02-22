const emailPattern = /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/;

// This method returns a copy of oldObject with updatedProperties
export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

// This method takes two arguments, a value and a rules object. The rules object
// specifies the set of rules that value must be validated against. If value
// doesn't satisfy all rules, an error array consisting of failed validation
// messages is returned. Otherwise, an empty array is returned.
export const getValidationErrors = (value, rules) => {
  if (!rules) {
    return true;
  }
  let errors = [];
  let isValid = true;
  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
    !isValid ? errors.push(`This field is required`) : null;
    return errors; // Don't do any of the other checks if required fails
  }
  if (rules.minLength) {
    isValid = value.replace(/ /g, '').length >= rules.minLength && isValid;
    !isValid
      ? errors.push(`Minumum number of characters: ${rules.minLength}`)
      : null;
  }
  if (rules.maxLength) {
    isValid = value.replace(/ /g, '').length <= rules.maxLength && isValid;
    !isValid
      ? errors.push(`Maximum number of characters: ${rules.maxLength}`)
      : null;
  }
  if (rules.email) {
    isValid = emailPattern.test(value) && isValid;
    !isValid ? errors.push(`Please enter a valid email address`) : null;
  }
  return errors;
};
