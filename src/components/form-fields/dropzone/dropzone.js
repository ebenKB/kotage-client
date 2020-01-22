import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import Dropzone from 'react-dropzone';
import { ReactComponent as Icon } from '../../../svg/upload.svg';

import './dropzone.scss';

function KtDropzone() {
  const [hasEntered, setHasEntered] = useState(false);
  const [files, setFiles] = useState([]);

  // const onDrop = useCallback(acceptedFiles => {
  //   console.log('we are in the drop')
  //   // Do something with the files
  //   setHasEntered(false);
  // }, [])

  const handleDrop =(files) => {
    setHasEntered(false);
    setFiles(files)
  }

  const handleDragEnter =() => {
    setHasEntered(true)
  }

  const handleDragLeave =() => {
    setHasEntered(false);
  }

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop})
  return (
    <div className="dropzone-wrapper">
      <Dropzone 
        onDrop={acceptedFiles => handleDrop(acceptedFiles)}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        {({getRootProps, getInputProps}) => (
          <section className={`dropzone text-center ${hasEntered ? 'active' : ''}`}>
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
          <span className="bold">Files</span>
          <ul>
              {
                files.map((file) => (
                <li key={file.name} className="m-b-5 m-t-5"> {file.name}</li>))
              }
          </ul>
         </>
        }
      </div>
    </div>
  )
}

export default KtDropzone;
