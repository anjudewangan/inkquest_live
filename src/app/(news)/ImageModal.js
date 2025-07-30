"use client";
import { useState, useEffect } from "react";

export default function ImageModal() {
  const [isOpen, setIsOpen] = useState(true); 

  const closeModal = () => setIsOpen(false);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={closeModal}>
          &times;
        </span>
        <img id="popupImage" alt="Popup Image" src="/assets/img/sample.jpg" />
      </div>
    </div>
  );
}
