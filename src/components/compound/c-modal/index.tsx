"use client";
import { EDataTestId } from "@src/types/common";
import { EMode } from "@src/types/compound/c-icon-with-handler-button-container";
import { ICModal } from "@src/types/compound/c-modal";
import { useRef, useEffect } from "react";

export const CModal = ({ children, title, setIsOpen, isOpen }: ICModal) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // this is handling the outside click disappear function
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          data-testid={EDataTestId.CModal}
        >
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={closeModal}
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div
              ref={modalRef}
              className="bg-white rounded-lg overflow-hidden transform transition-all max-w-lg w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <div className="p-4">
                <h2 id="modal-title" className="text-xl font-bold mb-4 ">
                  {title}
                </h2>
                <div className={`text-left`}>{children}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
