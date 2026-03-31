import { X } from "lucide-react";

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 px-4">
    <div className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-2xl shadow-black/20">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="font-bold text-text">{title}</h2>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-bg border border-border text-text/50 hover:text-text transition"
        >
          <X size={15} />
        </button>
      </div>
      <div className="p-5">{children}</div>
    </div>
  </div>
);

export default Modal;