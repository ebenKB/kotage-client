import React from 'react';
import { ReactComponent as Logo } from '../../../../svg/cancel.svg';
import { ReactComponent as File } from '../../../../svg/file.svg';
import { Label } from 'semantic-ui-react'


const DropzoneItem = ({file}) => {
  const getItemType =() => {
    if(file.type === 'image/jpeg') {
      return (
        <div className="dropzone-item">
          <div 
            className="cta clickable"
            onClick={() => alert('heyy')}
          >
            <Logo className="kt-logo__small"/>
            <span>Remove</span>
          </div>
          <img src={URL.createObjectURL(file)} alt="" className="kt-logo__custom"/>
        </div>
      )
    } else if(file.type === 'application/pdf') {
      return(
        <div>
          <File className="kt-logo__small"/>
          {file.name}
        </div>
      )
    } else {
      return (
        <div>
          <File className="kt-logo__small"/>
          {file.name}
        </div>
      )
    }
  }
  return (
    <>
      <span>
        {getItemType()}
      </span>
    </>
  )
}

export default DropzoneItem
