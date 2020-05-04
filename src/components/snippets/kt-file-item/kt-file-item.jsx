/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
// import SaveAltRoundedIcon from '@material-ui/icons/SaveAltRounded';
import { PropTypes } from 'prop-types';
import { Button } from 'semantic-ui-react';
import { ReactComponent as PDFIcon } from '../../../svg/pdf-alt.svg';
import { ReactComponent as JPEGIcon } from '../../../svg/jpg-alt.svg';
import { ReactComponent as WORDIcon } from '../../../svg/word-alt.svg';
import { ReactComponent as PNGIcon } from '../../../svg/png-alt.svg';
import { ReactComponent as EXCELIcon } from '../../../svg/xls-alt.svg';
import './kt-file-item.scss';
import PdfPreview from '../../pdf-preview/pdf-preview';
import { ReactComponent as Download } from '../../../svg/download.svg';
import { ReactComponent as Preview } from '../../../svg/preview.svg';
import { getFileNameAndExtension } from '../../../utils/app/file';
import {
  PDF, JPEG, WORD, PNG, EXCEL,
} from '../../../utils/app/fileTypes';


const KtFileItem = ({ fileObject, user }) => {
  const [canPreview, setCanPreview] = useState(false);

  const getDownloadLink = () => (
	<a
		href={fileObject.staticUrl}
		download={getFileNameAndExtension(fileObject.file_url)}
		className="kt-item__cta-tool-tip m-r-10"
		attr-data="Download"
	>
		<Download className="m-r-5 medium dark logo auto-height" />
	</a>
  );

  const getFileTitle = () => (
	<span>
		{fileObject && fileObject.fileName}
    &nbsp;
		<span className="xsm">{ fileObject && fileObject.fileSize}</span>
	</span>
  );

  const getFileLogo = () => {
    if (fileObject.fileType === PDF) {
      return (<PDFIcon className="big logo auto-height m-r-5" />);
    }
    if (fileObject.fileType === JPEG) {
      return (<JPEGIcon className="big logo auto-height m-r-5" />);
    }
    if (fileObject.fileType === WORD) {
      return (<WORDIcon className="big logo auto-height m-r-5" />);
    }
    if (fileObject.fileType === PNG) {
      return (<PNGIcon className="big logo auto-height m-r-5" />);
    }
    if (fileObject.fileType === EXCEL) {
      return (<EXCELIcon className="big logo auto-height m-r-5" />);
    }
    return (<span />);
  };

  return (
	<div className="m-b-20 flex-center file-item kt-bg-shadow">
		<div className="flex-center item">
			{getFileLogo()}
			<span>
				{getFileTitle()}
			</span>
		</div>
		<div className="file-item__cta text-center">
			<div className="file-item__cta-logo">
				{fileObject && getDownloadLink()}
				<span className="m-l-5 kt-item__cta-tool-tip" attr-data="Preview">
					<Button className="kt-transparent" onClick={() => setCanPreview(true)}>
						<Preview className="medium logo auto-height" />
					</Button>
				</span>
			</div>
		</div>
		{canPreview && (
			<PdfPreview
				fileObject={fileObject}
				user={user}
				handleCloseAction={() => setCanPreview(false)}
			/>
		)}
	</div>
  );
};

KtFileItem.propTypes = {
  fileObject: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default KtFileItem;
