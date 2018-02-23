import React, { Component } from 'react';
import SearchBar from 'material-ui-search-bar';

export default class SessionFilter extends Component {
  constructor() {
    super();
    this.state = {
      allCourseCodes: [],
      value: ''
    };
  }

  render() {
    const stateValue = this.state.value.trim().toUpperCase();
    return (
      <SearchBar
        value={this.state.value}
        dataSource={this.props.allCourseCodes}
        onChange={value => this.setState({ value })}
        onRequestSearch={()=>this.props.handleFilter(stateValue)}
        style={{
          margin: '0 auto',
          maxWidth: 800
        }}
      />
    );
  }
}
