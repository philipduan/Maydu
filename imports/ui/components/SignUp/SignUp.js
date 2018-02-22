// React
import React, { Component } from 'react';
// Meteor
import { Accounts } from 'meteor/accounts-base';
// Components and Containers
import Input from '../Input/Input';
//utility
import {
  updateObject,
  checkValidity,
  getValidationErrors
} from '../../shared/utility';
// Styles
import './styles.css';

class SignUp extends Component {
  // Make sure everything is trimmed

  state = {
    // Define the signup form
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
        validationErrors: [],
        touched: false
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
          email: true
        },
        validationErrors: [],
        touched: false
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
        validationErrors: [],
        touched: false
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
        validationErrors: [],
        touched: false
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
        validationErrors: [],
        touched: false
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
        validationErrors: [],
        touched: false
      },
      bio: {
        elementType: 'textarea',
        elementConfig: {
          placeholder: 'Bio: Tell us something intersting about yourself!'
        },
        value: '',
        validation: {
          required: true,
          minLength: 50,
          maxLength: 300
        },
        validationErrors: [],
        touched: false
      },
      facebook: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Facebook'
        },
        value: '',
        validation: {},
        validationErrors: [],
        touched: false
      },
      instagram: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Instagram'
        },
        value: '',
        validation: {},
        validationErrors: [],
        touched: false
      },
      linkedIn: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'LinkedIn'
        },
        value: '',
        validation: {},
        validationErrors: [],
        touched: false
      }
    },
    formIsValid: false
  };

  // This method updates the value of the elementIdentifier in state.
  // The only purpose of this method is to update the input element user value
  inputChangedHandler = (event, elementIdentifier) => {
    // We do this to avoid manipulating the state directly
    const updatedElement = this.updateElement(
      event.target.value,
      elementIdentifier
    );
    const updatedForm = this.updateForm(updatedElement, elementIdentifier);
    this.setState({ signUpForm: updatedForm });
  };

  // This method returns a NEW object. It copies state.elementIdentifier, then updates
  // it's value with updatedValue
  // This method needs to be updated so as to remove touched and validationErrors
  updateElement = (updatedValue, elementIdentifier) => {
    return updateObject(this.state.signUpForm[elementIdentifier], {
      value: updatedValue,
      touched: false, // Just so that errors don't appear as user types
      validationErrors: [] // clear all errors
    });
  };

  // This method returns a NEW object. It copies state.signUpForm, and updates the field
  // corresponding to elementIdentifier with updatedElement
  updateForm = (updatedElement, elementIdentifier) => {
    return updateObject(this.state.signUpForm, {
      [elementIdentifier]: updatedElement
    });
  };

  inputBlurredHandler = (event, elementIdentifier) => {
    validationErrors = getValidationErrors(
      event.target.value,
      this.state.signUpForm[elementIdentifier].validation
    );
    const updatedFormElement = updateObject(
      this.state.signUpForm[elementIdentifier],
      {
        value: event.target.value,
        validationErrors: validationErrors,
        touched: true
      }
    );
    const updatedForm = updateObject(this.state.signUpForm, {
      [elementIdentifier]: updatedFormElement
    });
    let formIsValid = true;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[elementIdentifier].valid && formIsValid;
    }
    this.setState({
      signUpForm: updatedForm,
      formIsValid: formIsValid
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
          // invalid={!elementFields.valid}
          // shouldValidate={elementFields.validation}
          touched={elementFields.touched}
          changed={event => this.inputChangedHandler(event, elementIdentifier)}
          blurred={event => this.inputBlurredHandler(event, elementIdentifier)}
          validationErrors={elementFields.validationErrors}
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
