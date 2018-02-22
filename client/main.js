import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from '../imports/ui/components/App/App';
import CreateSession from '../imports/ui/components/CreateSession';
import Profile from '../imports/ui/components/Profile';
import SessionContainer from '../imports/ui/components/SessionFeed/SessionContainer.js';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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

            <Route exact path="/" component={App} />
            <Route path="/createsession" component={CreateSession} />
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
