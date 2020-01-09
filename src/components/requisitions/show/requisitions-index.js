import React from 'react';
import './requisitions-index';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import RequisitionItem from '../../requisition-item/requisition-item';
import Divider from '../../kt-divider/divider';

const Requisitions = () => {
  return (
    <KtWrapper>
      <Divider title = "Pending" type="thick" display="success"/>
      <RequisitionItem />
      <Divider type="faint"/>
      <RequisitionItem />
      <Divider type="faint"/>
      <RequisitionItem />
      <Divider type="faint"/>
      <RequisitionItem />
      <Divider type="faint"/>
      <RequisitionItem />
      <Divider type="faint"/>
      <RequisitionItem />
      <Divider type="faint"/>
      <RequisitionItem />
      <Divider type="faint"/>
      <RequisitionItem />
      <Divider type="faint"/>
      <RequisitionItem />
      <Divider type="faint"/>
      <RequisitionItem />
      <Divider type="faint"/>
      <RequisitionItem />
      <Divider type="faint"/>
      <RequisitionItem />
      <Divider type="faint"/>
      <RequisitionItem />
      <Divider type="faint"/>
      <RequisitionItem />
      <Divider type="faint"/>
      <RequisitionItem />
      <Divider type="faint"/>
      <RequisitionItem />
      <Divider type="faint"/>
    </KtWrapper>
  )
};

export default Requisitions;
