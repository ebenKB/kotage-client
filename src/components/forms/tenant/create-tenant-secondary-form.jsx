/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Form, Button, Checkbox,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Input from '../../form-fields/input/input';

class CreateTenantSecondaryForm extends React.Component {
  render() {
    const {
      consent, tenant, onChange, handleSubmit, setConsent,
    } = this.props;

    return (
	<div className="p-t-180">
		<div className="tenant small-form__wrapper fit-auto slideInLeft">
			<h3>Sign up for a free Kotage trial</h3>
			<div className="m-t-30">
				<Form>
					<div className="m-t-20 m-b-20">
						<Input
							type="text"
							placeholder="Email Address"
							className="fluid disabled"
							disabled
							name="email"
							value={tenant.email}
						/>
					</div>
					<div className="form-details">
						<div className="m-t-20 m-b-20">
							<Input
								type="text"
								placeholder="First Name"
								className="fluid"
								value={tenant.firstname}
								name="firstname"
								onChange={onChange}
								required
							/>
						</div>
						<div className="m-t-20 m-b-20">
							<Input
								type="text"
								placeholder="Last Name"
								className="fluid"
								name="lastname"
								value={tenant.lastname}
								onChange={onChange}
								required
							/>
						</div>
						<div className="m-t-20 m-b-20">
							<Input
								type="phone"
								placeholder="Phone Number"
								className="fluid"
								value={tenant.phone}
								name="phone"
								onChange={onChange}
								required
							/>
						</div>
						<div className="m-t-20 m-b-20">
							<Input
								type="text"
								placeholder="Compnay Name"
								className="fluid"
								value={tenant.company_name}
								name="company_name"
								onChange={onChange}
								required
							/>
						</div>
						<div className="m-t-20 m-b-20">
							<Input
								type="password"
								placeholder="Password"
								className="fluid"
								name="password"
								value={tenant.password}
								onChange={onChange}
								required
							/>
						</div>
					</div>
					<div className="m-b-20 sm-caption">
						<Checkbox
							label="I accept the Privacy Policy and Terms of Service"
							onChange={(e, data) => setConsent(data)}
						/>
					</div>
					<Button
						type="submit"
						disabled={!consent}
						color="green"
						fluid
						onClick={handleSubmit}
					>
            Signup
					</Button>
				</Form>
				<div className="m-t-10 sm-caption">
            Have an account?
					<Link to="/auth/signin"> Login now</Link>
				</div>
			</div>
		</div>
	</div>
    );
  }
}

export default CreateTenantSecondaryForm;
