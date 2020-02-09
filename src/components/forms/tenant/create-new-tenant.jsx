import React, {useState} from 'react';
import {Form, Button} from 'semantic-ui-react';
import Input from '../../form-fields/input/input';
import './create-new-tenant.scss';
import CreateTenantSecondaryForm from './create-tenant-secondary-form';
import { Link } from 'react-router-dom';

const CreateNewTenant = () => {
  // const [isValidDomain, setDomain] = useState(false);
  const [isValidDomain, setValidDomain] = useState(false);
  const [validating, setValidating] = useState(false);
  

  const validateEmail = () => {
    setValidating(true);
    setValidDomain(true);
  }
  return (
    <div>
    {!isValidDomain && (
      <div className="p-t-250">
          <div className="tenant small-form__wrapper fit-auto">
          <h3>Sign up for a free Kotage trial</h3>
          <div className="m-t-30">
            <Form>
              <div className="m-t-20 m-b-20">
                <Input
                  loading
                  type="text"
                  placeholder="Email Address"
                  className="fluid"
                  disabled={validating}
                  loading={validating}
                />
              </div>
              <div className="m-t-20 m-b-20">
                <Button
                  className="tiny green"
                  disabled={validating}
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
          <CreateTenantSecondaryForm />
        )}
    </div>
  )
}

export default CreateNewTenant;

