interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-60 backdrop-blur-sm'>
      <div className='flex items-center justify-center min-h-screen p-4'>
        <div className='relative w-full max-w-4xl p-8 mx-4 bg-white rounded shadow-lg'>
          <button
            className='absolute top-0 right-0 mt-4 mr-4 text-xl font-semibold'
            onClick={onClose}
          >
            &times;
          </button>
          {children}
          <button
            className='absolute bottom-0 right-0 mt-4 mb-2 mr-4 text-xs font-semibold transition-all duration-200 ease-in-out hover:underline'
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
