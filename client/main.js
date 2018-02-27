import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SignUp from '../imports/ui/containers/SignUp/SignUp';
import Profile from '../imports/ui/containers/Profile/Profile';
import CreateSession from '../imports/ui/containers/CreateSession';
import SessionContainer from '../imports/ui/containers/SessionFeed/SessionContainer.js';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../imports/ui/redux/store.js';
class Maydu extends Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider>
          <Provider store={store}>
            <Switch>
              {/* <Layout> */}
              <Route exact path="/sessions" component={SessionContainer} />

              <Route path="/signup" component={SignUp} />
              <Route path="/createsession" component={CreateSession} />
              <Route path="/profile" component={Profile} />
              {/* </Layout> */}
            </Switch>
          </Provider>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

Meteor.startup(() => {
  ReactDOM.render(<Maydu />, document.getElementById('root'));
});
