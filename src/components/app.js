import React from 'react';
import { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin'; 
injectTapEventPlugin(); // For Material-ui touch events

export default class App extends Component {
  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}
