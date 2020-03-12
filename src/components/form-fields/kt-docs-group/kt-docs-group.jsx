/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import { connect } from 'react-redux';
import { requestNewProposalDocument } from '../../../redux/actions/rfpActions';
import { ReactComponent as Logo } from '../../../svg/plus.svg';
import KtDoc from './kt-docs';

import './kt-docs.scss';

const KtDocs = ({ className, documents, requestNewDoc }) => {
  // const [document, setDocument] = useState({ name: '', description: '' });
  const handleClick = () => {

  };

  return (
	<div className={`docs-group m-t-30 ${className}`}>
		<div className="bold">Documents</div>
		<div className="docs-wrapper">
			<div className="docs-wrapper__header bold light-caption">
				<div className="">Name</div>
				<div className="">Description</div>
			</div>
			{documents && documents.map((doc) => (
				<KtDoc key={doc.id} doc={doc} />
			))}
			<div
				className="clickable m-t-20 kt-primary bold sm-caption flex-center"
				role="button"
				onClick={requestNewDoc}
				onKeyDown={handleClick}
			>
				<Logo className="kt-logo__small kt-primary" />
				<span>Request New Document</span>
			</div>
		</div>
	</div>
  );
};

const mapDispatchToProps = {
  requestNewDoc: requestNewProposalDocument,
};
export default connect(null, mapDispatchToProps)(KtDocs);
