import React, { useState } from 'react';
import useCollapse from 'react-collapsed';
import {Icon} from 'semantic-ui-react';
import './collapsible.scss';
import Divider from '../../kt-divider/divider';

const Collapsible = (props) => {
  const [isOpen, setOpen] = useState(false);
  const {getCollapseProps, getToggleProps} = useCollapse({isOpen});

  const getContent = () => {
    if(isOpen) {
      return (
        <div className="collapse-header">
          <Icon name='angle down'/>
          <Divider type="thick" title="Documents - Request documents from vendor" classes="m-t-10"/>
        </div>
      )
    } else {
      return (
        <div className="collapse-header">
          <Icon name='angle up'/> 
          <Divider type="thick" title="Documents - Request documents from vendor" classes="m-t-10"/>
        </div>
      )
    }
  }
  return (
    <>
      <button
        className="collapsibe-btn"
        {...getToggleProps({
          onClick: () => setOpen(oldOpen => !oldOpen),
        })}
      >
        {getContent()}
      </button>
      <section {...getCollapseProps()}>
        {props.children}
      </section>
    </>
  )
}

export default Collapsible;
