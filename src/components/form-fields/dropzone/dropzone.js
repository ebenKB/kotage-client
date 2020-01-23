import React, {useState, useEffect} from 'react';
import Dropzone from 'react-dropzone';
import { ReactComponent as Icon } from '../../../svg/upload.svg';
import './dropzone.scss';
import DropzoneItem from './dropzone-item/dropzone-item';
import AddItem from '../../snippets/add-item/add-item';

function KtDropzone({onFilesChange}) {
  const [hasEntered, setHasEntered] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
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

  const handleDrop = (newFiles) => {
    setHasEntered(false);
    setFiles((oldFiles) => ([...oldFiles, ...newFiles]));
    
    // check if there were files dropped
    // if(files.length > 0) {
    //   setIsEmpty(true);
    // }
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
