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
  handleScroll = () => {
    // Get the header
    let header = document.getElementById('idSearchbar');

    // Get the offset position of the navbar
    let sticky = header.offsetTop;

    // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position

    if (window.pageYOffset >= sticky) {
      header.classList.add('sticky');
    } else {
      console.log('else');
      header.classList.remove('sticky');
    }
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  render() {
    const stateValue = this.state.value;
    console.log(this.props.allCourseCodes);
    return (
      <div id="idSearchbar" className="SearchBar">
        <SearchBar
          value={this.state.value}
          dataSource={this.props.allCourseCodes}
          onChange={value => {
            this.handleChange;
            this.setState({
              value: value.trim().toUpperCase()
            });
          }}
          onScroll={console.log('works')}
          onRequestSearch={() => this.props.handleFilter(stateValue)}
          style={{
            zIndex: '9999',
            //   margin: '0 auto 5rem',
            maxWidth: 800,
            width: '100vw'
          }}
        />
      </div>
    );
  }
}
