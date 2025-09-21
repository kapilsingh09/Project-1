import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ErrorPopupProps {
  open: boolean;
  onClose: () => void;
  onRetry?: () => void;
  errors: string[];
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ open, onClose, onRetry, errors }) => {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-2 sm:p-4">
          {/* Popup card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-lg sm:rounded-2xl rounded-lg bg-white dark:bg-gray-900 border border-red-300 dark:border-red-700 shadow-2xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto"
          >
            {/* Cross button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close error"
              className="absolute right-3 top-3 sm:right-4 sm:top-4 p-2 rounded-full bg-red-100 hover:bg-red-200 dark:bg-red-900/40 dark:hover:bg-red-900/60 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-red-700 dark:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 pr-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01M12 5.5a6.5 6.5 0 110 13 6.5 6.5 0 010-13z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-red-700 dark:text-red-400">Form Errors</h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Please fix the following issues before submitting your report:
                </p>
              </div>
            </div>

            {/* Error list */}
            <ul className="mt-4 sm:mt-6 space-y-2">
              {errors.map((err, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs sm:text-sm text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/30 rounded-md px-3 py-2 shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600 dark:text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M12 5a7 7 0 110 14 7 7 0 010-14z" />
                  </svg>
                  {err}
                </li>
              ))}
            </ul>

            {/* Additional context */}
            <div className="mt-4 sm:mt-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
              <p className="font-medium mb-1">Possible causes:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Some fields might be missing or invalid.</li>
                <li>There could be a temporary network issue.</li>
                <li>The server might be unavailable. Try again later.</li>
              </ul>
            </div>

            {/* Footer */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
              <a
                href="#"
                className="text-xs sm:text-sm text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
              >
                Need help?
              </a>
              <div className="flex gap-2 w-full sm:w-auto">
                {onRetry && (
                  <button
                    type="button"
                    onClick={onRetry}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                  >
                    Retry
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close error"
                  className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white text-xs sm:text-sm font-semibold shadow hover:from-red-700 hover:to-red-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ErrorPopup;
