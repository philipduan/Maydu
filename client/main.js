import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SignUp from '../imports/ui/containers/SignUp/SignUp';
import SignIn from '../imports/ui/containers/SignIn/SignIn';
import Profile from '../imports/ui/containers/Profile/Profile';
import CreateSession from '../imports/ui/containers/CreateSession';
import SessionContainer from '../imports/ui/containers/SessionFeed/SessionContainer.js';
import SessionExpand from '../imports/ui/containers/SessionFeed/SessionExpand.js';
import Layout from '../imports/ui/containers/Layout/Layout';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../imports/ui/redux/store.js';

class ensureLoggedIn extends Component {
  componentWillMount() {
    if (!Meteor.userId()) {
      //console.log("Not logged in")
      this.props.history.push('/');
    } else {
      //console.log("login")
    }
  }

  render() {
    return (
      <div>
        <Route exact path="/sessions" component={SessionContainer} />
        <Route path="/sessions/:id" component={SessionExpand} />
        <Route path="/createsession" component={CreateSession} />
        <Route path="/user/:id" component={Profile} />{' '}
      </div>
    );
  }
}

class Maydu extends Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider>
          <Provider store={store}>
            <Switch>
              <Layout>
                <Route exact path="/" component={SignIn} />
                <Route path="/signup" component={SignUp} />
                <Route component={ensureLoggedIn} />
              </Layout>
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
