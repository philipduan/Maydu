import React, { Component } from 'react';
import SearchBar from 'material-ui-search-bar';
import './style.css';

export default class SessionFilter extends Component {
  constructor() {
    super();
    this.state = {
      allCourseCodes: [],
      value: ''
    };
  }
  handleChange = () => {
    // When the user scrolls the page, execute myFunction
    window.onscroll = function() {
      myFunction();
    };

    // Get the header
    var header = document.getElementById('idSearchbar');

    // Get the offset position of the navbar
    var sticky = header.offsetTop;

    // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function myFunction() {
      if (window.pageYOffset >= sticky) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    }
  };

  render() {
    const stateValue = this.state.value;
    console.log(this.props.allCourseCodes);
    return (
      <SearchBar
        id="idSearchbar"
        className="SearchBar"
        value={this.state.value}
        dataSource={this.props.allCourseCodes}
        onChange={value => {
          this.handleChange;
          this.setState({
            value: value.trim().toUpperCase()
          });
        }}
        onRequestSearch={() => this.props.handleFilter(stateValue)}
        style={{
          zIndex: '9999',
        //   margin: '0 auto 5rem',
          maxWidth: 800,
          width: '100vw'
        }}
      />
    );
  }
}
