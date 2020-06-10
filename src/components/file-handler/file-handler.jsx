/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { getFileSignedUrl, prepareFileForDownload } from '../../utils/app/file';
import KtFileItem from '../snippets/kt-file-item/kt-file-item';


class FileHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedUrls: [],
      files: [],
    };
  }

  componentDidMount() {
    this.signUrl();
  }

signUrl = () => {
  const { files } = this.props;
  let promises = [];
  for (const file of files) {
    const url = getFileSignedUrl(file.file, 2, 1);
    promises = [...promises, url];
  }

  Promise.all(promises)
    .then((results) => {
      this.setState((state) => ({
        ...state,
        signedUrls: results,
      }));
      this.downloadFiles();
    });
};

downloadFiles = () => {
  const { signedUrls } = this.state;
  let promises = [];
  for (const url of signedUrls) {
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

render() {
  const { files } = this.state;
  return (
	<div>
		{this.state.signedUrls.map((s) => <div>{s}</div>)}
		{files.map((file) => (
			<KtFileItem
				fileObject={file}
			/>
		))}
	</div>
  );
}
}

FileHandler.propTypes = {
  files: PropTypes.object.isRequired,
};

export default FileHandler;
