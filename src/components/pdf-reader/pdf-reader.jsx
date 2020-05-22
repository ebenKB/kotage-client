import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { pdfjs, Document, Page } from 'react-pdf';
// import pdf from '../../file.pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import './pdf-reader.scss';


pdfjs
  .GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PdfReader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numPages: null,
      pageNumber: 1,
    };
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  render() {
    const { pageNumber, numPages } = this.state;
    const { scale, fileUrl } = this.props;

    return (
	<div>
		<Document
			file={fileUrl}
			onLoadSuccess={this.onDocumentLoadSuccess}
			loading="Loading file..."
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

PdfReader.propTypes = {
  scale: PropTypes.number.isRequired,
  fileUrl: PropTypes.string.isRequired,
};
export default PdfReader;
