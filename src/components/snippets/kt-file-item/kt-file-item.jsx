import React, { useState, useEffect } from 'react';
// import SaveAltRoundedIcon from '@material-ui/icons/SaveAltRounded';
import { PropTypes } from 'prop-types';
import { Button } from 'semantic-ui-react';
import { ReactComponent as FileIcon } from '../../../svg/pdf-alt.svg';
import './kt-file-item.scss';
import PdfPreview from '../../pdf-preview/pdf-preview';
import { prepareFileForDownload } from '../../../utils/app/file';
import { ReactComponent as Download } from '../../../svg/download.svg';
import { ReactComponent as Preview } from '../../../svg/preview.svg';

const KtFileItem = ({ url }) => {
  const [hasPreparedFile, prepareFile] = useState(false);
  const [fileObject, setFileObject] = useState(null);
  const [canPreview, setCanPreview] = useState(false);

  useEffect(() => {
    if (!hasPreparedFile) {
      prepareFileForDownload(url)
        .then((data) => {
          prepareFile(true);
          setFileObject(data);
        });
    }
  }, [hasPreparedFile]);

  const getDownloadLink = () => (
	<a href={fileObject.staticUrl} download={fileObject.fileName} className="file-item__cta-tool-tip" attr-data="Download">
		<Download className="m-r-5 big dark logo auto-height" />
	</a>
  );

  const getFileTitle = () => (
	<span>
    File Item
    &nbsp;
		<span className="xsm">{ fileObject && fileObject.fileSize}</span>
	</span>
  );

  return (
	<div className="m-b-20 flex-center file-item kt-bg-shadow">
		<div className="flex-center item">
			<FileIcon className="big logo auto-height m-r-5" />
			<span>
				{getFileTitle()}
			</span>
		</div>
		<div className="flex-center file-item__cta text-center">
			<div className="flex-center file-item__cta-logo">
				{ hasPreparedFile && fileObject && getDownloadLink()}
				<span className="m-l-5 file-item__cta-tool-tip" attr-data="Preview">
					<Button className="kt-transparent" onClick={() => setCanPreview(true)}>
						<Preview className="big logo auto-height" />
					</Button>
				</span>
			</div>
		</div>
		{canPreview && (
			<PdfPreview />
		)}
	</div>
  );
};

KtFileItem.propTypes = {
  url: PropTypes.string.isRequired,
};

export default KtFileItem;
