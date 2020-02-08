import React from 'react';
import { Label } from 'semantic-ui-react'
import FormGroup from '../../form-fields/form-group/form-group';
import { ValidatorForm } from 'react-form-validator-core';
import KtTextArea from '../../form-fields/kt-textarea/kt-textarea';

const User = ({firstname, lastname, email, message, ...rest}) => {
  return (
          <ValidatorForm
            ref={rest.myRef}
            onSubmit={rest.handleSubmit}
          >
          <div className="m-t-20 m-b-20">
            <span className="p-r-8">
              <Label circular className="kt-success">
                1
              </Label>
            </span>
            <span className="bold">{rest.message_1}</span>
          </div>
          <div className="m-t-30">
            <FormGroup
              type="text"
              placeholder="Enter title"
              label="First name"
              labelName="title"
              value={firstname}
              name="firstname"
              center={true}
              onChange={rest.onChange}
            />
          </div>
          <div className="m-t-30">
            <FormGroup
              type="text"
              placeholder="Enter title"
              label="Last name"
              labelName="title"
              value={lastname}
              name="lastname"
              center={true}
              onChange={rest.onChange}
            />
          </div>
          <div className="m-t-30">
            <FormGroup
              type="email"
              placeholder="Enter title"
              label="Email Address"
              labelName="title"
              value={email}
              name="email"
              center={true}
              onChange={rest.onChange}
            />
          </div>
          <div className="m-t-20 m-b-20">
            <span className="p-r-8">
              <Label circular className="kt-success">
                2
              </Label>
            </span>
            <span className="bold">{rest.message_2}</span>
          </div>
            <div className="ui form m-t-20">
              <KtTextArea 
                className="fluid"
                value={message}
                name="message"
              />
					  </div>
          </ValidatorForm>
  )
}

export default User
