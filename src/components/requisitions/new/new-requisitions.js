import React from 'react';
import MainContent from '../../kt-main-content/mainContent';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import Divider from '../../kt-divider/divider';

const Requisitions = () => {
  return (
    <MainContent>
      <KtWrapper
        header="New Requisition"
      >
      <Divider type="thick" title="Request Details"/>
        we can put content here
      </KtWrapper>
    </MainContent>
  )
}

export default Requisitions;
