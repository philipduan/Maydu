import React from 'react';

const input = props => {
  styles = {
    floatingLabel: {
      color: 'black'
    }
  };

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
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'texarea':
      inputElement = (
        <input
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select value={props.value} onChange={props.changed}>
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

  return <div>{inputElement}</div>;
};

export default input;
