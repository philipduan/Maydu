import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import App from '../imports/ui/components/App/App';
import SessionContainer from '../imports/ui/components/SessionFeed/SessionContainer.js';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// class App extends Component {
//   render() {
//     return (
//       // <BrowserRouter>
//       //   <Switch>
//       //     <Layout>
//       //       <Route path="/Session" /> 
//       //     </Layout>
//       //   </Switch>
//       // </BrowserRouter>
//     );
//   }
// }

Meteor.startup(() => {
  ReactDOM.render(<App />, document.getElementById('root'))
});


