import React, { useState } from 'react';
import './pdf-preview.scss';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { downloadFile } from '../../redux/actions/appActions';
// import file from '../../file.pdf';

const PdfPreview = ({ getFile }) => {
  const [canDownload, setDownload] = useState(false);
  const [href, setLink] = useState('');

  const handleFileDownload = () => {
    getFile('https://ebenkb.s3.us-east-2.amazonaws.com/kotage/e62b652c4b/rfx/1M-ebtiSy/MANAGEMENT+ACCOUNTING+(1).pdf')
      .then((response) => {
        console.log('This is the response ', response);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        setLink(url);
        setDownload(true);
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', 'file');
        // document.body.appendChild(link);
        // link.click();
      });
  };
  return (
	<div className="file-preview__wrapper">
		<div className="file-preview">
      file preview
		</div>
		<div className="preview-controls">
      controls here
			<Button
				onClick={handleFileDownload}
				content="Download file"
			/>
			{canDownload && (
				<div>
					<a href={href} download="file">
            Download file
					</a>
				</div>
			)}
		</div>
	</div>
  );
};

PdfPreview.propTypes = {
  getFile: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  getFile: downloadFile,
};

export default connect(null, mapDispatchToProps)(PdfPreview);
