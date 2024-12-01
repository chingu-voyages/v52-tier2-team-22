function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
  
    return (
      <section className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <article className="bg-white mx-4 md:w-[40rem] rounded shadow-lg p-6 text-center">
          <div className="text-gray-800">{children}</div>
          <button
            onClick={onClose}
            className="mt-4 bg-primaryGreen transition hover:bg-secondaryGreen text-white font-bold py-2 px-4 rounded"
          >
            Got it
          </button>
        </article>
      </section>
    );
  }
  
  export default Modal;