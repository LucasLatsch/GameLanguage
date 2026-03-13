// src/components/modal/ConfirmModal.jsx
import React from "react";

const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  loading,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="card bg-base-100 p-6 w-full max-w-sm">
        <h3 className="font-bold text-lg mb-4">{title}</h3>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            className="btn btn-ghost"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className="btn btn-error"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deletando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
