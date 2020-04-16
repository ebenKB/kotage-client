import React, { useState, useEffect } from 'react';
import './pdf-preview.scss';
import { PropTypes } from 'prop-types';
import Jszip from 'jszip';
import { saveAs } from 'file-saver';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { downloadFile } from '../../redux/actions/appActions';


// import file from '../../file.pdf';

const PdfPreview = ({ getFile }) => {
  // const [canDownload, setDownload] = useState(false);
  const [href, setLink] = useState('');
  const [isFileReady, prepareFile] = useState(false);
  const [fileData, setData] = useState(null);

  const getFileName = (url) => {
    const data = url.split('/');
    console.log(data[data.length - 1]);
  };

  const downloadZip = () => {
    const zip = new Jszip();
    const zipFolder = zip.folder('rfpFiles');
    zipFolder.file('rfp-1', new Blob([fileData]), { base64: true });
    zip.generateAsync({ type: 'blob' })
      .then((data) => saveAs(data));
  };

  const getFileSize = (bytes) => {
    let newSize = null;
    let postFix = 'kb';
    if (bytes < 1000000) {
      newSize = (bytes / 1000);
    } else {
      newSize = bytes / 1000000;
      postFix = 'mb';
    }
    return `${newSize.toFixed(2)}${postFix}`;
  };

  useEffect(() => {
    if (!isFileReady) {
      getFile('https://ebenkb.s3.us-east-2.amazonaws.com/kotage/e62b652c4b/rfx/1M-ebtiSy/MANAGEMENT+ACCOUNTING+(1).pdf')
        .then((response) => {
          console.log('This is the response ', response);
          setData(response.data);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          setLink(url);
          prepareFile(true);
          getFileName('https://ebenkb.s3.us-east-2.amazonaws.com/kotage/e62b652c4b/rfx/1M-ebtiSy/MANAGEMENT+ACCOUNTING+(1).pdf');
        });
    }
  }, [isFileReady]);

  // const prepareDownload = () => {
  //   getFile('https://ebenkb.s3.us-east-2.amazonaws.com/kotage/e62b652c4b/rfx/1M-ebtiSy/MANAGEMENT+ACCOUNTING+(1).pdf')
  //     .then((response) => {
  //       console.log('This is the response ', response);
  //       const url = window.URL.createObjectURL(new Blob([response.data]));
  //       setLink(url);
  //       setDownload(true);
  //       // const link = document.createElement('a');
  //       // link.href = url;
  //       // link.setAttribute('download', 'file');
  //       // document.body.appendChild(link);
  //       // link.click();
  //     });
  // };

  return (
	<div className="file-preview__wrapper">
		<div className="file-preview">
      file preview
			<Button onClick={downloadZip} content="Download zip" />
		</div>
		<div className="preview-controls">
			{isFileReady && (
				<div>
					<a href={href} download="file" className="ui green button">
            Download file
            &nbsp;
						{getFileSize(fileData.size)}
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
