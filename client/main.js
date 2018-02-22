import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import './main.html';
import App from '../imports/ui/components/App/App';
import CreateSession from '../imports/ui/components/CreateSession';
import Profile from '../imports/ui/components/Profile';
import SessionContainer from '../imports/ui/components/SessionFeed/SessionContainer.js';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

class Maydu extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* <Layout> */}
          <Route exact path="/" component={App} />
          <Route path="/createsession" component={CreateSession} />
          {/* </Layout> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

Meteor.startup(() => {
  ReactDOM.render(<Maydu />, document.getElementById('root'));
});
