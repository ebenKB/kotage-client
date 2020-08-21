/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable object-curly-newline */
/* eslint-disable padded-blocks */
/* eslint-disable camelcase */
import React from 'react';
import ItemDetail from '../item-detail/item-detail';
import { ReactComponent as Logo } from '../../../svg/plus.svg';
import './item-detail-wrapper.scss';
import Collapsible from '../collapsible/collapsible';
import AddItem from '../add-item/add-item';
import Dropzone from '../../dropzone/dropzone';

// eslint-disable-next-line react/prop-types
const ItemDetailsWrapper = ({ item_details, handleAction, handleChange, deleteItem }) => {
  return (
	<div className="itd-wrapper">
		<div className="itd-wrapper__header bold m-b-12 bold light-caption">
			<div>Product Code</div>
			<div>Description</div>
			<div>Quantity</div>
		</div>
		<div className="item-details__wrapper">
			{item_details.map((item, idx) => (
				<ItemDetail
					key={idx}
					item={item}
					deleteItem={deleteItem}
					handleChange={handleChange}
					data_id={idx}
				/>
			))}
		</div>
		<AddItem
			title="Add New Item"
			classes="m-t-20 m-b-10"
			handleClick={handleAction}
		/>
		<div className="m-b-30">
			<Collapsible
				title={(
					<div className="clickable  kt-primary bold sm-caption">
						<Logo className="kt-logo__small kt-primary" />
						<span>Attach Documents</span>
					</div>
				)}
			>
				<div className="kt-content__wrapper">
					<Dropzone />
				</div>
			</Collapsible>
		</div>
	</div>
  );
};

export default ItemDetailsWrapper;
