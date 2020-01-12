import React from 'react';
import Divider from '../kt-divider/divider';

const MainContent = (props) => {
  const { help,classes } = props;
  return (
    <div className={`kt-main__content ${classes}`}>
      <div>
        {props.children}
      </div>
      <div>
        { help && help.map((h) => <div key={h.id}> 
            <Divider type='faint' title={h.title}/>
            <div className="m-t-20">{h.content}</div>
          </div> )
        }
      </div>
    </div>
  )
}

export default MainContent
