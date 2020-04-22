import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import './pdf-preview.scss';
// import Jszip from 'jszip';
// import { saveAs } from 'file-saver';
import { Button } from 'semantic-ui-react';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
// import { ReactComponent as DownloadIcon } from '../../svg/download.svg';
import DownloadIcon from '@material-ui/icons/GetApp';
import { prepareFileForDownload } from '../../utils/app/file';

const PdfPreview = ({ handleCloseAction }) => {
  const [isFileReady, hasPreparedFile] = useState(false);
  const [fileObject, setFileObject] = useState(null);

  // const downloadZip = () => {
  //   const zip = new Jszip();
  //   const zipFolder = zip.folder('rfpFiles');
  //   zipFolder.file('rfp-1', new Blob([fileObject.data]), { base64: true });
  //   zip.generateAsync({ type: 'blob' })
  //     .then((data) => saveAs(data));
  // };

  useEffect(() => {
    if (!isFileReady) {
      prepareFileForDownload('https://ebenkb.s3.us-east-2.amazonaws.com/kotage/e62b652c4b/rfx/1M-ebtiSy/MANAGEMENT+ACCOUNTING+(1).pdf')
        .then((data) => {
          hasPreparedFile(true);
          setFileObject(data);
        });
    }
  }, [isFileReady]);

  return (
	<div className="file-preview__wrapper">
		<div className="file-preview__backdrop" />
		<div className="file-preview__content">
			<div className="file-preview-header">
				<div className="text-right flex-center">
					{isFileReady && fileObject && (
						<a
							href={fileObject.staticUrl}
							download={fileObject.fileName}
							className="kt-transparent flex-center float-r m-r-20"
						>
							<DownloadIcon className="medium logo dark auto-height" />
						</a>
					)}
					<Button
						default
						size="tiny"
						icon={<CancelOutlinedIcon className="big logo dark" />}
						className="kt-transparent flex-center"
						content=""
						onClick={handleCloseAction}
					/>
				</div>
			</div>
			<div className="file-preview-content__body">
				<div className="file-preview">
          file preview
				</div>
				<div className="preview-controls kt-bg-shadow">
					{isFileReady && fileObject && (
						<div className="text-right m-r-40">
							{/* <a
								href={fileObject.staticUrl}
								download={fileObject.fileName}
								className="kt-transparent flex-center float-r"
							>
								<DownloadIcon className="medium logo dark auto-height" />
							</a> */}
							{/* <Button onClick={downloadZip} content="Download zip" /> */}
						</div>
					)}
				</div>
			</div>
		</div>
	</div>
  );
};

PdfPreview.propTypes = {
  handleCloseAction: PropTypes.func.isRequired,
};

export default PdfPreview;
