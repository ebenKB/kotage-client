/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
// import { Label } from 'semantic-ui-react';
import { ValidatorForm } from 'react-form-validator-core';
import Axios from 'axios';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import MainContent from '../../../components/kt-main-content/mainContent';
import Help from '../../../utils/requisitions/new/help';
import Divider from '../../../components/kt-divider/divider';
import FormGroup from '../../../components/form-fields/form-group/form-group';
import KtWrapper from '../../../components/kt-wrapper/kt-wrapper';
import { updateExistingTenant } from '../../../redux/actions/tenantActions';
import { updateUserDetails } from '../../../redux/actions/userActions';

class Settings extends Component {
  constructor(props) {
    super(props);
    const { tenant, user } = this.props;
    this.state = {
      loading: true,
      countries: null,
      timezones: null,
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        email: user.email,
        job_function: user.job_function,
      },
      tenant: {
        ...tenant,
      },
    };
    this.myRef = React.createRef();
  }

  componentDidMount() {
    const countryPromise = Axios.get('https://restcountries.eu/rest/v2/region/africa?fields=name;timezones');
    countryPromise.then(({ data }) => {
      this.setState((state) => ({
        ...state,
        countries: data,
        loading: false,
      }));
    });
  }

  handleUserInputChange = (e, source) => {
    e.preventDefault();
    const { name, value } = e.target;
    const { user, tenant } = this.state;
    if (source === 'user') {
      user[name] = value;
    } else if (source === 'tenant') {
      tenant[name] = value;
    }
    this.setState((state) => ({ ...state, user, tenant }));
  };

  handleCountryChange = (country) => {
    this.setState((state) => ({ ...state, timezones: null }), () => {
      const { countries, tenant } = this.state;
      const selected = countries.find((c) => c.name === country);
      this.setState((state) => ({
        ...state,
        timezones: selected.timezones,
        tenant: {
          ...tenant,
          country,
          timezone: selected.timezones[0],
        },
      }));
    });
  }

  handleSubmit = () => {
    const { tenant, user } = this.state;
    const {
      updateTenant,
      updateUser,
      tenant: { id },
    } = this.props;
    updateTenant(id, tenant);
    // eslint-disable-next-line react/destructuring-assignment
    updateUser(this.props.user.id, id, user);
  }

  render() {
    const {
      isUpdatingAccount,
    } = this.props;
    const {
      countries, timezones, loading,
      user: {
        firstname, lastname, phone, email,
      },
      tenant,
    } = this.state;
    return (
	<MainContent
		help={Help}
		classes="m-t-20"
	>
		<KtWrapper
			canPerform
			actionName="Update"
			header="Settings"
			handleAction={this.handleSubmit}
			isLoadingSecondary={isUpdatingAccount}
		>
			<div className="m-b-20 dark text-right">
				<div className="xsm-caption dark">
					<span>KOTAGE NUMBER</span>
				</div>
				<div className="md-caption bold big-caption kt-primary">bddd53f1b4</div>
			</div>
			<ValidatorForm
				ref={this.myRef}
				onSubmit={this.handleSubmit}
			>
				<Divider type="thick" title="Account Settings" ishoverable />
				<div className="m-t-20 two-equal-grid">
					<FormGroup
						type="text"
						label="First Name"
						labelName="firstname"
						inline={false}
						center
						value={firstname}
						name="firstname"
						onChange={(e) => this.handleUserInputChange(e, 'user')}
					/>
					<FormGroup
						type="text"
						label="Last Name"
						labelName="lastname"
						inline={false}
						center
						value={lastname}
						name="lastname"
						onChange={(e) => this.handleUserInputChange(e, 'user')}
					/>
				</div>
				<div className="m-t-20 two-equal-grid">
					<FormGroup
						type="text"
						label="Phone"
						labelName="Phone"
						inline={false}
						center
						value={phone}
						name="phone"
						onChange={(e) => this.handleUserInputChange(e, 'user')}
					/>
					<FormGroup
						type="email"
						label="Email"
						labelName="email"
						inline={false}
						center
						value={email}
						name="email"
						disabled
					/>
				</div>
				<Divider type="thick" title="Company Settings" classes="m-t-40" ishoverable />
				<div className="m-t-20 two-equal-grid">
					<FormGroup
						type="text"
						label="Company Name"
						labelName="companyname"
						inline={false}
						center
						value={tenant.name}
						name="name"
						onChange={(e) => this.handleUserInputChange(e, 'tenant')}
					/>
					<FormGroup
						type="text"
						label="Company Email"
						labelName="companyemail"
						inline={false}
						center
						value={tenant.email}
						name="email"
						disabled
					/>
				</div>
				<div className="m-t-20 two-equal-grid">
					<FormGroup
						type="text"
						label="Company Phone"
						labelName="companyphone"
						inline={false}
						center
						value={tenant.phone}
						name="phone"
						onChange={(e) => this.handleUserInputChange(e, 'tenant')}
					/>
					{countries && (
						<FormGroup
							type="dropdown"
							label="Country"
							labelName="country"
							inline={false}
							center
							value={tenant.country}
							options={countries.map((d, id) => ({ text: d.name, value: d.name, key: id }))}
							classes="fluid"
							onChange={(data) => this.handleCountryChange(data)}
							defaultValue={tenant.country}
							loading={loading}
						/>
					)}
				</div>
				{tenant.timezone && !timezones && (
					<div className="m-t-20 two-equal-grid">
						<FormGroup
							type="text"
							label="Timezone"
							labelName="timezone"
							inline={false}
							center
							value={tenant.timezone}
							classes="fluid"
							disabled
						/>
					</div>
				)}
				{(timezones) && (
					<div className="m-t-20 two-equal-grid">
						<FormGroup
							type="dropdown"
							label="Timezone"
							labelName="timezone"
							inline={false}
							center
							value={tenant.timezone}
							classes="fluid"
							disabled
							options={timezones && timezones.map((t, id) => ({ text: t, value: t, key: id }))}
							defaultValue={tenant.timezone}
							onChange={() => console.log('The selection chnaged')}
						/>
					</div>
				)}
			</ValidatorForm>
		</KtWrapper>
	</MainContent>
    );
  }
}

const mapDispatchToProps = {
  updateTenant: updateExistingTenant,
  updateUser: updateUserDetails,
};

const mapStateToProps = (state) => ({
  tenant: state.tenant.currentTenant,
  user: state.user.currentUser,
  isUpdatingAccount: state.ui.buyer.isUpdatingAccount,
});

Settings.propTypes = {
  updateTenant: PropTypes.func.isRequired,
  tenant: PropTypes.object.isRequired,
  isUpdatingAccount: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
