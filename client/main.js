import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import Layout from '../imports/ui/components/App/App';
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
  ReactDOM.render(<Layout />, document.getElementById('root'))
});
