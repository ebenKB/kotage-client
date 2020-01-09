import React from 'react';
import Divider from '../kt-divider/divider';

const MainContent = (props) => {
  const { help } = props;
  return (
    <div className="kt-main__content">
      <div>
        {props.children}
      </div>
      <div>
        {
          help.map((h) => <div> 
            <Divider type='faint' title={h.title}/>
            <div className="m-t-20">{h.content}</div>
          </div> )
        }
      </div>
    </div>
  )
}

export default MainContent
