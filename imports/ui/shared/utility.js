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
// messages is returned. Otherwise, an empty array is returned. Note, if the
// required validation fails, all other rules are ignored and an array with a
// single element ('This field is required') is returned
export const getValidationErrors = (value, rules) => {
  if (!rules) {
    return true;
  }
  let errors = [];
  let isValid = true;

  if (rules.required) {
    value.trim() !== '' ? errors.push(`This field is required`) : null;
  } else {
    if (rules.minLength) {
      value.trim().length >= rules.minLength
        ? errors.push(`Minumum number of characters: ${rules.minLength}`)
        : null;
    }
    if (rules.maxLength) {
      value.trim().length <= rules.maxLength
        ? errors.push(`Maximum number of characters: ${rules.maxLength}`)
        : null;
    }
    if (rules.email) {
      emailPattern.test(value)
        ? errors.push(`Please enter a valid email address`)
        : null;
    }
  }
  return errors;
};
