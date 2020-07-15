/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-undef */
import React, {
  useState, useEffect, createRef,
} from 'react';
import { Button } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import { getNameFromFileName } from '../../utils/app/index';
import './dropzone.scss';
import DropzoneItem from './dropzone-item/dropzone-item';

function KtDropzone({ onFilesChange }) {
  const [hasEntered, setHasEntered] = useState(false);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const dropzoneRef = createRef();

  useEffect(() => {
    // attach the files to the requisitions
    if (onFilesChange) {
      onFilesChange(files);
    }
  }, [files]);

  /**
   * Listen to filed drop actions on the dropzone
   * @param {*} newFiles the files that were selected from the file chooser
   */
  const handleDrop = (newFiles) => {
    setHasEntered(false);
    setError(null);
    // check if the user tries to upload duplicate files and filter them out
    let filteredFiles = newFiles;
    for (const f of files) {
      filteredFiles = filteredFiles.filter((x) => x.name !== f.data.name);
    }

    // check if there were duplicate files found
    if (newFiles.length - filteredFiles.length > 0) {
      setError(`${(newFiles.length - filteredFiles.length)} duplicate file(s) rejected`);
    }
    const formatedFileObject = filteredFiles.map((f) => ({
      id: f.id,
      title: getNameFromFileName(f.name),
      data: f,
    }));
    setFiles((oldFiles) => ([...oldFiles, ...formatedFileObject]));
  };

  const updateFile = (oldFile, newFile) => {
    const newFiles = files.map((f) => {
      if (f.title === oldFile.title) {
        return newFile;
      }
      return null;
    });
    setFiles(newFiles);
  };

  // open file explorer to select files
  const openDialog = () => {
    // const dropzoneRef = createRef();
    if (dropzoneRef.current) {
      dropzoneRef.current.open();
    }
  };

  const handleDragEnter = () => {
    setHasEntered(true);
  };

  const handleDragLeave = () => {
    setHasEntered(false);
  };

  // const addMoreFiles = (e) => {
  //   e.preventDefault();
  //   setIsEmpty(false);
  // };

  /**
   * Use this method to delete files from the dropzone
   * @param {*} file the file to be deleted
   */
  const handleDeleteFile = (file) => {
    setFiles(files.filter((x) => (x.data.name !== file.data.name)));
  };

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop})
  return (
	<div
		className="dropzone-wrapper"
	>
		{files && files.length > 0 && (
			<div className="dropzone-content active light-caption">
				<div className="dropzone-content__heading">
					<div className="dropzone-heading__items">
						<div>Title</div>
						<div>Type</div>
					</div>
				</div>
				<div className="dropzone-content__body">
					{files.map((file, idx) => (
						<DropzoneItem
							file={file}
							handleFileUpdate={(old, newFile) => updateFile(old, newFile)}
							deleteFile={() => handleDeleteFile(file)}
							idx={idx}
							key={`${idx}_${file.name}`}
						/>
					))}
				</div>
			</div>
		)}
		{error && (
			<div className="kt-danger m-t-20 m-b-20">{error}</div>
		)}
		<Dropzone
			onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			noClick
			ref={dropzoneRef}
		>
			{({ getRootProps, getInputProps }) => (
				<section className={`dropzone text-center ${hasEntered ? 'active' : ''}`}>
					<div {...getRootProps()} className="root">
						<input {...getInputProps()} />
						<div>
							<p>
								<span className="bold">
									Drop&nbsp;
								</span>
								your documents here or&nbsp;
								<Button
									type="button"
									onClick={openDialog}
									className="kt-transparent"
								>
									<span className="bold kt-primary">browse</span>
								</Button>
							</p>
						</div>
					</div>
				</section>
			)}
		</Dropzone>
	</div>
  );
}

export default KtDropzone;
