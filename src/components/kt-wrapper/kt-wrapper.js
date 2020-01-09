import React from 'react';
import './kt-wrapper.scss';

const KtWrapper = (props) => {
  return (
    <div className="kt-wrapper">
      <div className="kt-wrapper__header bold">
        <h2>Requisitions</h2>
        <div className="green ui button">actions</div>
      </div>
      <div className="kt-wrapper__content">
        {props.children}
      </div>
    </div>
  )
}
export default KtWrapper;
