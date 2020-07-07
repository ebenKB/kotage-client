import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { ValidatorForm } from 'react-form-validator-core';
import MainContent from '../../../components/kt-main-content/mainContent';
import KtWrapperLite from '../../../components/kt-wrapper-lite/kt-wrapper-lite';
import Help from '../../../utils/requisitions/new/help';
import Divider from '../../../components/kt-divider/divider';
import FormGroup from '../../../components/form-fields/form-group/form-group';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.myRef = React.createRef();
  }

  render() {
    return (
	<MainContent
		help={Help}
		classes="m-t-20"
	>
		<ValidatorForm
			ref={this.myRef}
			onSubmit={console.log('We want to save the updates')}
		>
			<div className="m-t-0 m-b-10">
				{/* <h3>Account ID: 989aee</h3> */}
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
						label="Phone"
						labelName="companyphone"
						inline={false}
						center
						value="+233548086391"
					/>
				</div>
				<div className="m-t-20 two-equal-grid">
					<FormGroup
						type="text"
						label="Country"
						labelName="country"
						inline={false}
						center
						value="Ghana"
					/>
					<FormGroup
						type="text"
						label="Timezone"
						labelName="timezone"
						inline={false}
						center
						value="UTC + 00"
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
		</ValidatorForm>
	</MainContent>
    );
  }
}


export default Settings;
