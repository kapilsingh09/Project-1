import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SubmittedData {
  name: string;
  email: string;
  phone?: string;
  location: string;
  wasteType: string;
  description?: string;
  photo?: string;
}

interface ReportPopUpProps {
  isOpen: boolean;
  onClose: () => void;
  submittedData: SubmittedData | null;
  onSubmitAnother?: () => void;
}

const ReportPopUp: React.FC<ReportPopUpProps> = ({
  isOpen,
  onClose,
  submittedData,
  onSubmitAnother,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-lg bg-white dark:bg-gray-900 border border-green-300 dark:border-green-700 rounded-2xl shadow-2xl p-6"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close popup"
              className="absolute right-4 top-4 p-2 rounded-full bg-green-100 hover:bg-green-200 dark:bg-green-900/40 dark:hover:bg-green-900/60 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-green-700 dark:text-green-400"
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
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-green-700 dark:text-green-400">
                  Report Submitted ✅
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Thank you for reporting. Here are the details of your submission:
                </p>
              </div>
            </div>

            {/* Submitted details */}
            {submittedData && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <p className="font-medium text-gray-700 dark:text-gray-300">Name:</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {submittedData.name || "N/A"}
                  </p>

                  <p className="font-medium text-gray-700 dark:text-gray-300">Email:</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {submittedData.email || "N/A"}
                  </p>

                  {submittedData.phone && (
                    <>
                      <p className="font-medium text-gray-700 dark:text-gray-300">Phone:</p>
                      <p className="text-gray-600 dark:text-gray-400">{submittedData.phone}</p>
                    </>
                  )}

                  <p className="font-medium text-gray-700 dark:text-gray-300">Location:</p>
                  <p className="text-gray-600 dark:text-gray-400">{submittedData.location}</p>

                  <p className="font-medium text-gray-700 dark:text-gray-300">Waste Type:</p>
                  <p className="text-gray-600 dark:text-gray-400">{submittedData.wasteType}</p>
                </div>

                {submittedData.description && (
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">Description:</p>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {submittedData.description}
                    </p>
                  </div>
                )}

                {submittedData.photo && (
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">Photo:</p>
                    <img
                      src={submittedData.photo}
                      alt="Submitted waste"
                      className="w-full h-44 object-cover rounded-lg border mt-2 shadow"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 flex justify-end gap-3">
              {onSubmitAnother && (
                <button
                  type="button"
                  onClick={onSubmitAnother}
                  className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                >
                  Submit Another
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold shadow hover:from-green-700 hover:to-green-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReportPopUp;
