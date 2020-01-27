import React from 'react';
import { ReactComponent as Logo } from '../../../svg/bin.svg';
import './item-detail.scss';
import InputValidator from '../../form-fields/input-validator/input-validator';

const ItemDetail = ({item, deleteItem, handleChange,data_id, ...rest}) => {
  return (
    <div className="item-wrapper">
      <div className="item-wrapper__content">
        <>
          <InputValidator 
            type="text"  
            placeholder="Item SKU" 
            value={item.product_code}
            validators={['required', 'isEmail']}
            errorMessages={['this field is required', 'email is not valid']}
            instantValidate={true}
            name="product_code"
            onChange={handleChange}
            id={data_id}
            {...rest} 
          />
        </>
        <div>
          <InputValidator 
            type="text"  
            placeholder="How would you describe the item?" 
            value={item.description}
            onChange={handleChange}
            name="description"
            id={data_id}
            instantValidate={true}
            errorMessages={["Please leave a description"]}
            {...rest} 
          />
        </div>
        <div>
          <InputValidator
            type="number"  
            placeholder="Item SKU" 
            value={item.quantity}
            validators={['required', 'isNumber']}
            errorMessages={['this field is required', 'quantity is not valid']}
            instantValidate={true}
            name="quantity"
            onChange={handleChange}
            {...rest}
            id={data_id}
          />
        </div> 
      </div>
      <div>
        <div 
          className="cta clickable"
          onClick={() => deleteItem(item)}
        >
          <Logo className="kt-logo__small" />
        </div>
      </div>
    </div>
  )
}

export default ItemDetail
