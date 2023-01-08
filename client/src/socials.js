import { ToastContainer } from 'react-toastify';

import { useGlobalContext } from './context/socialContext.js';

import Card from './components/layout/Card.jsx';
import Title from './components/layout/Title.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Page({ user }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && navigate) {
      navigate('/');
    }
  }, [user, navigate]);
  const { socials, updateVisibleData } = useGlobalContext();
  const updateVisibilityHandler = async (data) => {
    updateVisibleData(data._id);
  };

  return (
    <>
      <div className="App overflow-y-hidden w-full grid grid-cols-12">
        <Navbar user={user ? user : { role: 'test' }} />
        <div className="grid grid-cols-1 xl:grid-cols-1 col-span-10 w-full">
          <div className=" col-span-2 min-h-[90vh] border-r border-gray-200 items-start justify-start flex flex-col w-full ">
            <div className="w-full justify-start flex flex-col px-12 pt-12 pb-6">
              <Title>Social posts</Title>
              <ToastContainer />
              <div className="container mt-4 mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
                  {socials
                    ? socials.map((obj) => (
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        <a
                          onClick={() => updateVisibilityHandler(obj)}
                          className={`card m-2 cursor-pointer border-2 ${
                            obj.visible ? 'border-green-400' : 'border-red-400'
                          } rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 hover:scale-105 duration-300`}
                          key={obj._id}
                        >
                          <Card
                            name={obj.name}
                            url={`/images/${obj.image}`}
                            link={obj.instagram}
                          />
                        </a>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
