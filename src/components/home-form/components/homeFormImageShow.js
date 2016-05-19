import React, { Component } from 'react';

export default class ImageShow extends Component {
  renderImageList() {
    return this.props.images.map((image) => {
      return (
        <li>
          <image height="100px" xlink:href={image} width="100px" />
        </li>
      )
    })
  }

  render() {
    if(!this.props.images){
      return(
        <div>Ei ladattuja kuvia</div>
      )
    }
      return(
        <div>
          <ul>
            {this.renderImageList()}
          </ul>
        </div>
      )
  }
}