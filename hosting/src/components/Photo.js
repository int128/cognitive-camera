import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Photo extends Component {
  static propTypes = {
    image: PropTypes.instanceOf(Image).isRequired,
  }

  render() {
    return (
      <div className="Photo">
        <img src={this.props.image.src} alt="Camera"/>
      </div>
    );
  }
}
