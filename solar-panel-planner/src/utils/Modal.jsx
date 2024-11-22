function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
  
    return (
      <section className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <article className="bg-white rounded shadow-lg p-6 w-80 text-center">
          <div className="text-gray-800">{children}</div>
          <button
            onClick={onClose}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Okay
          </button>
        </article>
      </section>
    );
  }
  
  export default Modal;