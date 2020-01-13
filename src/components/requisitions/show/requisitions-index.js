import React from 'react';
import './requisitions-index';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import RequisitionItem from '../../requisition-item/requisition-item';
import Divider from '../../kt-divider/divider';
import MainContent from '../../kt-main-content/mainContent';

const Requisitions = () => {
  const help = [
    {
      id: 1,
      title: 'View Requisitions',
      content: 'This is the content of the help'
    }
  ]
  return (
    <MainContent 
      help={help}
      classes="m-t-20"
    >
      <KtWrapper
        header="Requisitions"
        link="requisitions/new"
        linkName="New Requisitions"
        canFilter={true}
      >
        <Divider title = "Pending" type="thick" classes=""/>
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

        <Divider title = "Approved" type="thick" display="kt-success m-t-40 m-b-20"/>
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

        <Divider title = "Rejected" type="thick" classes="kt-danger m-t-40 m-b-20"/>
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
