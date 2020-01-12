import React from 'react';
import Input from '../../form-fields/input/input';
import { ReactComponent as Logo } from '../../../svg/bin.svg';

import './item-detail.scss';

const ItemDetail = ({item}) => {
  return (
    <div className="item-wrapper">
      <div className="item-wrapper__content">
      <div>
        <Input placeholder="SKU-009-34"/>
      </div>
      <div>
        <Input placeholder="React router"/>
      </div>
      <div>
        <Input placeholder="34"/>
      </div> 
      </div>
      <div>
        <div className="cta clickable">
          <Logo className="kt-logo__small" />
        </div>
      </div>
    </div>
  )
}

export default ItemDetail
