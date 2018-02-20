import React, { Component } from 'react';
import SignUp from '../SignUp/SignUp';
import './styles.css';

// const App = () => {
//   return <div className="hello">hello world</div>;
// };

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
