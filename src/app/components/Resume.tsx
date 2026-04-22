import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import resumePdf from '../../imports/brandon-resume.pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import '../../styles/pdf-viewer.css';

// Set up the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function Resume() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2.0));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.6));
  };

  const handlePrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages || 1));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumePdf;
    link.download = 'Brandon_Liu_Resume.pdf';
    link.click();
  };

  return (
    <div className="min-h-screen py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl md:text-6xl mb-6 text-white">My Resume</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            View my professional experience, education, and skills
          </p>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Download size={20} />
            Download Resume
          </button>
        </motion.div>

        {/* PDF Viewer Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <div className="bg-gray-900 rounded-lg shadow-md p-4 flex flex-wrap items-center justify-center gap-4 border border-gray-800">
            {/* Zoom Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-white"
                aria-label="Zoom out"
              >
                <ZoomOut size={20} />
              </button>
              <span className="text-sm text-gray-400 min-w-[60px] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-white"
                aria-label="Zoom in"
              >
                <ZoomIn size={20} />
              </button>
            </div>

            {/* Page Navigation */}
            {numPages && numPages > 1 && (
              <>
                <div className="w-px h-6 bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={pageNumber <= 1}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-sm text-gray-600 min-w-[80px] text-center">
                    Page {pageNumber} of {numPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={pageNumber >= numPages}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Next page"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* PDF Viewer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <div className="bg-white rounded-lg shadow-xl p-4 overflow-auto max-w-full">
            <Document
              file={resumePdf}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="flex items-center justify-center min-h-[600px]">
                  <div className="text-gray-400">Loading resume...</div>
                </div>
              }
              error={
                <div className="flex items-center justify-center min-h-[600px]">
                  <div className="text-red-500">Failed to load PDF. Please try downloading instead.</div>
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className="mx-auto"
              />
            </Document>
          </div>
        </motion.div>

        {/* Alternative Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl mb-6 text-gray-900">Professional Summary</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Dedicated software engineer with a passion for creating innovative solutions and building 
              scalable applications. Experienced in full-stack development with expertise in modern web 
              technologies and frameworks.
            </p>

            <h3 className="text-2xl mb-4 text-gray-900">Key Highlights</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2"></div>
                <span>5+ years of experience in software development</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2"></div>
                <span>Proficient in React, TypeScript, Node.js, and modern web technologies</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2"></div>
                <span>Strong problem-solving skills and attention to detail</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2"></div>
                <span>Excellent communication and collaboration abilities</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}