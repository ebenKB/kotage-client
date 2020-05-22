/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Image } from 'semantic-ui-react';
import FilePreview from '../file-preview/file-preview';

const ImageReader = ({ fileObject, user, handleCloseAction }) => {
  const [enlarge, setEnlarge] = useState(true);
  // const [clickCounter, setClickCounter] = useState(0);

  let clickCounter = 0;
  const handleImageClick = (e) => {
    e.preventDefault();
    const count = clickCounter + 1;
    clickCounter = count;

    // check if it is double click
    if (clickCounter === 2) {
      setEnlarge(!enlarge);
    }
  };
  const getImageSize = () => {
    if (enlarge) {
      return 'full-width';
    }
    return 'fit-height';
  };
  return (
	<div>
		<FilePreview
			type="image"
			fileObject={fileObject}
			handleCloseAction={handleCloseAction}
			user={user}
		>
			<Image
				onClick={handleImageClick}
				src={fileObject.staticUrl}
				className={`clickable ${getImageSize()}`}
			/>
		</FilePreview>
	</div>
  );
};

export default ImageReader;
