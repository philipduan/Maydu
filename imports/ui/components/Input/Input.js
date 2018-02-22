import React from 'react';

const input = props => {
  let validationError = null;
  if (props.invalid && props.shouldValidate && props.touched) {
    validationError = props.validationMsg
      ? props.validationMsg
      : 'Please enter a valid value!';
  }

  let inputElement = null;
  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          cols="5"
          rows="5"
        />
      );
      break;
    case 'select':
      inputElement = (
        <select value={props.value} onChange={props.changed}>
          <option value="" disabled selected hidden>
            {props.elementConfig.label}
          </option>
          {props.elementConfig.options.map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayName}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = <input />;
  }

  return (
    <div>
      {validationError ? <p> validationError </p> : null}
      {inputElement}
    </div>
  );
};

export default input;
