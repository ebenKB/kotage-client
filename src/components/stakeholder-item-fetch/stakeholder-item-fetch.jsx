/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Axios from '../../utils/axios/axios';
import StakeholderItem from '../stakeholder-item/stakeholder-item';


const StakeholderItemFetch = ({ stakeholderObj, tenant_id, mode }) => {
  const [stakeholder, setstakeholder] = useState();
  useEffect(() => {
    // fetch the stakeholder from here
    Axios.get(`/v1/${tenant_id}/users/${stakeholderObj.user_id}`)
      .then((data) => {
        const { user } = data.data;
        setstakeholder({
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
          access_level: stakeholderObj.access_level,
        });
      });
  }, [stakeholderObj.user_id]);
  return (
	<div>
		{stakeholder && (
			<StakeholderItem
				mode={mode}
				stakeholder={stakeholder}
			/>
		)}
	</div>
  );
};

StakeholderItemFetch.propTypes = {
  stakeholderObj: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  tenant_id: state.user.currentUser.tenant_id,
});

export default connect(mapStateToProps, null)(StakeholderItemFetch);
