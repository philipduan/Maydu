import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import SessionContainer from '../imports/ui/components/SessionFeed/SessionContainer.js';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// class Maydu extends Component {
//   render() {
//     return (
//       // <BrowserRouter>
//       //   <Switch>
//       //     <Layout>
//       //       {/* Routes */}
//       //     </Layout>
//       //   </Switch>
//       // </BrowserRouter>
//     );
//   }
// }

Meteor.startup(() => {
  ReactDOM.render(<SessionContainer />, document.getElementById('root'));
});
