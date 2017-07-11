import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CameraButton extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className="CameraButton">
        <button onClick={e => this.refs.camera.click()}/>
        <input ref="camera"
          type="file" accept="image/*" capture="camera"
          onChange={e => this.props.onChange(e.target.files[0])}/>
      </div>
    );
  }
}
