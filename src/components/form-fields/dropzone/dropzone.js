import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { ReactComponent as Icon } from '../../../svg/upload.svg';

import './dropzone.scss';

function MyDropzone() {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  return (
  <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
    {({getRootProps, getInputProps}) => (
      <section className="dropzone text-center">
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
  )
}

export default MyDropzone;
