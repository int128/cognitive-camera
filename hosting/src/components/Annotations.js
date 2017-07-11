import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Seq } from 'immutable';

export default class Annotations extends Component {
  static propTypes = {
    annotations: PropTypes.array.isRequired,
  }

  render() {
    const { annotations } = this.props;
    return (
      <div className="Annotations">
        {annotations.map((annotation, index) => (
          <span key={index}>
            {Seq(annotation.labelAnnotations).map(label => (
              <div key={label.mid} className="Annotation" style={{
                fontSize: (Math.round(48 * label.score))
              }}>
                {Math.round(100 * label.score)}% {label.description}
              </div>
            )).toArray()}

            {Seq(annotation.safeSearchAnnotation).map((value, key) => (
              <div key={key} className="Annotation">
                {value.replace(/_/, ' ').toLocaleLowerCase()} {key}
              </div>
            )).toArray()}
          </span>
        ))}
      </div>
    );
  }
}
