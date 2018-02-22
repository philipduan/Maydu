// React
import React, { Component } from 'react';
// Meteor
import { Accounts } from 'meteor/accounts-base';
// Components and Containers
import Input from '../Input/Input';
//utility
import { updateObject, checkValidity } from '../../shared/utility';
// Styles
import './styles.css';

class SignUp extends Component {
  // Make sure everything is trimmed

  state = {
    signUpForm: {
      fullName: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: `You must enter your name`
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
        validationMessage: 'Please enter a valid email address'
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 8
        },
        valid: false,
        touched: false,
        validationMessage: 'Your password must be at least 8 characters long'
      },
      institution: {
        elementType: 'select',
        elementConfig: {
          options: [
            {
              displayName: 'University of Waterloo',
              value: 'University of Waterloo'
            },
            {
              displayName: 'University of Toronto',
              value: 'University of Toronto'
            }
          ],
          label: 'Select Institution'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: 'You must select an institution'
      },
      major: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Major'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: 'Please enter your major.'
      },
      academicYear: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Academic Year'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: 'Please enter your academic year'
      },
      bio: {
        elementType: 'textArea',
        elementConfig: {
          placeholder: 'Bio: Tell us something intersting about yourself!'
        },
        value: '',
        validation: {
          required: true,
          minLength: 50,
          maxLength: 300
        },
        valid: false,
        touched: false,
        validationMessage: 'Your bio must be 50-300 characters long'
      },
      facebook: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Facebook (otional)'
        },
        value: '',
        validation: {},
        valid: false,
        touched: false
      },
      instagram: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Instagram (optional)'
        },
        value: '',
        validation: {},
        valid: false,
        touched: false
      },
      linkedIn: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'LinkedIn (optional)'
        },
        value: '',
        validation: {},
        valid: false,
        touched: false
      }
    },
    formIsValid: false
  };

  // This method updates the value of the elementIdentifier in state.
  // The only purpose of this method is to update the input element user value
  inputChangedHandler = (event, elementIdentifier) => {
    const updatedFormElement = updateObject(
      this.state.signUpForm[elementIdentifier],
      {
        value: event.target.value,
        touched: false
      }
    );
    const updatedForm = updateObject(this.state.signUpForm, {
      [elementIdentifier]: updatedFormElement
    });
    this.setState({
      signUpForm: updatedForm
    });
  };

  // This method transforms the signUpForm object in state into an actual form with jsx
  renderFormElements = () => {
    return Object.entries(this.state.signUpForm).map(element => {
      let elementIdentifier = element[0]; // FullName, Email, Password
      let elementFields = element[1]; // The fields in each identifier object
      return (
        <Input
          key={elementIdentifier}
          elementType={elementFields.elementType}
          elementConfig={elementFields.elementConfig}
          value={elementFields.value}
          invalid={!elementFields.valid}
          shouldValidate={elementFields.validation}
          touched={elementFields.touched}
          changed={event => this.inputChangedHandler(event, elementIdentifier)}
          // blurred={event => this.inputBlurredHandler(event, element[0])}
          validationMsg={elementFields.validationMessage}
        />
      );
    });
  };

  render() {
    return (
      <div className="container container__signup">
        <form>{this.renderFormElements()}</form>
      </div>
    );
  }
}

export default SignUp;
