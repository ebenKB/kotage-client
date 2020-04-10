/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Divider } from 'semantic-ui-react';

const RfpTitle = ({ proposal, classes }) => {
  const getContent = () => {
    if (classes !== null && classes !== '') {
      return (
	<div className={classes}>
		<div className="big-caption bold">{proposal && proposal.title}</div>
		<Divider type="thick" title="" classes="m-b-10" />
	</div>
      );
    }
    return (
	<div>
		<div className="big-caption bold">{proposal && proposal.title}</div>
		<Divider type="thick" title="" classes="m-b-10" />
	</div>
    );
  };

  return (
	<div>
		{ getContent() }
	</div>
  );
};
const mapStateToProps = (state) => ({
  proposal: state.rfp.currentProposal,
});

RfpTitle.propTypes = {
  proposal: PropTypes.object,
  classes: PropTypes.string,
};

RfpTitle.defaultProps = {
  classes: '',
  proposal: null,
};

export default connect(mapStateToProps, null)(RfpTitle);
