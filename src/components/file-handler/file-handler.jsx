/* eslint-disable react/boolean-prop-naming */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'semantic-ui-react';
import AttachmentIcon from '@material-ui/icons/Attachment';
import { getFileSignedUrl, prepareFileForDownload, downloadMultipleZip } from '../../utils/app/file';
import KtFileItem from '../snippets/kt-file-item/kt-file-item';
import KtLoader from '../loader/loader';


class FileHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedUrls: [],
      files: [],
    };
  }

  componentDidMount() {
    const { shouldSignUrl, files } = this.props;
    if (shouldSignUrl) {
      this.signUrl();
    } else {
      this.downloadFiles(files);
    }
  }

signUrl = () => {
  const { files, tenantID, objectOwnerID } = this.props;
  let promises = [];
  for (const file of files) {
    const url = getFileSignedUrl(file.file, tenantID, objectOwnerID);
    promises = [...promises, url];
  }

  Promise.all(promises)
    .then((results) => {
      this.setState((state) => ({
        ...state,
        signedUrls: results,
      }));
      const { signedUrls } = this.state;
      this.downloadFiles(signedUrls);
    })
    .catch((error) => console.log('error in the promise', error));
};

downloadFiles = (urls) => {
  let promises = [];
  for (const url of urls) {
    const file = prepareFileForDownload(url);
    file.file_url = url;
    promises = [...promises, file];
  }
  // Promise.all(promises)
  //   .then((files) => {
  //     console.log('Downloaded files: ', files);
  //     this.setState((state) => ({
  //       ...state,
  //       files,
  //     }));
  //   });
  for (const promise of promises) {
    Promise.resolve(promise)
      .then((file) => {
        this.setState((state) => ({
          ...state,
          files: [...state.files, file],
        }));
      });
  }
};

downloadAllFiles = () => {
  downloadMultipleZip(this.state.files, 'RFP files');
};

render() {
  const { files, signedUrls } = this.state;
  return (
	<>
		<div className="flex-center">
			{files.length !== signedUrls.length && (
				<KtLoader />
			)}
			{files.map((file) => (
				<KtFileItem
					fileObject={file}
				/>
			))}
		</div>
		{files && files.length > 0 && (
			<div className="m-t-10 flex-center">
				<Button

					default
					content={(
						<span>
							Download
							{' '}
							{files.length}
							{' '}
							{files.length === 1 ? 'attachment' : 'attachments' }
						</span>
					)}
					size="tiny"
					icon={<AttachmentIcon />}
					className="kt-transparent flex-center"
					onClick={this.downloadAllFiles}
				/>
			</div>
		)}
	</>
  );
}
}

FileHandler.propTypes = {
  files: PropTypes.object.isRequired,
  shouldSignUrl: PropTypes.bool,
  tenantID: PropTypes.string.isRequired,
  objectOwnerID: PropTypes.string.isRequired,
};

FileHandler.defaultProps = {
  shouldSignUrl: false,
};

export default FileHandler;
