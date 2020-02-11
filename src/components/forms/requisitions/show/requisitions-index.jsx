/* eslint-disable import/no-self-import */
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import './requisitions-index';
import KtWrapper from '../../../kt-wrapper/kt-wrapper';
import RequisitionItem from '../../../requisition-item/requisition-item';
import Divider from '../../../kt-divider/divider';
import MainContent from '../../../kt-main-content/mainContent';
import { getRequisitions } from '../../../../redux/actions/requisitionActions';
import help from '../../../../utils/requisitions/index/help';

const Requisitions = ({requisitionState: { requisitions, loading }, getRequisitions}) => {
  useEffect(() => {
    getRequisitions();
  }, []);

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
      {
        loading && <div>loading the records</div>
      }
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

        <Divider title = "Approved" type="thick" classes="kt-success m-t-40 m-b-20"/>
        <RequisitionItem 
          type='success'
        />
        <Divider type="faint"/>
        <RequisitionItem 
          type='success'
        />
        <Divider type="faint"/>
        <RequisitionItem 
          type='success'
        />
        <Divider type="faint"/>
        <RequisitionItem 
          type='success'
        />
        <Divider type="faint"/>
        <RequisitionItem 
          type='success'
        />
        <Divider type="faint"/>

        <Divider title = "Rejected" type="thick" classes="kt-danger m-t-40 m-b-20"/>
        <RequisitionItem 
          type='danger'
        />
        <Divider type="faint"/>
        <RequisitionItem 
          type='danger'
        />
        <Divider type="faint"/>
        <RequisitionItem 
          type='danger'
        />
        <Divider type="faint"/>
        <RequisitionItem 
          type='danger'
        />
        <Divider type="faint"/>
        <RequisitionItem 
          type='danger'
        />
        <Divider type="faint"/>
      </KtWrapper>
    </MainContent>
  )
};

const mapSateToProps = (state) => ({
  requisitionState: state.requisitions
});

export default connect(mapSateToProps, { getRequisitions })(Requisitions);
