/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
// import Axios from '../../utils/axios/axios';
import KtLoader from '../loader/loader';
import StakeholderItem from '../stakeholder-item/stakeholder-item';
import { getRfpStakeholder } from '../../redux/actions/rfpActions';


const StakeholderItemFetch = ({
  stakeholderObj, mode, getStakeholder, isFetchingRfpStakeholder,
}) => {
  const [stakeholder, setstakeholder] = useState();
  useEffect(() => {
    // fetch the stakeholder from here
    getStakeholder(stakeholderObj.user_id)
      .then((user) => {
        setstakeholder({
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
          access_level: stakeholderObj.access_level,
        });
      });
    // Axios.get(`/v1/${tenant_id}/users/${stakeholderObj.user_id}`)
    //   .then((data) => {
    //     const { user } = data.data;
    //     setstakeholder({
    //       id: user.id,
    //       firstname: user.firstname,
    //       lastname: user.lastname,
    //       email: user.email,
    //       phone: user.phone,
    //       access_level: stakeholderObj.access_level,
    //     });
    //   });
  }, [stakeholderObj.user_id]);
  return (
	<div>
		{isFetchingRfpStakeholder && (<div className="m-t-5 m-b-5"><KtLoader /></div>)}
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
  isFetchingRfpStakeholder: state.ui.isFetchingRfpStakeholder,
});

const mapDispatchToProps = {
  getStakeholder: getRfpStakeholder,
};

export default connect(mapStateToProps, mapDispatchToProps)(StakeholderItemFetch);
