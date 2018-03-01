import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Field, reduxForm } from 'redux-form';
import { image, helpers } from 'faker';
import _ from 'lodash';
import moment from 'moment';
import { withTracker } from 'meteor/react-meteor-data';
import './styles.css';
import { withRouter } from 'react-router-dom';

class CreateSession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

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

  renderDatePicker = field => {
    const today = new Date();
    return (
      <div className="inputWrapper">
        <DatePicker
          hintText={moment().format('ddd MMM Do YYYY')}
          minDate={today}
          errorText={field.meta.touched && field.meta.error}
          onChange={(event, date) =>
            field.input.onChange(moment(date).format('ddd MMM Do YYYY'))
          }
          fullWidth={true}
        />
      </div>
    );
  };

  renderTimePicker = field => {
    return (
      <div className="inputWrapper  ">
        <TimePicker
          hintText="12:00 AM "
          minutesStep={5}
          errorText={field.meta.touched && field.meta.error}
          onChange={(event, time) =>
            field.input.onChange(moment(time).format('hh:mm A'))
          }
          fullWidth={true}
        />
      </div>
    );
  };

  renderSelectField = field => (
    <div className="inputWrapper  ">
      <SelectField
        className={field.className}
        floatingLabelText={field.label}
        errorText={field.meta.touched && field.metaerror}
        {...field.input}
        onChange={(event, index, value) => field.input.onChange(value)}
        children={field.children}
        fullWidth={true}
      />
    </div>
  );

  onSubmit = values => {
    const geocoder = new google.maps.Geocoder();
    const address = `${values.street},${values.city},${values.province},${
      values.postalCode
    }`;
    this.state.error ? null : this.setState({ error: '' });
    geocoder.geocode({ address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        this.setState({ error: '' });
        const { name, email, phone } = helpers.createCard(); //generates a full profile from faker library
        const simpleInstitutionArray = [
          'University of Toronto',
          'Ryerson',
          'RED'
        ];
        values = {
          ...values,
          courseCode: values.courseCode.replace(/\s/g, '').toUpperCase(),
          exactGeoCode: {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          },
          address,
          institution: _.sample(simpleInstitutionArray),
          sessionCreator: {
            _id: `${Math.floor(
              Math.random() * (Math.floor(9999) - Math.ceil(1000) + 1)
            ) + 1}`,
            profile: {
              fullName: name,
              photo: email,
              major: name,
              year: name,
              bio: name
            }
          }
        };
        fetch(
          `https://roads.googleapis.com/v1/nearestRoads?key=AIzaSyDpRfCNlC3iEZlflpSlhrUtxVBZODM1B4c&points=${
            values.exactGeoCode.lat
          },${values.exactGeoCode.lng}`
        )
          .then(res => res.json())
          .then(data => {
            console.log('data', data);
            values = {
              ...values,
              closestIntersectionGeoCode: {
                lat: data.snappedPoints[0].location.latitude,
                lng: data.snappedPoints[0].location.longitude
              }
            };
            // console.log(
            //   'exact address',
            //   `https://maps.google.com/maps?q=${values.exactGeoCode.lat},${
            //     values.exactGeoCode.lng
            //   }`
            // );
            // console.log(
            //   'near address',
            //   `https://maps.google.com/maps?q=${
            //     values.closestIntersectionGeoCode.lat
            //   },${values.closestIntersectionGeoCode.lng}`
            // );

            console.log('values', values);
            Meteor.call('sessions.saveNewSession', values);
            this.props.history.push('/sessions');
          })
          .catch(err => console.log(err));
      } else {
        this.setState({ error: 'No result found. Please verify your address' });
      }
    });
  };

  menuItems = provinces => {
    return provinces.map(province => (
      <MenuItem
        key={province.key}
        value={province.value}
        primaryText={province.primaryText}
      />
    ));
  };

  render() {
    const { handleSubmit } = this.props;
    const provinces = [
      { key: 1, primaryText: 'AB', value: 'Alberta' },
      { key: 2, primaryText: 'BC', value: 'British Columbia' },
      { key: 3, primaryText: 'MB', value: 'Manitoba' },
      { key: 4, primaryText: 'NB', value: 'New Brunswick' },
      { key: 5, primaryText: 'NL', value: 'NewFoundland and Labrador' },
      { key: 6, primaryText: 'NS', value: 'Nova Scotia' },
      { key: 7, primaryText: 'ON', value: 'Ontario' },
      { key: 8, primaryText: 'PE', value: 'Prince Edward Island' },
      { key: 9, primaryText: 'QC', value: 'Quebec' },
      { key: 10, primaryText: 'SK', value: 'Saskatchewan' },
      { key: 11, primaryText: 'YK', value: 'Yukon' }
    ];
    const basicInfo = [
      {
        className: 'Field',
        label: 'Title',
        name: 'title',
        type: 'text',
        component: this.renderInput
      },
      {
        className: 'Field',
        label: 'Course Code',
        name: 'courseCode',
        type: 'text',
        component: this.renderInput
      },
      {
        className: 'Field',
        label: 'Description',
        name: 'description',
        type: 'text',
        component: this.renderInput
      },
      {
        className: 'Field',
        label: 'Capacity',
        name: 'capacity',
        type: 'number',
        component: this.renderInput
      },
      {
        className: 'Field DatePicker',
        label: '',
        name: 'date',
        component: this.renderDatePicker
      },
      {
        className: 'Field TimePicker',
        label: '',
        name: 'time',
        component: this.renderTimePicker
      },
      {
        className: 'Field',
        label: 'Street Address',
        name: 'street',
        component: this.renderInput
      },
      {
        className: 'Field',
        label: 'City',
        name: 'city',
        component: this.renderInput
      },
      {
        className: 'Field',
        label: 'Province',
        name: 'province',
        component: this.renderSelectField
      },
      {
        className: 'Field',
        label: 'Postal Code',
        name: 'postalCode',
        component: this.renderInput
      }
    ];
    return (
      <div className="Create-Session-Container">
        <div className="Create-Session-Box">
          <h3> Create A Study Session </h3>
          <form
            className="Create-Session-Form"
            onSubmit={handleSubmit(this.onSubmit.bind(this))}
          >
            {basicInfo.map((item, i) => {
              return item.name !== 'province' ? (
                <Field
                  key={i}
                  className={item.className}
                  label={item.label}
                  name={item.name}
                  type={item.type}
                  component={item.component}
                />
              ) : (
                <Field
                  key={i}
                  className={item.className}
                  label={item.label}
                  name={item.name}
                  component={item.component}
                >
                  {this.menuItems(provinces)}
                </Field>
              );
            })}
            <p> {this.state.error} </p>
            <button type="submit" className="Sign-In-Submit">
              Submit
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
  courseCode = /^[a-zA-Z0-9 ]+$/;
  const address = `${values.street},${values.city},${values.province},${
    values.postalCode
  }`;
  if (!values.title) {
    errors.title = 'Please enter a title';
  }
  if (!values.courseCode) {
    errors.courseCode = 'Please enter a course code';
  }
  if (!courseCode.test(values.courseCode)) {
    errors.courseCode = 'Only letters and numbers';
  }
  if (!values.capacity) {
    errors.capacity = 'Please enter a number';
  }
  if (!values.date) {
    errors.date = 'Please choose a date';
  }
  if (!values.time) {
    errors.time = 'Please choose a time';
  }
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

export default (CreateSession = withTracker(() => {
  return {
    currentUser: Meteor.user(),
    currentId: Meteor.userId()
  };
})(
  reduxForm({
    validate: validate,
    form: 'createSessionForm'
  })(withRouter(CreateSession))
));
