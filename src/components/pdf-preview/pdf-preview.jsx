import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
// import pdf from '../../file.pdf';

const PdfPreview = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = (document) => {
    const { pages } = document;
    setNumPages(pages);
  };

  const changePage = (offset) => setPageNumber(pageNumber + offset);

  const previousPage = () => changePage(-1);

  const nextPage = () => changePage(1);

  return (
	<div className="pdf-preview">
		<div className="pdf-overlay" />
		<div className="pdf-wrapper">
			<Document
				file="file.pdf"
				onLoadSuccess={onDocumentLoadSuccess}
			>
				<Page pageNumber={pageNumber} />
			</Document>
			<div>
				<p>
            Page
					{' '}
					{pageNumber || (numPages ? 1 : '--')}
					{' '}
          of
					{' '}
					{numPages || '--'}
				</p>
				<button
					type="button"
					disabled={pageNumber <= 1}
					onClick={previousPage}
				>
          Previous
				</button>
				<button
					type="button"
					disabled={pageNumber >= numPages}
					onClick={nextPage}
				>
          Next
				</button>
			</div>
		</div>
	</div>
  );
};

export default PdfPreview;
