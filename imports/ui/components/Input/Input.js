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
        <input
          className="signup_input"
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          onBlur={props.blurred}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <div>
          <textarea
            className="signup_input signup_textarea"
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
            onBlur={props.blurred}
            maxLength={400}
          />
          {props.value.length > 0 ? (
            <p className="bio_counter">Num Chars: {props.value.length} </p>
          ) : null}
        </div>
      );
      break;
    case 'select':
      let selectClass = 'signup_input';
      if (props.value === '') {
        selectClass += ' signup_select_gray';
      }
      inputElement = (
        <select
          className={selectClass}
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
        <input
          className="signup_input"
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
      {validationError ? (
        <p className="signup_error">{validationError}</p>
      ) : null}
      {inputElement}
    </div>
  );
};

export default input;
