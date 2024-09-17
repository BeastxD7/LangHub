import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 bg-gradient-to-l from-fuchsia-500 to-indigo-600 text-white p-3 text-center z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {message}
      <button
        onClick={onClose}
        className="absolute top-0 right-0 p-2 text-white"
        aria-label="Close notification"
      >
        <X size={20} />
      </button>
    </motion.div>
  );
};

export default Notification;
