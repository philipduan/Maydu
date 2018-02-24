import React, { Component } from 'react';
import SignUp from '../../containers/SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import './styles.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <SignUp />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
