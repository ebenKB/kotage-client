import React, { Component } from 'react';
import { Label } from 'semantic-ui-react';
import { ValidatorForm } from 'react-form-validator-core';
import Axios from 'axios';
import MainContent from '../../../components/kt-main-content/mainContent';
import Help from '../../../utils/requisitions/new/help';
import Divider from '../../../components/kt-divider/divider';
import FormGroup from '../../../components/form-fields/form-group/form-group';
import KtWrapper from '../../../components/kt-wrapper/kt-wrapper';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      countries: null,
      timezones: null,
      user: {
        firstname: 'Alexander',
        lastname: 'Straight',
        phone: '02478736459',
        email: 'example@email.com',
      },
      company: {
        name: 'Broker and Sons Limited',
        email: 'email@example.com',
        phone: '898989898989',
        country: 'Ghana',
        timezone: 'UTC',
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

  handleInputChange = (e) => {
    e.preventDefault();
  };

  handleCountryChange = (country) => {
    this.setState((state) => ({ ...state, timezones: null }), () => {
      const { countries, company } = this.state;
      const selected = countries.find((c) => c.name === country);
      this.setState((state) => ({
        ...state,
        timezones: selected.timezones,
        company: {
          ...company,
          country,
          timezone: selected.timezones[0],
        },
      }));
    });
  }

  render() {
    const {
      countries, timezones, loading,
      user: {
        firstname, lastname, phone, email,
      },
      company,
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
		>
			<div className="m-b-20 dark text-right kt-primary">
				<span>Kotage Number&nbsp;</span>
				<Label size="large">
					<span className="md-caption bold">4545dfdf</span>
				</Label>
			</div>
			<ValidatorForm
				ref={this.myRef}
				onSubmit={console.log('We want to save the updates')}
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
					/>
					<FormGroup
						type="text"
						label="Last Name"
						labelName="firstname"
						inline={false}
						center
						value={lastname}
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
					/>
					<FormGroup
						type="email"
						label="Email"
						labelName="email"
						inline={false}
						center
						value={email}
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
						value={company.name}
					/>
					<FormGroup
						type="text"
						label="Company Email"
						labelName="companyemail"
						inline={false}
						center
						value={company.email}
					/>
				</div>
				<div className="m-t-20 two-equal-grid">
					<FormGroup
						type="text"
						label="Company Phone"
						labelName="companyphone"
						inline={false}
						center
						value={company.phone}
					/>
					{countries && (
						<FormGroup
							type="dropdown"
							label="Country"
							labelName="country"
							inline={false}
							center
							value={company.country}
							options={countries.map((d, id) => ({ text: d.name, value: d.name, key: id }))}
							classes="fluid"
							onChange={(data) => this.handleCountryChange(data)}
							defaultValue={company.country}
							loading={loading}
						/>
					)}
				</div>
				{company.timezone && !timezones && (
					<div className="m-t-20 two-equal-grid">
						<FormGroup
							type="text"
							label="Timezone"
							labelName="timezone"
							inline={false}
							center
							value={company.timezone}
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
							value={company.timezone}
							classes="fluid"
							disabled
							options={timezones && timezones.map((t, id) => ({ text: t, value: t, key: id }))}
							defaultValue={company.timezone}
							onChange={() => console.log('The selection chnaged')}
						/>
					</div>
				)}
			</ValidatorForm>
		</KtWrapper>
		{/* <ValidatorForm
			ref={this.myRef}
			onSubmit={console.log('We want to save the updates')}
		>
			<div className="m-t-0 m-b-10">
				<Divider type="thick" title="Kotage Number: bddd53f1b4" />
			</div>
			<KtWrapperLite>
				<Divider type="thick" title="Account Settings" />
				<div className="m-t-20 two-equal-grid">
					<FormGroup
						type="text"
						label="First Name"
						labelName="firstname"
						inline={false}
						center
						value="Alexander"
					/>
					<FormGroup
						type="text"
						label="Last Name"
						labelName="firstname"
						inline={false}
						center
						value="Straight"
					/>
				</div>
				<div className="m-t-20 two-equal-grid">
					<FormGroup
						type="text"
						label="Phone"
						labelName="Phone"
						inline={false}
						center
						value="+233548086391"
					/>
					<FormGroup
						type="email"
						label="Email"
						labelName="email"
						inline={false}
						center
						value="example@email.com"
						disabled
					/>
				</div>
			</KtWrapperLite>
			<KtWrapperLite
				classes="m-t-20"
			>
				<Divider type="thick" title="Company Settings" />
				<div className="m-t-20 two-equal-grid">
					<FormGroup
						type="text"
						label="Company Name"
						labelName="companyname"
						inline={false}
						center
						value="Apotica Company Ltd"
					/>
					<FormGroup
						type="text"
						label="Company Phone"
						labelName="companyphone"
						inline={false}
						center
						value="+233548086391"
					/>
				</div>
				<div className="m-t-20 two-equal-grid">
					<FormGroup
						type="dropdown"
						label="Country"
						labelName="country"
						inline={false}
						center
						value="Ghana"
						classes="fluid"
					/>
					<FormGroup
						type="dropdown"
						label="Timezone"
						labelName="timezone"
						inline={false}
						center
						value="UTC + 00"
						classes="fluid"
					/>
				</div>
			</KtWrapperLite>
			<div className="flex-center m-t-20">
				<Button
					basic
					size="small"
					content="Cancel"
				/>
				<Button
					positive
					size="small"
					content="Update"
				/>
			</div>
		</ValidatorForm> */}
	</MainContent>
    );
  }
}


export default Settings;
