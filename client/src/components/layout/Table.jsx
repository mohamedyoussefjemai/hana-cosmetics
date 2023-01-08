function Table({titles, children}) {
  return (
    <table>
      <thead>
        <tr className='bg-pink'>
          {titles.map((title, idx) => (
            <th key={idx} className='py-2'>
              <span className='text-white'>{title}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

export default Table;
