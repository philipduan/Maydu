import React from 'react';
import './styles.css';

const input = props => {
  let inputElement = null;
  let validationError = null;
  if (props.invalid && props.shouldValidate && props.touched) {
    validationError = props.validationMsg
      ? props.validationMsg
      : 'Please enter a valid value!';
  }
  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input className="signup_input"
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          onBlur={props.blurred}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea className="signup_input"
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          onBlur={props.blurred}
          maxLength={400}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select className="signup_input gray"
          defaultValue={props.elementConfig.defaultSelect}
          onChange={props.changed}
          onBlur={props.blurred}
        >
          <option disabled hidden>
           {props.elementConfig.defaultSelect}
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
    case 'input_image':
      inputElement = (
        <input className="signup_input"
          {...props.elementConfig}
          onChange={props.changed}
          value={props.value}
        />
      );
      break;
    default:
      inputElement = <input />;
  }

  return (
    <div>
      <p className="signup_label"> {props.elementConfig.label} </p>
      {validationError ? <p className="signup_error">{validationError}</p> : null}
      {inputElement}
    </div>
  );
};

export default input;
