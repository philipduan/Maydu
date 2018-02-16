import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import Layout from '../imports/ui/components/Layout';
import App from '../imports/ui/containers/App/index.js';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const Maydu = () => {
  <BrowserRouter>
    <Switch>
      <Layout>
      {/* Routes */}
      </Layout>
    </Switch>
  </BrowserRouter>;
};

Meteor.startup(() => {
  ReactDOM.render(<Maydu />, document.getElementById('root'));
});
