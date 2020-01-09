import React from 'react';
import './requisition-item.scss';
import { ReactComponent as Logo } from '../../svg/cart.svg';

const RequisitionItem = () => {
  return (
    <div className="kt-req__item">
      <div className="icon-caption">
        <Logo/>
      </div>
      <div>
        this the a requisition item
      </div>
    </div>
  )
}

export default RequisitionItem;
