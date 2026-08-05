import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiAlertTriangle } from 'react-icons/fi';
export default function ConfirmDialog({ isOpen, onClose, onConfirm, title = 'Are you sure?', message = 'This action cannot be undone.', confirmText = 'Confirm', confirmVariant = 'danger', isLoading = false }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-dark-900 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center flex-shrink-0">
                <FiAlertTriangle className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
                <p className="text-gray-400 text-sm">{message}</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={onClose} className="px-4 py-2 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-colors text-sm">Cancel</button>
              <button onClick={onConfirm} disabled={isLoading} className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium transition-colors disabled:opacity-60">
                {isLoading ? 'Processing...' : confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
