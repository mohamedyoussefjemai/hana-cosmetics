function Textarea({ handleChange, rows, name, placeholder, defaultValue }) {
  return (
    <div className="input-type">
      <textarea
        rows={rows}
        onChange={handleChange}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="border w-full p-2.5 px-4 py-2 focus:outline-none rounded capitalize"
      />
    </div>
  );
}

export default Textarea;
