/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Label } from 'semantic-ui-react';
import { ValidatorForm } from 'react-form-validator-core';
import { connect } from 'react-redux';
import KtWrapper from '../../../kt-wrapper/kt-wrapper';
import KtTextArea from '../../../form-fields/textarea/textarea';
import FormGroup from '../../../form-fields/form-group/form-group';
import '../user-invitation.scss';
import { inviteUser } from '../../../../redux/actions/userActions';
import MainContent from '../../../kt-main-content/mainContent';
import Help from '../../../../utils/requisitions/new/help';
import { isValidEmail } from '../../../../utils/app';


class UserInvitation extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();

    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      message: '',
      is_admin: false,
    };
  }

  handleChange =(e) => {
    const { value, name } = e.target;
    this.setState((s) => ({
      ...s,
      [name]: value,
    }));
  }

  setMessage = (message) => {
    this.setState((state) => ({
      ...state,
      message,
    }));
  }

  handleSubmit = () => {
    // check if the fields are valid
    const { firstname, lastname, email } = this.state;
    if (firstname.length > 0 && lastname.length > 0 && isValidEmail(email)) {
      this.props.inviteUser(this.state);
    }
  }

  setMessage = (message) => {
    this.setState((oldState) => ({
      ...oldState,
      message,
    }));
  }

  render() {
    const {
      firstname, lastname, email,
    } = this.state;
    const { loading } = this.props;
    return (
	<MainContent
		classes="user-invitation m-t-20"
		help={Help}
	>
		<KtWrapper
			help={Help}
			header="Invite New User"
			canFilter={false}
			cancelUrl="/users"
			canPerform
			actionName="Send Invitation"
			handleAction={this.handleSubmit}
			isLoading={loading}
			isDisabled={false}
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
					<span className="bold kt-black">Enter contact info for the person you want to invite</span>
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
							center
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
							center
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
							center
						/>
					</div>
				</div>
				<div className="m-t-20 m-b-20">
					<span className="p-r-8">
						<Label circular size="big" className="kt-success">
              2
						</Label>
					</span>
					<span className="bold kt-black">Add a personal message</span>
				</div>
				<div className="ui form m-t-20">
					<KtTextArea
						className="fluid"
						placeholder="Enter a message for this user"
						name="message"
						onChange={(data) => { this.setMessage(data); }}
					/>
				</div>
			</ValidatorForm>
		</KtWrapper>
	</MainContent>
    );
  }
}

const mapDispatchToProps = {
  inviteUser,
};

const mapStateToProps = (state) => ({
  loading: state.user.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInvitation);
