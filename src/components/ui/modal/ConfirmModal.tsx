"use client";
import React from "react";
import { Modal } from "./index";
import Button from "../button/Button";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = true,
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
      <div className="p-10">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            loading={isLoading}
            variant="primary" // Let's use standard primary for now, maybe we can add a custom destructive style if supported
            className={
              isDestructive
                ? "bg-red-500 hover:bg-red-600 text-white border-red-500"
                : ""
            }
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
