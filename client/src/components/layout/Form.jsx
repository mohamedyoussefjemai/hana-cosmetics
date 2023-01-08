function Form({ handler, title, children }) {
  return (
    <form onSubmit={handler}>
      <label className="text-xl font-semibold uppercase cursor-default">
        {title}
      </label>
      <div className="flex flex-col mt-4">{children}</div>
    </form>
  );
}

export default Form;
