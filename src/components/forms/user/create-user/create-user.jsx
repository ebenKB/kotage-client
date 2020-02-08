import React from 'react'
import KtWrapper from '../../../kt-wrapper/kt-wrapper';
import { connect } from 'react-redux';
import { getInvitation} from '../../../../redux/actions/userActions';
import FormGroup from '../../../form-fields/form-group/form-group';
import { ValidatorForm } from 'react-form-validator-core';
import { withRouter } from "react-router";
import {Button} from 'semantic-ui-react';
import './create-user.scss';
import { Link } from 'react-router-dom';
import {createUser} from '../../../../redux/actions/userActions';

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    
    this.state = {
      password:  '',
      password_confirmation: '',
      access_token: '',
      token: '',
    }
  }

  componentDidMount() {
    const {token} = this.props.match.params;
    this.props.getInvitation(token);
    this.setState((oldState)=> ({
        ...oldState,
        token:token,
      }
    ));

    const search = this.props.location.search;
    const access_token = search.split("=")[1];
    this.setState((oldSate) => ({
      ...oldSate,
      access_token: access_token,
    }));
  }

  handleChange =(e) => {
    const { value, name } = e.target;
    this.setState((s) => ({
      ...s,
      [name]: value
    }));
  }

  handleSubmit = () => {
    // check if the password
    if(this.state.password === this.state.password_confirmation) {
      // create the data
      this.props.createUser({
        firstname: this.props.invitation.firstname,
        lastname:this.props.invitation.lastname,
        email:this.props.invitation.email,
        password:this.state.password,
        password_confirmation:this.state.password_confirmation
      }, this.state.token, this.state.access_token)
    }
  }

  render() {
    console.log('This is the props', this.props.location.search)
    const {invitation} = this.props;
    const {password, password_confirmation} = this.state;
    return (
      <>
        {invitation && (
          <div className="p-t-150 ">
        <p className="text-center"> Used Kotage before? 
          <Link to="/auth/signin"> Login</Link>
        </p>
      <div className="user small-form__wrapper fit-auto">
        <div className="kt-header caption bold text-center big-caption m-t-10 m-b-30">
          <span>Join</span>
          <span className="big"> Apotica</span>
          <span> on highrise</span>
        </div>
      <ValidatorForm
          ref={this.myRef}
          onSubmit={this.handleSubmit}
          >
          <div className="m-t-18">
            <FormGroup
              type="text"
              placeholder="Enter title"
              label="First name"
              labelName="title"
              value={invitation.firstname}
              name="firstname"
              center={true}
              onChange={this.handleChange}
              disabled={true}
              inline={false}
              classes="fluid"
            />
          </div>
          <div className="m-t-18">
            <FormGroup
              type="text"
              placeholder="Enter title"
              label="Last name"
              labelName="title"
              value={invitation.lastname}
              name="lastname"
              center={true}
              onChange={this.handleChange}
              disabled={true}
              inline={false}
              classes="fluid"
            />
          </div>
          <div className="m-t-18">
            <FormGroup
              type="email"
              placeholder="Enter Email"
              label="Email Address"
              labelName="Title"
              value={invitation.email}
              name="email"
              center={true}
              onChange={this.handleChange}
              disabled={true}
              inline={false}
              classes="fluid"
            />
          </div>
          <div className="m-t-18">
            <FormGroup
              type="password"
              placeholder="Enter password"
              label="Password"
              labelName="password"
              value={password}
              name="password"
              center={true}
              onChange={this.handleChange}
              inline={false}
              classes="fluid"
            />
          </div>
          <div className="m-t-18">
            <FormGroup
              type="password"
              placeholder="Enter password"
              label="Password Confirmation"
              labelName="password"
              value={password_confirmation}
              name="password_confirmation"
              center={true}
              onChange={this.handleChange}
              inline={false}
              classes="fluid"
            />
          </div>
            <div className="m-t-20">
              <Button 
                type="submit"
                className="fluid green"
                loading={this.props.loading}
              > OK, Let's go </Button>
            </div>
          </ValidatorForm>
      </div>
      </div>
        )}
      </>
    )
  }
}

const mapDispatchToProps = {
 getInvitation,
 createUser
}

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  invitation: state.user.invitation
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateUser));
