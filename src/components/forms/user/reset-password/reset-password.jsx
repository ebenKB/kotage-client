/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable constructor-super */
import React from 'react';
import { ValidatorForm } from 'react-form-validator-core';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import KtLogo from '../../../KtLogo/kt-logo';
import FormGroup from '../../../form-fields/form-group/form-group';
import { resetUserPassword } from '../../../../redux/actions/userActions';


class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();

    this.state = {
      password: '',
      password_confirmation: '',
    };
  }

  componentDidMount() {
    const { match, location } = this.props;
    const { params } = match;
    const { search } = location;

    this.setState((oldState) => ({
      ...oldState,
      token: params.token,
      tenant_id: search.split('=')[1],
    }));
  }

  handleSubmit = async () => {
    const {
      token, password, password_confirmation, tenant_id,
    } = this.state;
    const { resetPass, history } = this.props;
    if (password === password_confirmation) {
      await resetPass(password, password_confirmation, token, tenant_id);
      history.push('/auth/signin');
    }
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState((s) => ({
      ...s,
      [name]: value,
    }));
  }

  render() {
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
					onSubmit={this.handleSubmit}
				>
					<div className="m-t-18">
						<FormGroup
							type="password"
							placeholder="Enter new password"
							label="Enter new password"
							labelName="title"
							value={password}
							name="password"
							center
							inline={false}
							classes="fluid"
							onChange={this.handleChange}
						/>
					</div>
					<div className="m-t-18">
						<FormGroup
							type="password"
							placeholder="Confirm your password"
							label="Confirm your password"
							labelName="title"
							value={password_confirmation}
							name="password_confirmation"
							center
							inline={false}
							classes="fluid"
							onChange={this.handleChange}
						/>
					</div>
					<div className="m-t-20">
						<Button
							type="submit"
							className="fluid green"
							onClick={this.handleSubmit}
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
  resetPass: resetUserPassword,
};

export default connect(null, mapDispatchToProps)(withRouter(ResetPassword));
