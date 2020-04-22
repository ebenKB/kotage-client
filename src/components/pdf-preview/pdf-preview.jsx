import React, { useState, useEffect } from 'react';
import './pdf-preview.scss';
import Jszip from 'jszip';
import { saveAs } from 'file-saver';
import { Button } from 'semantic-ui-react';
import { prepareFileForDownload } from '../../utils/app/file';
import { ReactComponent as CloseIcon } from '../../svg/close.svg';

const PdfPreview = () => {
  const [isFileReady, hasPreparedFile] = useState(false);
  const [fileObject, setFileObject] = useState(null);

  const downloadZip = () => {
    const zip = new Jszip();
    const zipFolder = zip.folder('rfpFiles');
    zipFolder.file('rfp-1', new Blob([fileObject.data]), { base64: true });
    zip.generateAsync({ type: 'blob' })
      .then((data) => saveAs(data));
  };

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
		<div className="file-preview">
      file preview
			<Button onClick={downloadZip} content="Download zip" />
		</div>
		<div className="preview-controls">
			{isFileReady && fileObject && (
				<div>
					<a href={fileObject.staticUrl} download={fileObject.fileName} className="ui green button">
            Download
            &nbsp;
						{fileObject.fileSize}
					</a>
				</div>
			)}
			<Button
				default
				size="tiny"
				icon={<CloseIcon className="small icon dark" />}
				className="kt-transparent flex-center"
			/>
		</div>
	</div>
  );
};

export default PdfPreview;
