import React from 'react';
import { Form, Radio } from 'semantic-ui-react'
import MainContent from '../kt-main-content/mainContent';
import KtWrapper from '../kt-wrapper/kt-wrapper';
import Divider from '../kt-divider/divider';
import { ReactComponent as QuoteIcon } from '../../svg/quote.svg';
import { ReactComponent as ProposalIcon } from '../../svg/proposal.svg';
import { ReactComponent as InformationIcon } from '../../svg/information.svg';

import './rfx.scss';
import RfxItem from '../rfx-item/rfx-item';

const Rfx = () => {
  return (
    <MainContent
      classes="m-t-20"
    >
      <KtWrapper
        header="New RFX Event"
        canFilter={false}
        canPerform={true}
      >
        <Form>
          <Divider 
            type="thick" 
            title="Select RFX Type" 
            classes="m-t-10"
          />
          <div className="m-t-40 m-b-40 bold light-caption text-center">
            You can see the types of events you can create. Select the type you want and proceed
          </div>
          <ul className="rfx-content">
            <li className="wrapper">
              <RfxItem 
                title="Request for Quote">
                <QuoteIcon className="kt-rfx__icon"/>
              </RfxItem>
            </li>
            <li className="wrapper">
              <RfxItem 
                title="Request for Proposal"
              >
                <ProposalIcon className="kt-rfx__icon"/>
              </RfxItem>
            </li>
            <li className="wrapper">
              <RfxItem 
                title="Request for Information">
                <InformationIcon className="kt-rfx__icon"/>
              </RfxItem>
            </li>
          </ul>
          <Divider 
            type="thick" 
            title="Select Source" 
            classes="m-t-40 m-b-40"
          />
          <div className="form-group fluid kt-content__wrapper">
            <div className="bold">Source</div>
            <div className="flex-wrapper">
              <Form.Field className="custom radio">
                <Radio
                  label='Blank Event'
                  name='radioGroup'
                  value='Blank Event'
                />
              </Form.Field>
              <Form.Field className="custom radio">
                <Radio
                  label='Blank Event'
                  name='radioGroup'
                  value='Blank Event'
                />
              </Form.Field>
            </div>
          </div>
        </Form>
      </KtWrapper>
    </MainContent>
  )
}

export default Rfx;

