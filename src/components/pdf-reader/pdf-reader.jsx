/* eslint-disable react/prop-types */
import React, { Component } from 'react';
// import { PropTypes } from 'prop-types';
import { pdfjs, Document, Page } from 'react-pdf';
// import pdf from '../../file.pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import './pdf-reader.scss';
import FilePreview from '../file-preview/file-preview';
import KtLoader from '../loader/loader';


pdfjs
  .GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PdfReader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numPages: null,
      pageNumber: 1,
      scale: 1.5,
    };
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  zoomout = () => {
    const { scale } = this.state;
    if (scale < 3.5) {
      // setScale(scale + 0.25);
      this.setState((state) => ({
        ...state,
        scale: state.scale + 0.25,
      }));
    }
  };

  zoomin = () => {
    const { scale } = this.state;
    if (scale > 0.25) {
      this.setState((state) => ({
        ...state,
        scale: state.scale - 0.25,
      }));
    }
  };

  fitToScreen =() => {
    this.setState((state) => ({
      ...state,
      scale: 1,
    }));
  }

  render() {
    // type={getFileType()}
    // fileObject={fileObject}
    // user={user}
    // handleCloseAction={() => setCanPreview(false)}

    const { scale, pageNumber, numPages } = this.state;
    const {
      fileObject, user, handleCloseAction,
    } = this.props;

    return (
	<div>
		<FilePreview
			type="pdf"
			fileObject={fileObject}
			pages={numPages}
			scale={scale}
			handleCloseAction={handleCloseAction}
			user={user}
			handleZoomOut={this.zoomout}
			handleZoomIn={this.zoomin}
			handleFitScreen={this.fitToScreen}
		>
			<Document
				file={fileObject.staticUrl}
				onLoadSuccess={this.onDocumentLoadSuccess}
				loading={<KtLoader />}
				className="pdf-reader"
			>
				{numPages <= 10 && (Array.from(new Array(numPages), (el, index) => (
					<Page
						key={`page_${index + 1}`}
						pageNumber={index + 1}
						scale={scale}
						className="pdf-reader__canvas"
					/>
				))
				)}
				{numPages > 10 && (
					<Page
						pageNumber={pageNumber}
						scale={scale}
						className="pdf-reader__canvas"
					/>
				)}
			</Document>
		</FilePreview>
		{/* <p>
			Page
			{pageNumber}
			{' '}
			of
			{numPages}
		</p> */}
	</div>
    );
  }
}

// PdfReader.propTypes = {
//   scale: PropTypes.number.isRequired,
//   fileUrl: PropTypes.string.isRequired,
// };
export default PdfReader;
