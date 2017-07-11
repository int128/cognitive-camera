import request from 'request-promise-native';

import { takeEvery, put } from 'redux-saga/effects';

import * as actionTypes from './actionTypes';
import * as actionCreators from './actionCreators';

function readFileAsync(file) {
  return new Promise(resolve => {
    const fileReader = new FileReader();
    const onLoad = e => {
      resolve(fileReader);
      fileReader.removeEventListener('load', onLoad);
    };
    fileReader.addEventListener('load', onLoad);
    fileReader.readAsDataURL(file);
  });
}

function readImageAsync(fileReader) {
  return new Promise(resolve => {
    const image = new Image();
    const onLoad = e => {
      resolve(image);
      image.removeEventListener('load', onLoad);
    };
    image.addEventListener('load', onLoad);
    image.src = fileReader.result;
  });
}

/**
 * @param {HTMLImageElement} image 
 */
function resizeImageAsDataURL(image) {
  const canvas = document.createElement('canvas');
  const landscape = image.width > image.height;
  if (landscape) {
    canvas.width = Math.min(image.width, 640);
    canvas.height = Math.floor(image.height * (canvas.width / image.width));
  } else {
    canvas.height = Math.min(image.height, 480);
    canvas.width = Math.floor(image.width * (canvas.height / image.height));
  }

  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  return canvas.toDataURL('image/jpeg');
}

function* annotateImage(content) {
  const { firebase } = window;
  yield firebase.auth().signInAnonymously();
  const idToken = yield firebase.auth().currentUser.getToken();
  const annotations = yield request({
    method: 'POST',
    uri: `https://${firebase.app().options.authDomain}/annotateImage`,
    headers: {Authorization: `Bearer ${idToken}`},
    body: {content},
    json: true,
  });
  return annotations;
}

function* receiveCameraFile({file}) {
  const fileReader = yield readFileAsync(file);
  const image = yield readImageAsync(fileReader);
  yield put(actionCreators.receiveImage(image));

  const imageDataURL = resizeImageAsDataURL(image);
  const content = imageDataURL.split(/,/)[1];
  const annotations = yield annotateImage(content);
  yield put(actionCreators.receiveAnnotations(annotations));
}

export default function* () {
  yield takeEvery(actionTypes.RECEIVE_CAMERA_FILE, receiveCameraFile);
}
