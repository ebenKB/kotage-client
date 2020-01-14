import React, {useState} from 'react'
import ItemDetail from '../item-detail/item-detail';
import { ReactComponent as Logo } from '../../../svg/plus.svg';

import './item-detail-wrapper.scss';

const ItemDetailsWrapper = () => {
  const [items, setItems] = useState([
    {
      key : new Date().getDate(),
      code : 'SKU000-1',
      description : 'React 16 ',
      qyt : '100'
    },
    {
      key : new Date().getDate(),
    }
  ]);

  const handleClick =() => {
    console.log('you clicked the item');
  }

  return (
    <div className="itd-wrapper">
      <div className="itd-wrapper__header bold m-b-12 bold light-caption">
        <div>Product Code</div>
        <div>Description</div>
        <div>Quantity</div>
      </div>
      <div className="item-details__wrapper">
        {
          items.map((item, idx) => 
            <ItemDetail key={ idx } item={item}/>
          )
        }
      </div> 
      <div className="clickable m-t-15 m-b-30 kt-primary bold sm-caption" onClick={handleClick}>
        <Logo className="kt-logo__small kt-primary"/>
        <span>Add New Item</span>
      </div>
    </div>
  )
}

export default ItemDetailsWrapper;

