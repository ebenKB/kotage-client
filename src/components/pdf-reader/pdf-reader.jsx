import React, { Component } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
// import { Document, Page } from 'react-pdf/dist/entry.webpack';
import pdf from '../../file.pdf';
// import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs
  .GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class MyApp extends Component {
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

    return (
	<div>
		<Document
			file={pdf}
			onLoadSuccess={this.onDocumentLoadSuccess}
			loading="Loading file...."
		>
			<Page pageNumber={pageNumber} scale={1.5} />
		</Document>
		<p>
      Page
			{pageNumber}
			{' '}
      of
			{numPages}
		</p>
	</div>
    );
  }
}

export default MyApp;
