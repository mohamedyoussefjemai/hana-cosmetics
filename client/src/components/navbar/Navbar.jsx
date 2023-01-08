
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';

import navLinks from "./utils/NavDB.js";
export default function Navbar({user}) {
  const { logout } = useGlobalContext();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    
    navigate('/dashboard');
    logout()
  };

  return (
    <nav className='min-h-screen col-span-2 border-r border-gray-200 w-[80px] xl:w-[250px] flex flex-col py-5'>
      <div className='items-center w-full flex justify-center cursor-default'>
        <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
          <path d='M13 7H7v6h6V7z' />
          <path
            fillRule='evenodd'
            d='M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z'
            clipRule='evenodd'
          />
        </svg>
        <h1 className='text-3xl text-gray-900 font-medium pl-2'> DevSite </h1>
      </div>
      <div className='my-20 flex-grow'>
        {navLinks.map((link) =>
          
         <a className= "" href={`${link.path}`} key={link.id.toString()}>
          {(link.role.includes(user.role)) ?  (
            <div className='w-full flex justify-center cursor-pointer group hover:boder-gray-900 border-l-4 border-transparent py-2 my-2 hover:bg-pink'>
              <div className='w-2/3 flex justify-start'>
                <span className='group-hover:text-white'>{link.icon}</span>
                <h1 className='text-gray-600 xl:flex hidden group-hover:text-white pl-4 capitalize whitespace-nowrap'>
                  {link.title}
                </h1>
              </div>
            </div>) : <></>}
          </a>
         
        )}
      </div>

      <div
        onClick={() => {
          handleSubmit()
        }}
        className='w-fit flex self-center items-end cursor-pointer hover:stroke-red-500 hover:text-red-500'
      >
        <h3 className='px-4'>Logout</h3>

        <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
            clipRule='evenodd'
          />
        </svg>
      </div>
    </nav>
  );
}