import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import SignUp from '../imports/ui/containers/SignUp/SignUp';
import Profile from '../imports/ui/containers/Profile/Profile';
import CreateSession from '../imports/ui/components/CreateSession';
import SessionContainer from '../imports/ui/components/SessionFeed/SessionContainer.js';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

class Maydu extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
 
          <Route path="/signup" component={SignUp} />
       
        </Switch>
      </BrowserRouter>
    );
  }
}

Meteor.startup(() => {
  ReactDOM.render(<Maydu />, document.getElementById('root'));
});
