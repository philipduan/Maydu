// This file needs major cleanup

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
    value.trim() === '' ? errors.push(`This field is required`) : null;
  }
  if (errors.length === 0) {
    if (rules.minLength) {
      value.trim().length < rules.minLength
        ? errors.push(`Minumum number of characters: ${rules.minLength}`)
        : null;
    }
    if (rules.maxLength) {
      value.trim().length > rules.maxLength
        ? errors.push(`Maximum number of characters: ${rules.maxLength}`)
        : null;
    }
    if (rules.email) {
      console.log(emailPattern.test(value));
      !emailPattern.test(value)
        ? errors.push(`Please enter a valid email address`)
        : null;
    }
  }
  return errors;
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }
  if (rules.required) {
    isValid = value !== '' && isValid;
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  if (rules.email) {
    const pattern = /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.username) {
    const pattern = /^\S*$/;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.password) {
    isValid = value.replace(/ /g, '').length >= 8 && isValid;
  }
  if (rules.url) {
    const pattern = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    isValid = pattern.test(value) && isValid;
  }
  return isValid;
};
