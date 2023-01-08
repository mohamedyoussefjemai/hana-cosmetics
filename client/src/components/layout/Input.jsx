function Input({
  handleChange,
  type,
  name,
  placeholder,
  defaultValue,
  disabled,
}) {
  return (
    <div className="input-type my-2">
      <input
        type={type}
        onChange={handleChange}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        className="border w-full px-4 py-2 focus:outline-none rounded capitalize"
      />
    </div>
  );
}

export default Input;
