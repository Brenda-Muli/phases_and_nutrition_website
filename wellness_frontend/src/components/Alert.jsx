import React from "react";

const Alert = ({ message, onClose }) => {
  return (
    <div
      className="alert-box bg-white text-[#801b40] p-4 rounded-md shadow-md fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
      style={{ boxShadow: "0 4px 6px rgba(178, 30, 75, 0.1)" }}
    >
      <p>{message}</p>
      <button
        onClick={onClose}
        className="mt-2 bg-[#801b40] text-white p-2 rounded-md"
      >
        Close
      </button>
    </div>
  );
};

export default Alert;
