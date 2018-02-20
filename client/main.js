import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import App from '../imports/ui/components/App/App.js';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// const Maydu = () => {
//   <BrowserRouter>
//     <Switch>
//       <Layout>
//         <Route path='/' component={Layout}/>
//       {/* Routes */}</Layout>
//     </Switch>
//   </BrowserRouter>;
// };

Meteor.startup(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
});
