import React, {useState} from 'react'
import ItemDetail from '../item-detail/item-detail';
import { ReactComponent as Logo } from '../../../svg/plus.svg';

import './item-detail-wrapper.scss';
import Collapsible from '../collapsible/collapsible';
import AddItem from '../add-item/add-item';
import  Dropzone from '../../form-fields/dropzone/dropzone';

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
    console.log('you want to add an item');
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
      <AddItem
        title="Add New Item"
        classes="m-t-20 m-b-10"
        handleClick={handleClick}
      /> 
      <div className="m-b-30">
        <Collapsible
          title={
            <div className="clickable  kt-primary bold sm-caption">
              <Logo className="kt-logo__small kt-primary"/>
              <span>Attach Documents</span>
            </div>
          }
        >
          <div className="kt-content__wrapper">
            <Dropzone/>
          </div>
        </Collapsible>
      </div>
    </div>
  )
}

export default ItemDetailsWrapper;

