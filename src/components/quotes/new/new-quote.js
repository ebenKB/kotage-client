import React from 'react'
import MainContent from '../../kt-main-content/mainContent';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import Divider from '../../kt-divider/divider';
import FormGroup from '../../form-fields/form-group/form-group';
import DateTimeGroup from '../../form-fields/date-time-form-group/date-time-group';
import KtDocs from '../../form-fields/kt-docs-group/kt-docs';
import Stakeholders from '../../snippets/stakeholders-group/stakeholders';

const Newquote = () => {
  return (
    <MainContent
      classes="m-t-20"
    >
      <KtWrapper
        header="New Quote"
        canFilter={false}
        canPerform={true}
      >
      <Divider type="thick" title="Setup Your Event" classes="m-t-10"/>
      <div className="kt-content__wrapper">
        <div className="m-t-30">
          <FormGroup
            type="text" 
            placeholder="Enter title"
            label="Title"
            labelName="title"
            value="Request for NOC"
            center={true}
          />
        </div>
        <div className="m-t-30">
          <FormGroup
            type="kt-textarea" 
            placeholder="How would you describe the quote?"
            label="Description"
            labelName="decription"
          />
        </div>
        <div className="m-t-30">
          <FormGroup
            type="dropzone" 
            placeholder="Enter title"
            label="Attach Files"
            labelName="attachment"
          />
        </div>
        <div className="m-t-30">
          <FormGroup
            type="dropdown" 
            placeholder="Enter title"
            label="Event Type*"
            labelName="event_type"
            classes="small"
            center={true}
          />
        </div>
        <div className="m-t-30">
          <FormGroup
            type="amount" 
            placeholder="What is the budget?"
            label="Budget"
            labelName="budget"
            classes="small"
            center={true}
          />
        </div>
        <Divider type="thick" title="Timeline" classes="m-t-40"/>
        <div className="m-t-30">
          <DateTimeGroup
            placeholder="Date"
            label="Bid Deadline *"
            center={true}
          />
        </div>
        <div className="m-t-30">
          <DateTimeGroup
            placeholder="Date"
            label="RSVP Deadline"
            center={true}
          />
        </div>
        <div className="m-t-30">
          <DateTimeGroup
            placeholder="Date"
            label="Question Deadline"
            center={true}
          />
        </div>
        <Divider type="thick" title="Response Sheet" classes="m-t-40"/>
        <KtDocs/>
        <Divider type="thick" title="Invite Vendors" classes="m-t-40"/>
        <div>invite vendors here</div>
        <Divider type="thick" title="Invite Stakeholders" classes="m-t-40"/>
        <div>
          <Stakeholders />
        </div>
      </div>
      </KtWrapper>
    </MainContent>
  )
}

export default Newquote;
