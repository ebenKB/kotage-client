/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProposal } from '../../../../redux/actions/rfpActions';
import Divider from '../../../kt-divider/divider';

const ShowRfp = ({ match, getProposal, proposal }) => {
  const { params } = match;
  const { id } = params;
  useEffect(() => {
    getProposal(id);
  }, [id]);
  return (
	<div>
		{proposal && (
			<div style={{ width: '60%' }}>
				<h1>{proposal.title}</h1>
				<p className="bold" dangerouslySetInnerHTML={{ __html: proposal.description }} />
				<div>
					<Divider type="thick" title="Timeline" classes="m-t-10 m-b-10" />
					<div className="sm-caption">
						<div>
              Bid Deadline :
							{proposal.bid_deadline}
						</div>
						<div>
              RSVP Deadline :
							{proposal.bid_deadline}
						</div>
						<div>
              Question Deadline :
							{proposal.bid_deadline}
						</div>
						<div>
							<Divider type="thick" title="Currency" classes="m-t-10 m-b-10" />
							All prices should be presented in
							{' '}
							{proposal.currency.name}
							{' '}
							{proposal.currency.symbol}
						</div>
						<div>
							<Divider type="thick" title="Suppliers" classes="m-t-10 m-b-10" />
							{proposal.proposal_suppliers && proposal.proposal_suppliers.map((s) => (
								<div>
									<div>
										{' '}
										{s.id}
									</div>
									<div>{s.supplier_id}</div>
								</div>
							))}
						</div>
						<div>
							<Divider type="thick" title="Stakeholders" classes="m-t-10 m-b-10" />
							{proposal.proposal_stakeholders && proposal.proposal_stakeholders.map((s) => (
								<div>
									<div>{s.id}</div>
									<div>{s.user_id}</div>
									<div>{s.access_level}</div>
								</div>
							))}
						</div>
						<div>
							<Divider type="thick" title="Attachments" classes="m-t-10 m-b-10" />
							<div>
								{proposal.proposal_response_sheet
                  && proposal.proposal_response_sheet.proposal_document_requests
                  && proposal.proposal_response_sheet.proposal_document_requests.map((s) => (
	<div>
		<div>
      Name:
			{s.document_name}
		</div>
		<div>
      Description:
			{s.description}
		</div>
	</div>
                  ))}
							</div>
						</div>
						<div>
							<Divider type="thick" title="Questions" classes="m-t-10 m-b-10" />
							<div>
								{proposal.proposal_response_sheet
                  && proposal.proposal_response_sheet.proposal_questions
                  && proposal.proposal_response_sheet.proposal_questions
                    .map((s) => (<div>{s.id}</div>))}
							</div>
						</div>
					</div>
				</div>
			</div>
		)}
		<Link to={`/rfx/proposal/${params.id}/edit`}>
      Edit this proposal
		</Link>
	</div>
  );
};

ShowRfp.propTypes = {
  match: PropTypes.object.isRequired,
  getProposal: PropTypes.func.isRequired,
  proposal: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  getProposal: getCurrentProposal,
};

const mapStateToProps = (state) => ({
  proposal: state.rfp.currentProposal,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShowRfp));
