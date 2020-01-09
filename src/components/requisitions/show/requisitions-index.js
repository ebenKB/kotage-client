import React from 'react';
import './requisitions-index';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import RequisitionItem from '../../requisition-item/requisition-item';
import Divider from '../../kt-divider/divider';
import MainContent from '../../kt-main-content/mainContent';

const Requisitions = () => {
  const help = [
    {
      title: 'View Requisitions',
      content: 'This is the content of the help'
    }
  ]
  return (
    <MainContent help={help}>
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
      </KtWrapper>
    </MainContent>
  )
};

export default Requisitions;
