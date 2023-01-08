function Modal({ isActive, setIsActive, close, children }) {
  if (!isActive) return null;
  return (
    <div
      className={`modal fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm flex justify-center  ${
        isActive ? 'opacity-100' : 'opacity-0'
      } duration-500`}
    >
      <div className="bg-white w-1/3 my-auto flex flex-col rounded-md">
        {close ? (
          <svg
            className="w-5 h-5 cursor-pointer stroke-black text-xl place-self-end mt-2 mr-2 hover:stroke-red-500"
            onClick={() => setIsActive(false)}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : null}
        <div className=" p-4 rounded">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
