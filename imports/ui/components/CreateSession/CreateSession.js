//AIzaSyDPLX_ninGSSp3B9Jk0iKSyFkhyco86hVc place
//AIzaSyBZwHx5OGDGyYJm0oHQksjYKrrtv-hoSe8 map
import React, { Component } from 'react';
import CreateSessionFields from './CreateSessionFields';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import './styles.css';

class CreateSession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      courseCode: '',
      capacity: '',
      date: '',
      time: '',
      error: ''
    };
  }

  //Setting state of user email and passworld on each keystroke
  handleInputChange = event => {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;
    console.log(name, value);
    this.setState({
      [name]: value
    });
  };

  handleDatePicker = (event, date) => {
    this.setState({
      date: moment(date).format('YYYY-MM-DD')
    });
  };

  handleTimePicker = (event, time) => {
    this.setState({
      time: moment(time).format('hh:mm A')
    });
  };

  //Checking DB if the user and password match - if no user exists or their password is inncorect, throw an error
  handleSignInSubmit = event => {
    event.preventDefault();

    Meteor.loginWithPassword(this.state.email, this.state.password, err => {
      this.setState({ error: `${err.reason}, please try again!` });
    });
    Meteor.loggingIn();
  };

  renderInput = field => (
    <div className="inputWrapper  ">
      <TextField
        autoComplete="off"
        className={field.className}
        hintText={field.label}
        name={field.name}
        type={field.type}
        fullWidth={true}
        errorText={field.meta.touched ? field.meta.error : null}
        {...field.input}
      />
    </div>
  );

  renderDatePicker = ({
    input,
    meta: { touched, error },
    children,
    ...custom
  }) => {
    const today = new Date();
    return (
      <div className="inputWrapper  ">
        <DatePicker
          hintText={moment().format('YYYY-MM-DD')}
          minDate={today}
          errorText={touched && error}
          onChange={(event, date) =>
            input.onChange(moment(date).format('YYYY-MM-DD'))
          }
          fullWidth={true}
        />
      </div>
    );
  };

  renderTimePicker = ({
    input,
    meta: { touched, error },
    children,
    ...custom
  }) => {
    return (
      <div className="inputWrapper  ">
        <TimePicker
          hintText="12:00 AM "
          minutesStep={5}
          errorText={touched && error}
          onChange={(event, time) =>
            input.onChange(moment(time).format('hh:mm A'))
          }
          fullWidth={true}
        />
      </div>
    );
  };

  onSubmit(values) {
    console.table({
      ...values,
      courseCode: values.courseCode.replace(/\s/g, '').toUpperCase()
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="Create-Session-Container">
        <div className="Create-Session-Box">
          <h3> Create A Study Session </h3>
          {/* <form onSubmit={this.handleSignInSubmit}> */}
          <form
            className="Create-Session-Form"
            onSubmit={handleSubmit(this.onSubmit.bind(this))}
          >
            <Field
              className="Field"
              label="Title"
              name="title"
              type="text"
              component={this.renderInput}
            />
            <Field
              className="Field"
              label="Course Code"
              name="courseCode"
              type="text"
              component={this.renderInput}
            />
            <Field
              className="Field"
              label="Description"
              name="description"
              type="text"
              component={this.renderInput}
            />
            <Field
              className="Field"
              label="Capacity"
              name="capacity"
              type="number"
              component={this.renderInput}
            />
            <Field
              name="date"
              className="Field DatePicker"
              component={this.renderDatePicker}
            />

            <Field
              name="time"
              className="Field TimePicker"
              component={this.renderTimePicker}
            />

            <Field
              className="Field"
              label="Street Adress"
              name="capacity"
              type="number"
              component={this.renderInput}
            />

            <p> {this.state.error} </p>
            <button type="submit" className="Sign-In-Submit">
              {' '}
              Submit{' '}
            </button>
          </form>
        </div>
      </div>
    );
  }
}
function validate(values) {
  const errors = {};
  // courseCode = /^[a-zA-Z0-9 ]+$/;
  // if (!values.title) {
  //   errors.title = 'Please enter a title';
  // }
  // if (!courseCode.test(values.courseCode)) {
  //   errors.courseCode = 'Only letters and numbers';
  // }
  // if (!values.capacity) {
  //   errors.capacity = 'Please enter a number';
  // }
  // if (!values.date) {
  //   errors.date = 'Please choose a date';
  // }
  // if (!values.time) {
  //   errors.time = 'Please choose a time';
  // }

  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'createSessionForm'
})(CreateSession);
