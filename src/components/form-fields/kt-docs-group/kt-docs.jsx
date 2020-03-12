/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import { connect } from 'react-redux';
import { requestNewProposalDocument } from '../../../redux/actions/rfpActions';
import Input from '../input/input';
import DeleteButton from '../../buttons/delete-button';
import './kt-docs.scss';

const KtDocs = ({ doc }) => {
  // const [document, setDocument] = useState({ name: '', description: '' });
  const handleTextChange = (e) => {
    e.preventDefault();
    // const { value, name } = e.target;
    // setDocument((doc) => ({
    //   ...doc,
    //   [name]: value,
    // }));
  };

  return (
	<div className="docs-wrapper__content m-t-20">
		<div>
			<Input
				type="text"
				placeholder="Document name"
				value={doc.name}
				name="title"
				onChange={handleTextChange}
			/>
		</div>
		<div>
			<Input
				type="text"
				placeholder="Document Description"
				classes="fluid"
				value={doc.description}
				name="description"
				onChange={handleTextChange}
			/>
		</div>
		<div>
			<DeleteButton type="icon" />
		</div>
	</div>
  );
};

const mapDispatchToProps = {
  requestNewDoc: requestNewProposalDocument,
};
export default connect(null, mapDispatchToProps)(KtDocs);
