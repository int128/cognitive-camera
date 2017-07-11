import * as actionTypes from './actionTypes';

export function receiveCameraFile(file) {
  return {type: actionTypes.RECEIVE_CAMERA_FILE, file};
}

export function receiveImage(image) {
  return {type: actionTypes.RECEIVE_IMAGE, image};
}

export function receiveAnnotations(annotations) {
  return {type: actionTypes.RECEIVE_ANNOTATION, annotations};
}
