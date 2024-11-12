import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import './PDFViewer.css'; // Import the CSS for styling
const pdfjs = await import('pdfjs-dist/build/pdf');
const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PDFViewer = ({ role, roomId }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfFile, setPdfFile] = useState(null); // Holds the file URL

  // Function to handle PDF file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const fileUrl = URL.createObjectURL(file); // Create a URL for the uploaded file
      setPdfFile(fileUrl); // Update the state with the file URL
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  // Callback to get the total number of pages of the PDF
  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    setPageNumber(prevPage => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prevPage => Math.min(prevPage + 1, numPages));
  };

  useEffect(() => {
    // Cleanup the file URL when the component is unmounted or pdfFile changes
    return () => {
      if (pdfFile) {
        URL.revokeObjectURL(pdfFile);
      }
    };
  }, [pdfFile]);

  return (
    <div className="pdf-viewer-container">
      <h2 className="viewer-header">Room: {roomId} - {role === 'admin' ? 'Admin' : 'Viewer'}</h2>

      <div className="file-upload-container">
        <input
          type="file"
          onChange={handleFileUpload}
          accept="application/pdf"
          className="file-input"
        />
      </div>

      <div className="pdf-container">
        {pdfFile ? (
          <Document
            file={pdfFile}
            onLoadSuccess={onLoadSuccess}
            loading={<p>Loading PDF...</p>}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        ) : (
          <p>Please upload a PDF file.</p>
        )}
      </div>

      <div className="navigation">
        {role === 'admin' && (
          <>
            <button
              className="nav-button"
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
            >
              Previous
            </button>
            <button
              className="nav-button"
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
            >
              Next
            </button>
          </>
        )}
      </div>

      <div className="page-info">
        {numPages && (
          <p>
            Page {pageNumber} of {numPages}
          </p>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;
