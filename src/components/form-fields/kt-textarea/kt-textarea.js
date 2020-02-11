import React from 'react';
import {TextArea} from 'semantic-ui-react';

import './kt-textarea.scss';

const KtTextArea = ({placeholder,hasHeader=false, ...otherProps}) => {
  return (
    <div className="kt-textarea__wrapper">
      <TextArea {...otherProps} />
    </div>
  )
}

export default KtTextArea;
