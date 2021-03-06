/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'semantic-ui-react';
import { ReactComponent as PDFIcon } from '../../../svg/pdf-alt.svg';
import { ReactComponent as JPEGIcon } from '../../../svg/jpg-alt.svg';
import { ReactComponent as WORDIcon } from '../../../svg/word-alt.svg';
import { ReactComponent as PNGIcon } from '../../../svg/png-alt.svg';
import { ReactComponent as EXCELIcon } from '../../../svg/xls-alt.svg';
import { ReactComponent as FileIcon } from '../../../svg/file.svg';
import './kt-file-item.scss';
import PdfReader from '../../pdf-reader/pdf-reader';
import { ReactComponent as Download } from '../../../svg/download.svg';
import { ReactComponent as Preview } from '../../../svg/preview.svg';
import { getFileNameAndExtension, getFileExtension } from '../../../utils/app/file';
import ImageReader from '../../image-reader/image-reader';
import {
  PDF, JPEG, WORD, PNG, EXCEL,
} from '../../../utils/app/fileTypes';


// eslint-disable-next-line react/prop-types
const KtFileItem = ({
  fileObject, details, user,
}) => {
  const [canPreview, setCanPreview] = useState(false);

  const getDownloadLink = () => (
	<a
		href={fileObject.staticUrl}
		download={getFileNameAndExtension(fileObject.remoteUrl)}
		className="kt-item__cta-tool-tip m-r-10"
		attr-data="Download"
	>
		<Download className="m-r-5 medium dark logo auto-height" />
	</a>
  );

  const getFileTitle = () => (
	<span>
		{fileObject && `${fileObject.fileName.substring(0, 9)}...`}
    &nbsp;
		<span className="xsm bold">
			<span>(</span>
			<span>{fileObject && fileObject.fileSize}</span>
			<span>)</span>
		</span>
	</span>
  );

  const getFileType = () => {
    if (fileObject.fileType === PDF) {
      return 'pdf';
    }

    if (fileObject.fileType === PNG || fileObject.fileType === JPEG) {
      return 'image';
    }
    return 'none';
  };
  const getFileLogo = () => {
    if ((fileObject.fileType === PDF) || (getFileExtension(fileObject.fileName) === 'pdf')) {
      return (<PDFIcon className="big logo auto-height m-r-5" />);
    }
    if (fileObject.fileType === JPEG || (getFileExtension(fileObject.fileName) === ('jpeg' || 'jpg'))) {
      return (<JPEGIcon className="big logo auto-height m-r-5" />);
    }
    if (fileObject.fileType === WORD || (getFileExtension(fileObject.fileName) === ('docx' || 'doc'))) {
      return (<WORDIcon className="big logo auto-height m-r-5" />);
    }
    if (fileObject.fileType === PNG || (getFileExtension(fileObject.fileName) === 'png')) {
      return (<PNGIcon className="big logo auto-height m-r-5" />);
    }
    if (fileObject.fileType === EXCEL || (getFileExtension(fileObject.fileName) === '.xlsx')) {
      return (<EXCELIcon className="big logo auto-height m-r-5" />);
    }
    return (<FileIcon className="big logo auto-height m-r-5" />);
  };

  const getPreview = () => {
    if (getFileType() === 'pdf') {
      return (
	<PdfReader
		fileObject={fileObject}
		details={details}
		user={user}
		handleCloseAction={() => setCanPreview(false)}
	/>
      );
    }
    return (
	<ImageReader
		fileObject={fileObject}
		details={details}
		user={user}
		handleCloseAction={() => setCanPreview(false)}
	/>
    );
  };

  const canShowPreview = () => getFileType() === 'pdf' || getFileType() === 'image';

  return (
	<div

		className="m-b-20 flex-center file-item kt-bg-shadow"
	>
		<div className="flex-center item">
			{getFileLogo()}
			<span>
				{getFileTitle()}
			</span>
		</div>
		<div className="file-item__cta text-center">
			<div className="file-item__cta-logo">
				{fileObject && getDownloadLink()}
				{canShowPreview() && (
					<span className="m-l-5 kt-item__cta-tool-tip" attr-data="Preview">
						<Button className="kt-transparent" onClick={() => setCanPreview(true)}>
							<Preview className="medium logo auto-height" />
						</Button>
					</span>
				)}
			</div>
		</div>
		{canPreview && getPreview()}
	</div>
  );
};

KtFileItem.propTypes = {
  fileObject: PropTypes.object.isRequired,
  user: PropTypes.object,
  details: PropTypes.object,
};

KtFileItem.defaultProps = {
  user: null,
  details: null,
};

export default KtFileItem;
