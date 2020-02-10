import React, {useState} from 'react';
import {Form, Button} from 'semantic-ui-react';
import Input from '../../form-fields/input/input';
import './create-new-tenant.scss';
import CreateTenantSecondaryForm from './create-tenant-secondary-form';
import { Link } from 'react-router-dom';
import { createTenant, validateDomain } from '../../../redux/actions/tenantActions';
import { connect } from 'react-redux';
import { isValidEmail } from '../../../utils/app/index';

const CreateNewTenant = ({createTenant, validateDomain, loading, error}) => {
  // const [isValidDomain, setDomain] = useState(false);
  const [isValidDomain, setValidDomain] = useState(false);
  const [hasConsented, setHasConsented] = useState(true);
  const [tenant, setTenant] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: '1111',
    phone: '',
    role: '',
    company_name: '',
    "website_url": 'www.aspotica.com',
    country: '',
  })
  
  const setCountry = (country) => {
    console.log('This is the country', country)
    setTenant((old) => ({
      ...old,
      country: country
    }));
  }

  const handleChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    
    setTenant((old) => ({
      ...old,
      [name]: value,
    }));
  }

  const validateEmail = async() => {
    // check if the email is valid
    if(isValidEmail(tenant.email)) {
      try {
        const status = await validateDomain(tenant.email.split('@')[1]);
        if(!status) {
          setValidDomain(true);
          console.log('The domain does not exist...')
        } else{
          console.log('The domain is EXISTING...')
        }
      } catch (error) {
        console.log('an error occured whle trying to get the data', error);
      }
    }
  }

  const handleSubmit = () => {
    if(tenant.password === tenant.password_confirmation) {
      createTenant(tenant);
    }
  }

  return (
    <div>
    {!isValidDomain && (
      <div className="p-t-280">
          <div className="tenant small-form__wrapper fit-auto">
          <h3>Sign up for a free Kotage trial</h3>
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
                />
              </div>
              <div className="m-t-20 m-b-20">
                <Button
                  className="tiny green"
                  disabled={isValidDomain}
                  onClick={validateEmail}
                >Next</Button>
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
          onChange={handleChange}
          setCountry={(country) => setCountry(country)}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  loading: state.tenant.loading,
  error: state.tenant.error
});

const mapActionsToProps =  {
  createTenant,
  validateDomain,
}

export default connect(mapStateToProps, mapActionsToProps)(CreateNewTenant);
