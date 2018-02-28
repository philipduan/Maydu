import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
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
      error: '',
      address: '',
      addressForm: {}
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const input = document.getElementById('autocomplete');
      const options = {};
      if (
        typeof window.google !== 'undefined' &&
        typeof window.google.maps !== 'undefined'
      ) {
        console.log('i am here');
        const autocomplete = new window.google.maps.places.Autocomplete(
          input,
          options
        );
        autocomplete.addListener('place_changed', () => {
          const selectedPlace = autocomplete.getPlace();
          const componentForm = {
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            country: 'long_name',
            postal_code: 'short_name'
          };

          // Get each component of the address from the place details
          // and fill the corresponding field on the form.
          let selectedSuggest = {};
          for (let addressComponent of selectedPlace.address_components) {
            const addressType = addressComponent.types[0];
            if (componentForm[addressType]) {
              selectedSuggest[addressType] =
                addressComponent[componentForm[addressType]];
            }
          }
          // input.value = selectedPlace.name // Code injection risk (check doc)
          input.value = `${selectedSuggest.street_number} ${
            selectedSuggest.route
          }, ${selectedSuggest.locality}, ${
            selectedSuggest.administrative_area_level_1
          }, ${selectedSuggest.postal_code}`;
          this.setState({
            address: input.value,
            addressForm: selectedSuggest
          });
        });
      } else {
        console.error('Google API object is not defined');
      }
    }, 200);
  }

  renderInput = field => (
    <TextField
      autoComplete="off"
      className={field.className}
      hintText={field.label}
      type={field.type}
      fullWidth={true}
      errorText={field.meta.touched ? field.meta.error : null}
      {...field.input}
    />
  );

  renderDatePicker = field => {
    const today = new Date();
    return (
      <DatePicker
        hintText={moment().format('ddd MMM Do YYYY')}
        minDate={today}
        errorText={field.meta.touched && field.meta.error}
        onChange={(event, date) =>
          field.input.onChange(moment(date).format('ddd MMM Do YYYY'))
        }
        fullWidth={true}
      />
    );
  };

  renderTimePicker = field => {
    return (
      <TimePicker
        hintText="12:00 AM "
        minutesStep={5}
        errorText={field.meta.touched && field.meta.error}
        onChange={(event, time) =>
          field.input.onChange(moment(time).format('hh:mm A'))
        }
        fullWidth={true}
      />
    );
  };

  onSubmit = values => {
    const geocoder = new google.maps.Geocoder();
    this.state.error ? null : this.setState({ error: '' });
    geocoder.geocode({ address: this.state.address }, (results, status) => {
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
          address: this.state.address,
          addressForm: this.state.addressForm,
          attending: [this.props.currentUserId],
          pending: [],
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
        console.log(
          'exact address',
          `https://maps.google.com/maps?q=${values.exactGeoCode.lat},${
            values.exactGeoCode.lng
          }`
        );
        console.log('values', values);
        Meteor.call('sessions.saveNewSession', values);
        this.props.history.push('/sessions');
      } else {
        this.setState({
          error: 'No result found. Please verify your address'
        });
      }
    });
  };

  render() {
    const { handleSubmit } = this.props;
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
            <div className="inputWrapper  ">
              {basicInfo.map((item, i) => (
                <Field
                  key={i}
                  className={item.className}
                  label={item.label}
                  name={item.name}
                  type={item.type}
                  component={item.component}
                />
              ))}
              <TextField
                autoComplete="off"
                placeholder=""
                hintText={'Address'}
                className="Field"
                id="autocomplete"
                type="text"
                fullWidth={true}
              />
              <p> {this.state.error} </p>
              <button type="submit" className="Create-Session-Submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  courseCode = /^[a-zA-Z0-9 ]+$/;
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
  return errors;
}

export default (CreateSession = withTracker(() => {
  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId()
  };
})(
  reduxForm({
    validate: validate,
    form: 'createSessionForm'
  })(withRouter(CreateSession))
));
