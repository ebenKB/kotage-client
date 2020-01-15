import React from 'react';
import './requisition-item.scss';
import { ReactComponent as Logo } from '../../svg/cart.svg';

const RequisitionItem = ({item, type}) => {
  return (
    <div className="kt-req__item">
      <div className="icon-caption">
        <Logo/>
      </div>
      <div className="kt-req__item-content">
        <div>
          <span className="bold big-caption kt-primary">Cisco Meraki AP</span> by <span className="bold">John Smith</span>
        </div>
        <div>
          <span className={`bold kt-${type}`}>$900,864</span> 
        </div>
        <div>
          <span> Delivered at </span> <span className="bold"> ACME HQ, Accra</span> by <span className="bold">23 May, 2018</span>
        </div>
      </div>
    </div>
  )
}

export default RequisitionItem;
