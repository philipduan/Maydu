import React, { Component } from 'react';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import './styles.css';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <SignIn />
      </div>
    );
  }
}

export default App;
