/* eslint-disable camelcase */
/* eslint-disable react/boolean-prop-naming */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'semantic-ui-react';
import AttachmentIcon from '@material-ui/icons/Attachment';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getFileSignedUrl, downloadMultipleZip } from '../../utils/app/file';
import KtFileItem from '../snippets/kt-file-item/kt-file-item';
import KtLoader from '../loader/loader';
import { setNotification, downloadFile, cacheFileBlob } from '../../redux/actions/appActions';

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

// sign url to get authorized access to the file
signUrl = async () => {
  const { files, tenantID, objectOwnerID } = this.props;
  let promises = [];
  for (const file of files) {
    const url = getFileSignedUrl(file.file, tenantID, objectOwnerID);
    promises = [...promises, url];
  }

  try {
    // const results = await Promise.all(promises);
    const results = await Promise.allSettled(promises);
    for (const result of results) {
      if (result.status === 'fulfilled') {
        this.setState((state) => ({
          ...state,
          signedUrls: [...state.signedUrls, result.value],
        }));
      }
    }
    const { signedUrls } = this.state;
    await this.downloadFiles(signedUrls);
  } catch (error) {
    if (error.response) {
      const { response: { data: { invalid_token } } } = error;
      if (invalid_token) {
        const { history } = this.props;
        history.push('/auth/signin');
      } else {
        setNotification(error, 'error');
      }
    }
  }
};

downloadFiles = async (urls) => {
  let promises = [];
  for (const url of urls) {
    // const file = prepareFileForDownload(url);
    // eslint-disable-next-line react/prop-types
    const file = this.props.downloadFileAsBlob(url);
    file.file_url = url;
    promises = [...promises, file];
  }

  for (const promise of promises) {
    Promise.resolve(promise)
      .then((file) => {
        this.setState((state) => ({
          ...state,
          files: [...state.files, file],
        }));
        // this.props.saveFileAsCache(file);
      })
      .catch(() => console.log('err'));
  }
};

downloadAllFiles = () => {
  downloadMultipleZip(this.state.files, 'RFP files');
};

render() {
  const { files, signedUrls } = this.state;
  // eslint-disable-next-line react/prop-types
  const { details } = this.props;
  return (
	<>
		<div className="flex-center">
			{files.length !== signedUrls.length && (
				<KtLoader />
			)}
			{files.map((file) => (
				<KtFileItem
					fileObject={file}
					details={details}
				/>
			))}
		</div>
		{files && files.length > 0 && (
			<div className="m-t-10 flex-center wrap">
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
  history: PropTypes.object.isRequired,
  // saveFileAsCache: PropTypes.func.isRequired,
};

FileHandler.defaultProps = {
  shouldSignUrl: false,
};

const mapDispatchToProps = {
  downloadFileAsBlob: downloadFile,
  saveFileAsCache: cacheFileBlob,
};


export default connect(null, mapDispatchToProps)(withRouter(FileHandler));
