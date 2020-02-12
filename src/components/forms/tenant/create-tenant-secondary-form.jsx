/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import {
  Form, Button, Checkbox,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Input from '../../form-fields/input/input';
import { getCountries } from '../../../redux/actions/countryActions';


class CreateTenantSecondaryForm extends React.Component {
  componentDidMount() {
    const { countries, findCountries } = this.props;

    if (countries.length === 0) {
      // fetching the countries
      findCountries();
    }
  }

  render() {
    const {
      consent, tenant, onChange, handleSubmit,
    } = this.props;

    // const handleChange = (data) => {
    //   setCountry(data.value);
    //   // get the timezone that matches the selected country
    //   const country = countries.find((c) => c.value === data);
    //   const newTimezones = country.timezones.map((t) => ({
    //     text: t,
    //     value: t,
    //   }));
    //   this.setState((oldState) => ({
    //     ...oldState,
    //     timezones: newTimezones,
    //   }));
    // };

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
								type="password"
								placeholder="Password"
								className="fluid"
								name="password"
								value={tenant.password}
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
					</div>
					<div className="m-b-20 sm-caption">
						<Checkbox label="I accept the Privacy Policy and Terms of Service" />
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

const mapStateToProps = (state) => ({
  countries: state.countries.countries,
});

const mapDispatchToProps = {
  findCountries: getCountries,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTenantSecondaryForm);
