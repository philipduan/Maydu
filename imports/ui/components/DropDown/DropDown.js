import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class DropDown extends Component {
  state = {
    value: null
  };

  handleChange = (event, index, value) => this.setState({ value });

  render() {
    let i = 0;
    const options = this.props.options.map(option => {
      i++;
      return (
        <MenuItem
          key={i}
          value={option.value}
          primaryText={option.displayName}
        />
      );
    });
    console.log(this.props.floatingLabelStyle);
    return (
      <div>
        <SelectField
          value={this.state.value}
          onChange={this.handleChange}
          floatingLabelText={this.props.floatingLabelText}
          hintText={this.props.hintText}
          floatingLabelStyle={this.props.floatingLabelStyle}
        >
          {options}
        </SelectField>
      </div>
    );
  }
}

export default DropDown;
