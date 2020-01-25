import React, { Fragment } from 'react';
import { ReactComponent as Logo } from '../../../svg/bin.svg';
import './item-detail.scss';
import Input from '../../form-fields/input/input';

const ItemDetail = ({item, deleteItem, handleChange, data_id, ...rest}) => {
  return (
	<div className="item-wrapper">
		<div className="item-wrapper__content">
			<Fragment>
				<Input
            type="text"  
            placeholder="Item SKU" 
            value={item.product_code}
            name="product_code"
            onChange={handleChange}
            id={data_id}
            {...rest} 
          />
			</Fragment>
			<div>
				<Input
            type="text"  
            placeholder="How would you describe the item?" 
            value={item.description}
            onChange={handleChange}
            name="description"
            id={3}
            {...rest} 
          />
			</div>
			<div>
				<Input
            type="number"  
            placeholder="Item SKU" 
            value={item.quantity}
 
            name="quantity"
            onChange={handleChange}
            {...rest}
            id={10}
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
