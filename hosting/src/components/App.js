import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actionCreators from '../state/actionCreators';

import CameraButton from './CameraButton';
import Photo from './Photo';
import Annotations from './Annotations';

import './App.css';

class App extends Component {
  static propTypes = {
    image: PropTypes.instanceOf(Image),
  }

  render() {
    const { dispatch, image, annotations } = this.props;
    return (
      <div className="App">
        <CameraButton onChange={file => dispatch(actionCreators.receiveCameraFile(file))}/>
        {annotations ? <Annotations annotations={annotations}/> : null}
        {image ? <Photo image={image}/> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  image: state.image,
  annotations: state.annotations,
});

export default connect(mapStateToProps)(App);
