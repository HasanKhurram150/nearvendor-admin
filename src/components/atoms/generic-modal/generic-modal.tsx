// components/Modal.tsx
import { CloseIcon, CloseModalIcon } from "@/icons";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}

export const GenericModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  maxWidth = "34.5rem",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#10182875] backdrop-blur-[10px]">
      <div
        className=" bg-white px-[1.5rem] py-[1.875rem] rounded-[1.25rem] shadow-lg w-full relative"
        style={{ background:"linear-gradient(180deg, rgba(191, 0, 255, 0.48) 0%, rgba(0, 89, 216, 0.48) 100%)", maxWidth: maxWidth }}
      >
        <button
          className="absolute top-[1.5rem] right-[1.5rem] close-icon"
          onClick={onClose}
        >
          <CloseModalIcon />
        </button>
        {children}
      </div>
    </div>
  );
};
