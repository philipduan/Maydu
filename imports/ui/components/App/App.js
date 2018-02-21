import React, { Component } from 'react';
import SignUp from '../SignUp/SignUp';
import './styles.css';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <SignUp />
      </div>
    );
  }
}

export default App;
