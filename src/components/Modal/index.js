import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";

export default function Modal({ open, children, onClose, position, onClickOutSide, className }) {
  const [isMounted, setIsMounted] = useState(false);
  const modalPosition = position === 'right' ? 'modal-right' : 'modal-center';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return ReactDom.createPortal(
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      onClick={onClickOutSide}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      <div
        className={`${className} relative bg-white p-5 transform transition-transform duration-300 ${open ? 'scale-100' : 'scale-95'
          } ${modalPosition === 'modal-right' ? 'ml-auto' : 'm-auto'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.querySelector('body')
  );
}
