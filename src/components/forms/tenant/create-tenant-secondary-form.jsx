import React from 'react';
import {Form, Button, Dropdown, Checkbox} from 'semantic-ui-react';
import Input from '../../form-fields/input/input';
import { Link } from 'react-router-dom';

const createTenantSecondaryForm = ({consent}) => {
  return (
    <div className="p-t-130">
      <div className="tenant small-form__wrapper fit-auto slideInLeft">
        <h3>Sign up for a free Kotage trial</h3>
        <div className="m-t-30">
          <Form>
            <div className="m-t-20 m-b-20">
              <Input
                type="text"
                placeholder="Email Address"
                className="fluid"
                disabled
              />
            </div>
            <div className="form-details">
              <div className="m-t-20 m-b-20">
                <Input
                  type="text"
                  placeholder="First Name"
                  className="fluid"
                />
              </div>
              <div className="m-t-20 m-b-20">
              <Input
                type="text"
                placeholder="Last Name"
                className="fluid"
              />
            </div>
            <div className="m-t-20 m-b-20">
              <Input
                type="password"
                placeholder="Password"
                className="fluid"
              />
            </div>
            <div className="m-t-20 m-b-20">
              <Input
                type="phone"
                placeholder="Phone Number"
                className="fluid"
              />
            </div>
            <div className="m-t-20 m-b-20">
              <Input
                type="text"
                placeholder="Company Name"
                className="fluid"
              />
            </div>
            <div className="m-t-20 m-b-20">
              <Input
                type="text"
                placeholder="Job Function"
                className="fluid"
              />
            </div>
            <div className="m-t-20 m-b-20">
              <Dropdown fluid placeholder='Country' search selection />
            </div>
            </div>
            <div className="m-b-20 sm-caption">
              <Checkbox label='I accept the Privacy Policy and Terms of Service' />
            </div>
            <Button disabled={!consent} color="green" fluid>Signup</Button>
          </Form>
          <div className="m-t-10">
            Have an account? 
            <Link to="/auth/signin"> Login now</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default createTenantSecondaryForm
