import React, { Component } from 'react';
import SignUp from '../SignUp/SignUp';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './styles.css';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <SignUp />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
