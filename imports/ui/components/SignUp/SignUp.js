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
      username: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Username'
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
    const valuesToUpdate = {
      value: event.target.value,
      touched: false, // Clear errors so they don't appear as user types
      validationErrors: []
    };
    this.updateForm(valuesToUpdate, elementIdentifier);
  };

  // Update the form elementIdentifier with valuesToUpdate
  updateForm = (valuesToUpdate, elementIdentifier) => {
    const updatedElement = updateObject(
      this.state.signUpForm[elementIdentifier],
      valuesToUpdate
    );
    const updatedForm = updateObject(this.state.signUpForm, {
      [elementIdentifier]: updatedElement
    });
    this.setState({ signUpForm: updatedForm });
  };

  // When inputfield is blurred, check that the user entered valid data, and update
  // state.formIsValid based on this validity. If data isn't valid, display error
  inputBlurredHandler = (event, elementIdentifier) => {
    this.validateFormField(event.target.value, elementIdentifier);
  };

  // This input checks that value is a valid value for the elementIdentifier, and
  // updates state.formIsValid based on this validity. If data isn't valid, display an error
  validateFormField = (value, elementIdentifier) => {
    const validationErrors = getValidationErrors(
      value,
      this.state.signUpForm[elementIdentifier].validation
    );
    const valuesToUpdate = {
      value: value.trim(),
      validationErrors: validationErrors,
      touched: true,
      formIsValid: this.updateFormValidity()
    };
    this.updateForm(valuesToUpdate, elementIdentifier);
  };

  // This method returns true if every field in the form is valid, false otherwise
  updateFormValidity = () => {
    let formIsValid = true;
    for (let elementIdentifier in this.state.signUpForm) {
      let errors = this.state.signUpForm[elementIdentifier].validationErrors;
      let touched = this.state.signUpForm[elementIdentifier].touched;
      formIsValid = errors.length === 0 && touched && formIsValid;
      // touched and errors.length === 0 then valid
      // not touched and errors.length === 0 then NOT valid
    }
    console.log('FormisValid: ', formIsValid);
    return formIsValid;
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
          touched={elementFields.touched}
          changed={event => this.inputChangedHandler(event, elementIdentifier)}
          blurred={event => this.inputBlurredHandler(event, elementIdentifier)}
          validationErrors={elementFields.validationErrors}
        />
      );
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const suf = this.state.signUpForm;
    Accounts.createUser(
      {
        username: suf.username.value,
        email: suf.email.value,
        password: suf.password.value,
        profile: {
          fullName: suf.fullname.value,
          major: suf.major.value,
          institution: suf.institution.value,
          bio: suf.bio.value,
          academicYear: suf.academicYear.value,
          linkedIn: suf.linkedIn.value,
          facebook: suf.facebook.value,
          instagram: suf.instagram.value
        }
      },
      err => {
        console.log(err.reason);
      }
    );
  };

  render() {
    return (
      <div className="container container__signup">
        <h1> Sign Up </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderFormElements()}
          <button disabled={!this.state.signUpForm.formIsValid}>Sign Up</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
