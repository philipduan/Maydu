import React, { Component } from 'react';
import CreateSessionFields from './CreateSessionFields';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import './styles.css';

class CreateSession extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      courseCode: '',
      capacity: '',
      date: '',
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

  //Checking DB if the user and password match - if no user exists or their password is inncorect, throw an error
  handleSignInSubmit = event => {
    event.preventDefault();

    Meteor.loginWithPassword(this.state.email, this.state.password, err => {
      this.setState({ error: `${err.reason}, please try again!` });
    });
    Meteor.loggingIn();
  };

  render() {
    const today = new Date();
    return (
      <div className="Create-Session-Container">
        <div className="Create-Session-Box">
          <h3> Create A Study Session </h3>
          <form onSubmit={this.handleSignInSubmit}>
            <CreateSessionFields
              name="title"
              inputOnChange={this.handleInputChange}
              type="text"
              placeholder="Title"
              className=""
            />
            <CreateSessionFields
              name="courseCode"
              inputOnChange={this.handleInputChange}
              type="text"
              placeholder="Course Code"
              className=""
            />
            <CreateSessionFields
              name="capacity"
              inputOnChange={this.handleInputChange}
              type="number"
              placeholder="Capacity"
              className=""
            />
            <DatePicker
              className="DatePicker"
              hintText={moment().format('YYYY MM DD')}
              minDate={today}
              onChange={this.handleDatePicker}
            />

            <TimePicker
              className="TimePicker"
              hintText="12:00 AM"
              minutesStep={5}
              onChange={(event, x) => {
                console.log(moment(x).format('hh:mm A'));
              }}
            />

            <p> {this.state.error} </p>
            <button type="submit" className="Sign-In-Submit">
              {' '}
              Sign In{' '}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateSession;
