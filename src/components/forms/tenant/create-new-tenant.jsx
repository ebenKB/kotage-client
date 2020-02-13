/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import Input from '../../form-fields/input/input';
import './create-new-tenant.scss';
import CreateTenantSecondaryForm from './create-tenant-secondary-form';
import { createTenant, validateDomain } from '../../../redux/actions/tenantActions';
import { isValidEmail } from '../../../utils/app/index';
import KtLogo from '../../KtLogo/kt-logo';

const CreateNewTenant = ({
  createTenant, validateDomain, loading, error, history,
}) => {
  const [isValidDomain, setValidDomain] = useState(false);
  const [hasConsented, setConsent] = useState(false);
  const [tenant, setTenant] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
    job_function: '',
    company_name: '',
    website_url: 'www.aspotica.com',
    country: '',
    timezone: '',
  });

  const setCountry = (country) => {
    setTenant((old) => ({
      ...old,
      country,
    }));
  };

  const setTimezone = (timezone) => {
    setTenant((old) => ({
      ...old,
      timezone,
    }));
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setTenant((old) => ({
      ...old,
      [name]: value,
    }));
  };

  const validateEmail = async () => {
    // check if the email is valid
    if (isValidEmail(tenant.email)) {
      try {
        const status = await validateDomain(tenant.email.split('@')[1]);
        if (!status) {
          setValidDomain(true);
        }
      } catch (err) {
        if (err.message.toLowerCase().trim() === 'network error') {
          alert('Please check your internet connection');
        } else if (err.response.status === 409) {
          alert('This company has already been provisioned');
        } else {
          alert('an error occured... make sure you have active internet connection');
        }
      }
    }
  };

  const handleSubmit = async () => {
    const newTenant = tenant;
    newTenant.password_confirmation = tenant.password;
    await setTenant(() => ({
      newTenant,
    }));
    try {
      const data = await createTenant(tenant);
      console.log('Done fetching ', data);
      history.push('/auth/signin');
    } catch (error) {
      console.log('an error occurred');
    }
  };

  return (
	<div>
		{!isValidDomain && (
			<div className="p-t-280 tenant-form__content">
				<div className="text-center m-b-20">
					<KtLogo
						classes="medium"
					/>
				</div>
				<div className="tenant small-form__wrapper fit-auto">
					<h4>Sign up for a free Kotage trial</h4>
					<div className="m-t-10">
						<span className="error">{error}</span>
					</div>
					<div className="m-t-30">
						<Form>
							<div className="m-t-20 m-b-20">
								<Input
									type="text"
									placeholder="Email Address"
									className="fluid"
									disabled={isValidDomain}
									loading={loading}
									value={tenant.email}
									onChange={handleChange}
									name="email"
									required
								/>
							</div>
							<div className="m-t-20 m-b-20">
								<Button
									className="tiny green"
									disabled={isValidDomain}
									onClick={validateEmail}
								>
                Next
								</Button>
							</div>
						</Form>
						<div className="m-t-10">
            Have an account?
							<Link to="/auth/signin"> Login now</Link>
						</div>
					</div>
				</div>
			</div>
		)}
		{isValidDomain && (
			<CreateTenantSecondaryForm
				tenant={tenant}
				consent={hasConsented}
				setConsent={(data) => setConsent(data.checked)}
				onChange={handleChange}
				setCountry={(country) => setCountry(country)}
				setTimezone={(timezone) => setTimezone(timezone)}
				handleSubmit={handleSubmit}
			/>
		)}
	</div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.tenant.loading,
  error: state.tenant.error,
});

const mapActionsToProps = {
  createTenant,
  validateDomain,
};

export default connect(mapStateToProps, mapActionsToProps)(withRouter(CreateNewTenant));
