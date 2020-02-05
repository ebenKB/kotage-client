import React from 'react'
import KtWrapper from '../../../kt-wrapper/kt-wrapper';
import { Label } from 'semantic-ui-react'
import FormGroup from '../../../form-fields/form-group/form-group';
import { ValidatorForm } from 'react-form-validator-core';


import '../user-invitation.scss';
import Divider from '../../../kt-divider/divider';
import KtTextArea from '../../../form-fields/kt-textarea/kt-textarea';


class UserInvitation extends React.Component{
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {
    return (
      <div className="user-invitation">
        <KtWrapper
          header="Invite New User"
          canFilter={false}
          canPerform={true}
          actionName="Send Invitation"
        >
          <p className="">
            The person you invite will receive an email with an invitation link. 
            When they click the link they can choose their own username and password. 
            Then they will be part of your account!
          </p>
          <ValidatorForm
            ref={this.myRef}
            onSubmit={() => console.log("submit")}
          >
          <div className="m-t-20 m-b-20">
            <span className="p-r-8">
              <Label circular className="kt-success">
                1
              </Label>
            </span>
            <span className="bold">Enter contact info for the person you want to invite</span>
          </div>
          <div className="m-t-30">
            <FormGroup
              type="text"
              placeholder="Enter title"
              label="First name"
              labelName="title"
              value=""
              name="title"
              center={true}
            />
          </div>
          <div className="m-t-30">
            <FormGroup
              type="text"
              placeholder="Enter title"
              label="Last name"
              labelName="title"
              value=""
              name="title"
              center={true}
            />
          </div>
          <div className="m-t-30">
            <FormGroup
              type="email"
              placeholder="Enter title"
              label="Email Address"
              labelName="title"
              value=""

              name="title"
              center={true}
            />
          </div>
          <div className="m-t-20 m-b-20">
            <span className="p-r-8">
              <Label circular className="kt-success">
                2
              </Label>
            </span>
            <span className="bold">Add a personal  message</span>
          </div>
            <div className="ui form m-t-20">
              <KtTextArea className="fluid"/>
					  </div>
          </ValidatorForm>
        </KtWrapper>
      </div>
    )
  }
}

export default UserInvitation;
