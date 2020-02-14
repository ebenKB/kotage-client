/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable constructor-super */
import React from 'react';
import { ValidatorForm } from 'react-form-validator-core';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import KtLogo from '../../../KtLogo/kt-logo';
import FormGroup from '../../../form-fields/form-group/form-group';
import { sendPasswordResetToken } from '../../../../redux/actions/userActions';

class resetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      password: '',
      password_confirmation: '',
    };
  }

  render() {
    const { initiatePassReset } = this.props;
    const { password, password_confirmation } = this.state;
    return (
	<div className="signin__wrapper">
		<div className="text-center m-b-20">
			<KtLogo
				classes="medium"
			/>
		</div>
		<div className="signin__content">
			<div className="signin__body ">
				<div className="bold text-center">
					<h2>Reset your password</h2>
				</div>
				<ValidatorForm
					ref={this.myRef}
				>
					<div className="m-t-18">
						<FormGroup
							type="text"
							placeholder="Enter new password"
							label="Enter new password"
							labelName="title"
							value={password}
							name="password"
							center
							inline={false}
							classes="fluid"
						/>
					</div>
					<div className="m-t-18">
						<FormGroup
							type="text"
							placeholder="Confirm your password"
							label="Confirm your password"
							labelName="title"
							value={password_confirmation}
							name="password"
							center
							inline={false}
							classes="fluid"
						/>
					</div>
					<div className="m-t-20">
						<Button
							type="submit"
							className="fluid green"
							onClick={initiatePassReset}
						>
              Save my new password
						</Button>
					</div>
				</ValidatorForm>
			</div>
		</div>
	</div>
    );
  }
}
const mapDispatchToProps = {
  initiatePassReset: sendPasswordResetToken,
};

export default connect(null, mapDispatchToProps)(resetPassword);
