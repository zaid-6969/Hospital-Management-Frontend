import { Icon, icons } from "./Icon";

const Modal = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-card rounded-2xl w-full max-w-lg">
        
        <div className="flex justify-between p-5 border-b">
          <h2 className="font-semibold">{title}</h2>

          <button onClick={onClose}>
            <Icon d={icons.close} />
          </button>
        </div>

        <div className="p-5">{children}</div>

      </div>
    </div>
  );
};

export default Modal;