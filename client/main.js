import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from '../imports/ui/components/App/App';
import SignUp from '../imports/ui/containers/SignUp/SignUp';
import Profile from '../imports/ui/containers/Profile/Profile';
import CreateSession from '../imports/ui/components/CreateSession';
import Profile from '../imports/ui/components/Profile/Profile';
import SessionContainer from '../imports/ui/components/SessionFeed/SessionContainer.js';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import SignUp from '../imports/ui/components/SignUp/SignUp';

class Maydu extends Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider>
          <Switch>
            {/* <Layout> */}
            <Route
              exact
              path="/session-container"
              component={SessionContainer}
            />
            <Route path="/signup" component={SignUp} />
            <Route exact path="/" component={App} />
            <Route path="/createsession" component={CreateSession} />
            <Route path="/profile" component={Profile} />
            {/* </Layout> */}
          </Switch>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

Meteor.startup(() => {
  ReactDOM.render(<Maydu />, document.getElementById('root'));
});
