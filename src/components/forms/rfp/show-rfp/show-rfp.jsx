/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
// import { Button } from 'semantic-ui-react';
// import { CircularProgressbar } from 'react-circular-progressbar';
import { getCurrentProposal } from '../../../../redux/actions/rfpActions';
import Divider from '../../../kt-divider/divider';
import 'react-circular-progressbar/dist/styles.css';
import './show-rfp.scss';
import MainContent from '../../../kt-main-content/mainContent';
import Help from '../../../../utils/requisitions/new/help';
// import KtWrapperLite from '../../../kt-wrapper-lite/kt-wrapper-lite';
// import StakeholderGroup from '../../../stakeholder-group/stakeholder-group';
// import QuestionListGroup from '../../../question-list-group/question-list-group';
// import DocumentListGroup from '../../../document-list-group/document-list-group';
// import { ReactComponent as MessageIcon } from '../../../../svg/mail.svg';
// import AttachmentListGroup from '../../../attachment-list-group/attachment-list-group';
import KtWrapper from '../../../kt-wrapper/kt-wrapper';
import SupplierDirectorySection from '../../../supplier-directory-section/supplier-directory-section';

const ShowRfp = ({ match, getProposal, proposal }) => {
  const { params } = match;
  const { id } = params;
  useEffect(() => {
    getProposal(id);
  }, [id]);

  // eslint-disable-next-line react/no-danger
  const getDescription = () => (<div dangerouslySetInnerHTML={{ __html: proposal.description }} />
  );
  const getTitle = () => <div className="very-big-caption">{proposal.title}</div>;

  return (
	<MainContent
		help={Help}
	>
		<div className="m-t-20 m-b-20">
			{getTitle()}
			<Divider type="thick" title="" classes="p-b-10 p-t-4" />
		</div>
		<KtWrapper
			header=""
			canPerform
			isLite
			actionName="Edit Proposal"
			canFilter={false}
			canPublish={false}
			cancelUrl="/rfx"
			handleAction={console.log('')}
		>
			{/* <KtWrapperLite> */}
			<div>
				{proposal && (
					<div>
						<Divider type="faint" title="RFP DETAILS" classes="" isNumbered number="1" />
						<div className="m-t-20 m-b-20 kt-bg-shadow kt-text-caption__wrapper">
							{getDescription()}
						</div>
						<div className="m-t-40">
							<Divider type="faint" title="EVENT TIMELINE" classes="" isNumbered number="2" />
						</div>
						<div className="m-t-40">
							<Divider type="faint" title="INVITED SUPPLIERS" classes="" isNumbered number="3" />
							<SupplierDirectorySection
								proposal={proposal}
								deleteSupplier={() => console.log('we can delete the supplier')}
								addSupplier={(suppliers) => console.log('We want to add the suppliers', suppliers)}
								type="fetch"
							/>
						</div>
						<div className="m-t-40">
							<Divider type="faint" title="REQUESTED DOCUMENTS" classes="" isNumbered number="4" />
						</div>
						<div className="m-t-40">
							<Divider type="faint" title="STAKEHOLDERS" classes="" isNumbered number="5" />
						</div>

						{/* <section className="m-t-40">
							<div>
								<Divider type="thick" title="STAKEHOLDERS" classes="" />
								{proposal.stakeholders && (
									<div className="kt-opaque">
										<StakeholderGroup
											shouldFetchData
											stakeholders={proposal.stakeholders}
											mode="readonly"
											classes="m-b-10"
										/>
									</div>
								)}
							</div>
						</section> */}


						{/* <section className="m-t-40">
							<AttachmentListGroup
								files={proposal.files}
							/>
						</section> */}


						{/* <section className="m-t-40">
							<QuestionListGroup
								questions={proposal.questions}
							/>
						</section> */}


						{/* <section className="m-t-40">
							<DocumentListGroup
								documents={proposal.documents}
							/>
						</section> */}
					</div>
				)}
				{/* <section className="m-t-40">
					<Link to={`/rfx/proposal/${params.id}/edit`}>
						<Button content="Edit proposal" className="green" />
					</Link>
				</section> */}
			</div>
			{/* </KtWrapperLite> */}
		</KtWrapper>
	</MainContent>
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
