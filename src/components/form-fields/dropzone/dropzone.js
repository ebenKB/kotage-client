import React, {useState, useEffect} from 'react';
import Dropzone from 'react-dropzone';
import { ReactComponent as Icon } from '../../../svg/upload.svg';
import './dropzone.scss';
import DropzoneItem from './dropzone-item/dropzone-item';
import AddItem from '../../snippets/add-item/add-item';

function KtDropzone({onFilesChange}) {
  const [hasEntered, setHasEntered] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  useEffect(() => {
    //attach the files to the requisitions
    if(onFilesChange) {
      onFilesChange(files);
    }
    // check if there is any file
    if(files.length > 0) {
      setIsEmpty(true);
    }
  }, [files])

  /**
   * Listen to filed drop actions on the dropzone
   * @param {*} newFiles the files that were selected from the file chooser
   */
  const handleDrop = (newFiles) => {
    setHasEntered(false);
    setError(null);
    
    // check if the user tries to upload duplicate files and filter them out
    let filteredFiles = newFiles;
    for(let f of files) {
      filteredFiles = filteredFiles.filter((x) => x.name !== f.name);
    }

    // check if there were duplicate files found
    if(newFiles.length - filteredFiles.length > 0) {
      setError(`${(newFiles.length - filteredFiles.length)} Duplicates rejected`)
    }
    setFiles((oldFiles) => ([...oldFiles, ...filteredFiles]));
  }

  const handleDragEnter =() => {
    setHasEntered(true)
  }

  const handleDragLeave =() => {
    setHasEntered(false);
  }

  const addMoreFiles = (e) => {
    e.preventDefault();
    setIsEmpty(false);
  }

  /**
   * Use this method to delete files from the dropzone
   * @param {*} file the file to be deleted
   */
  const handleDeleteFile = (file) => {
    setFiles(files.filter( x => ( x.name !== file)));
    // check if the last item has been deleted and show a form to add more files
    if(files.length === 1) { 
      setIsEmpty(false);
    }
  }

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop})
  return (
    <div 
      className="dropzone-wrapper"
    >
      <Dropzone 
        onDrop={acceptedFiles => handleDrop(acceptedFiles)}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        {({getRootProps, getInputProps}) => (
          <section className={`dropzone text-center ${hasEntered ? 'active' : ''} ${!isEmpty ? 'empty' : 'full'}`}>
            <div {...getRootProps()} className="root">
              <input {...getInputProps()} />
              <div>
                <Icon className="kt-logo__medium"/>
                <p>
                  <span className="bold">Drag & drop</span> your documents here, or 
                  <span className="bold kt-primary"> browse</span> 
                </p>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
      {
        error && (
          <div className="kt-danger m-t-20">{error}</div>
        )
      }
      <div className={`dropzone-content ${files.length > 0 ? 'active' : ''}`}>
        {
         files &&
          <>
            {
              files.length == 1 && (
                <span className="bold">{files.length} File</span>
              )
            }
            {
              files.length > 1 && (
                <span className="bold">{files.length} Files</span>
              )
            }
            <ul className="dropzone-items">
              {
                files.map((file, idx) => (
                <li
                  key={idx}
                  id={idx}
                  className="m-b-5 m-t-5"
                >
                  <DropzoneItem
                    file={file}
                    deleteFile={()=>handleDeleteFile(file.name)}
                    id={idx}
                  />
                </li>))
              }
            </ul>
          </>
        }
        {
          isEmpty &&
          <>
            <AddItem 
              title='Add More File' 
              classes="green small"
              handleClick={addMoreFiles}
            />
          </>
        }
      </div>
    </div>
  )
}

export default KtDropzone;
