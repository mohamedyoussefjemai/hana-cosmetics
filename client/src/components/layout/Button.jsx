function Button({ handleClick, children }) {
  return (
    <button
      onClick={handleClick}
      className="bg-gray-500 text-white px-3 py-1 border rounded-md hover:bg-pink"
    >
      {children}
    </button>
  );
}

export default Button;
