import * as actionTypes from './actionTypes';

export function image(state = null, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_IMAGE:
      return action.image;
    default:
      return state;
  }
}

// const mockValue = [{"faceAnnotations":[],"landmarkAnnotations":[],"logoAnnotations":[],"labelAnnotations":[{"mid":"/m/06mf6","locale":"","description":"rabbit","score":0.9064353108406067,"confidence":0,"topicality":0,"boundingPoly":null,"locations":[],"properties":[]},{"mid":"/m/035qhg","locale":"","description":"fauna","score":0.8861044645309448,"confidence":0,"topicality":0,"boundingPoly":null,"locations":[],"properties":[]},{"mid":"/m/019dxh","locale":"","description":"rabits and hares","score":0.8820796608924866,"confidence":0,"topicality":0,"boundingPoly":null,"locations":[],"properties":[]},{"mid":"/m/06bs13","locale":"","description":"domestic rabbit","score":0.8166642189025879,"confidence":0,"topicality":0,"boundingPoly":null,"locations":[],"properties":[]},{"mid":"/m/0cx37","locale":"","description":"hare","score":0.5215479135513306,"confidence":0,"topicality":0,"boundingPoly":null,"locations":[],"properties":[]}],"textAnnotations":[],"fullTextAnnotation":null,"safeSearchAnnotation":{"adult":"VERY_UNLIKELY","spoof":"VERY_UNLIKELY","medical":"VERY_UNLIKELY","violence":"VERY_UNLIKELY"},"imagePropertiesAnnotation":null,"cropHintsAnnotation":null,"webDetection":null,"error":null}];
const mockValue = null;

export function annotations(state = mockValue, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_IMAGE:
      return null;
    case actionTypes.RECEIVE_ANNOTATION:
      return action.annotations;
    default:
      return state;
  }
}
