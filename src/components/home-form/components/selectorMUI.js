import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';

export default class SelectorMUI extends Component{
  onChange(evt, index, value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }
  render() {
    return (
      <SelectField {...this.props} onChange={this.onChange.bind(this)}>
        {this.props.children}
      </SelectField>
    );
  }
}