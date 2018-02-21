import React, { Component } from 'react';
import SignUp from '../SignUp/SignUp';
import './styles.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
        <MuiThemeProvider>
          <SignUp />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
