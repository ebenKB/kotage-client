import React from 'react';
import {TextArea} from 'semantic-ui-react';

import './kt-textarea.scss';

const KtTextArea = ({placeholder}) => {
  return (
    <div className="kt-textarea__wrapper">
      <div className="text-wrapper__header"></div>
      <TextArea placeholder={placeholder} />
    </div>
  )
}

export default KtTextArea;
