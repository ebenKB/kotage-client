/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Input, Button } from 'semantic-ui-react';
import KtWrapper from '../kt-wrapper/kt-wrapper';
import MainContent from '../kt-main-content/mainContent';
import Help from '../../utils/requisitions/new/help';
import './invite-supplier.scss';
import { searchSupplier, addSupplier } from '../../redux/actions/tenantActions';


const InviteSupplier = ({
  findSupplier, currentUser, loading, addNewSupplier,
}) => {
  const [uid, setUID] = useState();
  const [supplier, setSupplier] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await findSupplier(currentUser.tenant_id, uid);
    setSupplier(data);
  };

  const handleAddSupplier = () => {
    addNewSupplier(currentUser.tenant_id, uid);
  };
  return (
	<div>
		<MainContent
			classes="m-t-20"
			help={Help}
		>
			<KtWrapper
				header="Invite Supplier"
				link="user/invitation"
				linkName=""
				isDiabled={false}
				isloading={false}
			>
				<div className="supplier md-container">
					<div className="m-t-10 m-b-20">
            Enter the Kotage number for the Supplier you want to invite
					</div>
					<Input
						action={{ content: `${loading ? '' : 'Search'}`, onClick: (e) => handleSubmit(e) }}
						type="text"
						fluid
						placeholder="Enter supplier Kotage number"
						value={uid}
						loading={loading}
						onChange={(e) => setUID(e.target.value)}
					/>
					{supplier && (
						<div>
							<div className="m-t-20 m-b-20">
								<div className="bold big-caption p-t-10 p-b-10">{supplier.company_name }</div>
								<div>{supplier.email}</div>
								<div>{supplier.phone}</div>
							</div>
							<div>
								<Button
									content="Add Supplier"
									onClick={handleAddSupplier}
									size="small"
									color="green"
								/>
							</div>
						</div>
					)}
				</div>
			</KtWrapper>
		</MainContent>
	</div>
  );
};

const mapDispatchToProps = {
  findSupplier: searchSupplier,
  addNewSupplier: addSupplier,
};
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  loading: state.tenant.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteSupplier);
