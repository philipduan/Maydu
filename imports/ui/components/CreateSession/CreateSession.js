//AIzaSyDPLX_ninGSSp3B9Jk0iKSyFkhyco86hVc place
//AIzaSyBZwHx5OGDGyYJm0oHQksjYKrrtv-hoSe8 map
//AIzaSyDpRfCNlC3iEZlflpSlhrUtxVBZODM1B4c js
import React, { Component } from 'react';
import CreateSessionFields from './CreateSessionFields';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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

  // //Setting state of user email and passworld on each keystroke
  // handleInputChange = event => {
  //   event.preventDefault();
  //   const value = event.target.value;
  //   const name = event.target.name;
  //   console.log(name, value);
  //   this.setState({
  //     [name]: value
  //   });
  // };

  // handleDatePicker = (event, date) => {
  //   this.setState({
  //     date: moment(date).format('YYYY-MM-DD')
  //   });
  // };

  // handleTimePicker = (event, time) => {
  //   this.setState({
  //     time: moment(time).format('hh:mm A')
  //   });
  // };

  // //Checking DB if the user and password match - if no user exists or their password is inncorect, throw an error
  // handleSignInSubmit = event => {
  //   event.preventDefault();

  //   Meteor.loginWithPassword(this.state.email, this.state.password, err => {
  //     this.setState({ error: `${err.reason}, please try again!` });
  //   });
  //   Meteor.loggingIn();
  // };

  renderInput = field => (
    <div className="inputWrapper  ">
      <TextField
        autoComplete="off"
        className={field.className}
        hintText={field.label}
        name={field.name}
        type={field.type}
        fullWidth={true}
        errorText={
          field.name === 'postalCode'
            ? this.state.error
            : field.meta.touched ? field.meta.error : null
        }
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
      <div className="inputWrapper">
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

  renderSelectField = ({
    className,
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
  }) => (
    <div className="inputWrapper  ">
      <SelectField
        className={className}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}
      />
    </div>
  );

  onSubmit(values) {
    // console.table({
    //   ...values,
    //   courseCode: values.courseCode.replace(/\s/g, '').toUpperCase()
    // });
    this.state.error === '' ? null : this.setState({ error: '' });
    const geocoder = new google.maps.Geocoder();
    const address = `${values.street},${values.city},${values.province},${
      values.postalCode
    }`;
    geocoder.geocode({ address }, (results, status) => {
      console.log(results);
      if (status === google.maps.GeocoderStatus.OK) {
        values = {
          ...values,
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
          address
        };
        console.log(values);
      } else {
        this.setState({
          error: 'No result found. Please verify your address'
        });
      }
    });
  }

  menuItems = provinces => {
    return provinces.map(province => (
      <MenuItem
        key={province.key}
        value={province.value}
        primaryText={province.value}
      />
    ));
  };

  render() {
    const { handleSubmit } = this.props;
    const provinces = [
      { key: 1, value: 'Alberta' },
      { key: 2, value: 'British Columbia' },
      { key: 3, value: 'Manitoba' },
      { key: 4, value: 'New Brunswick' },
      { key: 5, value: 'NewFoundland and Labrador' },
      { key: 6, value: 'Nova Scotia' },
      { key: 7, value: 'Ontario' },
      { key: 8, value: 'Prince Edward Island' },
      { key: 9, value: 'Quebec' },
      { key: 10, value: 'Saskatchewan' }
    ];
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
              name="street"
              type="text"
              component={this.renderInput}
            />

            <Field
              className="Field"
              label="City"
              name="city"
              type="text"
              component={this.renderInput}
            />

            <Field
              className="Field"
              label="Province"
              name="province"
              component={this.renderSelectField}
            >
              {this.menuItems(provinces)}
            </Field>

            <Field
              className="Field"
              label="Postal Code"
              name="postalCode"
              type="text"
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
  var postalCode = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
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
  if (!values.street) {
    errors.street = 'This field is required';
  }
  if (!values.city) {
    errors.city = 'This field is required';
  }
  if (!values.province) {
    errors.province = 'This field is required';
  }
  if (!values.postalCode) {
    errors.postalCode = 'This field is required';
  }
  if (!postalCode.test(values.postalCode)) {
    errors.postalCode = 'Please enter a valid postal code';
  }
  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'createSessionForm'
})(CreateSession);
