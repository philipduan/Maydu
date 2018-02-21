import React from 'react';
import TextField from 'material-ui/TextField';
import DropDown from '../DropDown/DropDown';

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
        <TextField
          hintText={props.elementConfig.placeholder}
          floatingLabelText={props.elementConfig.placeholder}
          value={props.value}
          onChange={props.changed}
          errorText={validationError}
          onBlur={props.blurred}
          fullWidth={true}
          floatingLabelStyle={styles.floatingLabel}
        />
      );
      break;
    case 'textArea':
      inputElement = (
        <TextField
          hintText={props.elementConfig.placeholder}
          floatingLabelText={props.elementConfig.placeholder}
          value={props.value}
          onChange={props.changed}
          onBlur={props.blurred}
          errorText={validationError}
          multiLine={true}
          rows={5}
          fullWidth={true}
          floatingLabelStyle={styles.floatingLabel}
        />
      );
      break;
    case 'select':
      inputElement = (
        <DropDown
          value={props.value}
          options={props.elementConfig.options}
          floatingLabelText={props.elementConfig.label}
          hintText="Select Institution"
          floatingLabelStyle={styles.floatingLabel}
        />
      );
      break;

    default:
      inputElement = <input />;
  }

  return <div>{inputElement}</div>;
};

export default input;
