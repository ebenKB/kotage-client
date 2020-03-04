/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-undef */
import React, {
  useState, useEffect, Fragment, createRef,
} from 'react';
import { Button } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import { ReactComponent as Icon } from '../../../svg/upload.svg';
import './dropzone.scss';
import DropzoneItem from './dropzone-item/dropzone-item';
import AddItem from '../../snippets/add-item/add-item';
import { ReactComponent as Menu } from '../../../svg/menu.svg';
import { ReactComponent as PowerPoint } from '../../../svg/pptx.svg';

const dropzoneRef = createRef();
function KtDropzone({ onFilesChange }) {
  const [hasEntered, setHasEntered] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  useEffect(() => {
    // attach the files to the requisitions
    if (onFilesChange) {
      onFilesChange(files);
    }
    // check if there is any file
    if (files.length > 0) {
      setIsEmpty(true);
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
      filteredFiles = filteredFiles.filter((x) => x.name !== f.name);
    }

    // check if there were duplicate files found
    if (newFiles.length - filteredFiles.length > 0) {
      setError(`${(newFiles.length - filteredFiles.length)} Duplicates rejected`);
    }
    setFiles((oldFiles) => ([...oldFiles, ...filteredFiles]));
  };

  // open file explorer to select files
  const openDialog = () => {
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

  const addMoreFiles = (e) => {
    e.preventDefault();
    setIsEmpty(false);
  };

  /**
   * Use this method to delete files from the dropzone
   * @param {*} file the file to be deleted
   */
  const handleDeleteFile = (file) => {
    setFiles(files.filter((x) => (x.name !== file)));
    // check if the last item has been deleted and show a form to add more files
    if (files.length === 1) {
      setIsEmpty(false);
    }
  };

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop})
  return (
	<div
		className="dropzone-wrapper"
	>
		<div className="dropzone-content active light-caption">
			<div className="dropzone-content__heading">
				<div className="dropzone-heading__items">
					<div>Title</div>
					<div>Type</div>
				</div>
			</div>
			<div className="dropzone-content__body">
				<div className="dropzone-item">
					<div>
						<Menu className="small logo" />
					</div>
					<div>
						<div className="bold">Implementation plan</div>
						<div className="light-caption sm-caption">Implementation_plan.pptx</div>
					</div>
					<div>
						<PowerPoint className="dark medium logo" />
					</div>
					<Button.Group basic size="mini" className="dropzone-cta">
						<Button>EDIT</Button>
						<Button>DELETE</Button>
					</Button.Group>
					{/* <div className="dropzone-cta">
						<Button basic size="mini">EDIT</Button>
						<DeleteButton
							type="icon"
							classes="kt-transparent kt-danger"
						/>
					</div> */}
				</div>
				<div className="dropzone-item">
					<div>
						<Menu className="small logo" />
					</div>
					<div>
						<div className="bold">Implementation plan</div>
						<div className="light-caption sm-caption">Implementation_plan.pptx</div>
					</div>
					<div>
						<PowerPoint className="dark medium logo" />
					</div>
					<Button.Group basic size="mini" className="dropzone-cta">
						<Button>EDIT</Button>
						<Button>DELETE</Button>
					</Button.Group>
					{/* <div className="dropzone-cta">
						<Button basic size="mini">EDIT</Button>
						<DeleteButton
							type="icon"
							classes="kt-transparent kt-danger"
						/>
					</div> */}
				</div>
				<div className="dropzone-item">
					<div>
						<Menu className="small logo" />
					</div>
					<div>
						<div className="bold">Implementation plan</div>
						<div className="light-caption sm-caption">Implementation_plan.pptx</div>
					</div>
					<div>
						<PowerPoint className="dark medium logo" />
					</div>
					<Button.Group basic size="mini" className="dropzone-cta">
						<Button>EDIT</Button>
						<Button>DELETE</Button>
					</Button.Group>
					{/* <div className="dropzone-cta">
						<Button basic size="mini">EDIT</Button>
						<DeleteButton
							type="icon"
							classes="kt-transparent kt-danger"
						/>
					</div> */}
				</div>
				<div className="dropzone-item">
					<div>
						<Menu className="small logo" />
					</div>
					<div>
						<div className="bold">Implementation plan</div>
						<div className="light-caption sm-caption">Implementation_plan.pptx</div>
					</div>
					<div>
						<PowerPoint className="dark medium logo" />
					</div>
					<Button.Group basic size="mini" className="dropzone-cta">
						<Button>EDIT</Button>
						<Button>DELETE</Button>
					</Button.Group>
					{/* <div className="dropzone-cta">
						<Button basic size="mini">EDIT</Button>
						<DeleteButton
							type="icon"
							classes="kt-transparent kt-danger"
						/>
					</div> */}
				</div>
			</div>
		</div>
		<Dropzone
			onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			noClick
			ref={dropzoneRef}
		>
			{({ getRootProps, getInputProps }) => (
				<section className={`dropzone text-center ${hasEntered ? 'active' : ''} ${!isEmpty ? 'empty' : 'full'}`}>
					<div {...getRootProps()} className="root">
						<input {...getInputProps()} />
						<div>
							<Icon className="kt-logo__medium" />
							<p>
								<span className="bold">Drag & drop</span>
                your documents here, or&nbsp;
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
		{error && (
			<div className="kt-danger m-t-20">{error}</div>
		)}
		<div className={`dropzone-content ${files.length > 0 ? 'active' : ''}`}>
			{files && (
				<Fragment>
					{files.length === 1 && (
						<span className="bold">
							{files.length}
							{' '}
              File
						</span>
					)}
					{files.length > 1 && (
						<span className="bold">
							{files.length}
							{' '}
              Files
						</span>
					)}
					<ul className="dropzone-items">
						{files.map((file, idx) => (
							<li
								key={idx}
								id={idx}
								className="m-b-5 m-t-5"
							>
								<DropzoneItem
									file={file}
									deleteFile={() => handleDeleteFile(file.name)}
									id={idx}
								/>
							</li>
						))}
					</ul>
				</Fragment>
			)}
			{isEmpty && (
				<Fragment>
					<AddItem
						title="Add More File"
						classes="green small"
						handleClick={addMoreFiles}
					/>
				</Fragment>
			)}
		</div>
	</div>
  );
}

export default KtDropzone;
