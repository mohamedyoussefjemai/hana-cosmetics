
function Card({isActive, name, url, link}) {
  return (
    <div
      className={`rounded overflow-hidden shadow-lg ${
        isActive ? "border-green-700" : "border-red-700"
      } max-w-sm rounded overflow-hidden shadow-lg`}
    >
      <div className='relative w-96 h-64'>
        <img
          className='w-full'
          src={url}
          alt={name}
          layout='fill'
          objectFit='cover'
        />
      </div>
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2 text-center'>{name}</div>
        <a href={`${link}`} className='text-gray-700 text-base hover:text-pink'>
          {link}
        </a>
      </div>
    </div>
  );
}

export default Card;
