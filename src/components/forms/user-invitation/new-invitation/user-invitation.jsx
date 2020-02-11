import React from 'react'
import KtWrapper from '../../../kt-wrapper/kt-wrapper';
import { Label } from 'semantic-ui-react';
import FormGroup from '../../../form-fields/form-group/form-group';
import { ValidatorForm } from 'react-form-validator-core';
import '../user-invitation.scss';
import KtTextArea from '../../../form-fields/kt-textarea/kt-textarea';
import { connect } from 'react-redux';
import { inviteUser } from '../../../../redux/actions/userActions';
import MainContent from '../../../kt-main-content/mainContent';

class UserInvitation extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();

    this.state = {
      firstname:  '',
      lastname:  '',
      email:  '',
      message:  '',
    }
  }

  handleChange =(e) => {
    const { value, name } = e.target;
    this.setState((s) => ({
      ...s,
      [name]: value
    }));
  }

  handleSubmit = () => {
    this.props.inviteUser(this.state);
  }

  render() {
    const {firstname, lastname, email, message} = this.state;
    return (
      <MainContent
        classes="user-invitation"
      >
        <KtWrapper
          header="Invite New User"
          canFilter={false}
          canPerform={true}
          actionName="Send Invitation"
          handleAction ={this.handleSubmit}
        >
          <p className="">
            The person you invite will receive an email with an invitation link. 
            When they click the link they can choose their own username and password. 
            Then they will be part of your account!
          </p>
          <ValidatorForm
            ref={this.myRef}
            onSubmit={this.handleSubmit}
          >
          <div className="m-t-20 m-b-20">
            <span className="p-r-8">
              <Label size="big" circular className="kt-success">
                1
              </Label>
            </span>
            <span className="bold">Enter contact info for the person you want to invite</span>
          </div>
          <div className="p-l-30">
            <div className="m-t-30">
              <FormGroup
                type="text"
                placeholder="Enter title"
                label="First name"
                labelName="title"
                value={firstname}
                name="firstname"
                center={true}
                onChange={this.handleChange}
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
                onChange={this.handleChange}
              />
            </div>
            <div className="m-t-30">
              <FormGroup
                type="email"
                placeholder="Enter title"
                label="Email Address"
                labelName="title"
                value={email}
                onChange={this.handleChange}
                name="email"
                center={true}
              />
            </div>
          </div>
          <div className="m-t-20 m-b-20">
            <span className="p-r-8">
              <Label circular size="big" className="kt-success">
                2
              </Label>
            </span>
            <span className="bold">Add a personal message</span>
          </div>
            <div className="ui form m-t-20">
              <KtTextArea 
                className="fluid"
                value={message}
                name="message"
              />
					  </div>
          </ValidatorForm>
        </KtWrapper>
      </MainContent>
    )
  }
}

const mapDispatchToProps = {
 inviteUser
}

const mapStateToProps = (state) => ({
  loading: state.user.loading
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInvitation);
