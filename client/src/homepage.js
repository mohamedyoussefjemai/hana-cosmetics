import FormData from 'form-data';

import { ToastContainer } from 'react-toastify';

import Button from './components/layout/Button.jsx';
import Title from './components/layout/Title.jsx';
import Card from './components/layout/Card.jsx';
import Modal from './components/layout/Modal.jsx';

import UpdateHomepageForm from './components/homepage/UpdateHomepageForm.jsx';

import { useGlobalContext } from './context/homepageContext.js';
import { useEffect, useState } from 'react';
import Navbar from './components/navbar/Navbar.jsx';
import { useNavigate } from 'react-router-dom';
export default function Page({ user }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && navigate) {
      navigate('/');
    }
  }, [user, navigate]);
  const { homepage, updateImage } = useGlobalContext();
  const [showForm, setShowForm] = useState(false);

  const updateImage1 = async (value) => {
    const data = new FormData();
    data.append('image', value, 'homepage1.png');
    updateImage(1, data);
  };
  const updateImage2 = async (value) => {
    const data = new FormData();
    data.append('image', value, 'homepage2.png');
    updateImage(2, data);
  };
  const updateImage3 = async (value) => {
    const data = new FormData();
    data.append('image', value, 'homepage3.png');
    updateImage(3, data);
  };

  return (
    <>
      <div className="App overflow-y-hidden w-full grid grid-cols-12">
        <Navbar user={user ? user : { role: 'test' }} />
        <div className="grid grid-cols-1 xl:grid-cols-1 col-span-10 w-full">
          <div className=" col-span-2 min-h-[90vh] border-r border-gray-200 items-start justify-start flex flex-col w-full ">
            <div className="w-full justify-start flex flex-col px-12 pt-12 pb-6">
              <Title>my Homepage</Title>
              <div className="right flex">
                <div className="w-full flex justify-end py-2">
                  <Button handleClick={() => setShowForm(true)}>Edit</Button>
                </div>
                <ToastContainer />
              </div>
            </div>
            <div className="container mt-4 mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 py-4">
                {homepage && homepage.images[0] ? (
                  <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-pink hover:text-white">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-base leading-normal">
                      Select a file
                    </span>
                    <input
                      type="file"
                      id="small_size"
                      name="image"
                      className="hidden"
                      onChange={(event) => {
                        updateImage1(event.target.files[0]);
                      }}
                    />
                    <Card
                      url={`/images/${homepage.images[0]}`}
                      name="First Banner image"
                    />
                  </label>
                ) : null}
                {homepage && homepage.images[1] ? (
                  <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-pink hover:text-white">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-base leading-normal">
                      Select a file
                    </span>
                    <input
                      type="file"
                      id="small_size"
                      name="image"
                      className="hidden"
                      onChange={(event) => {
                        updateImage2(event.target.files[0]);
                      }}
                    />
                    <Card
                      url={`/images/${homepage.images[1]}`}
                      name="Middle Banner image"
                    />
                  </label>
                ) : null}
                {homepage && homepage.images[2] ? (
                  <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-pink hover:text-white">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-base leading-normal">
                      Select a file
                    </span>
                    <input
                      type="file"
                      id="small_size"
                      name="image"
                      className="hidden"
                      onChange={(event) => {
                        updateImage3(event.target.files[0]);
                      }}
                    />
                    <Card
                      url={`/images/${homepage.images[2]}`}
                      name="Last Banner image"
                    />
                  </label>
                ) : null}
              </div>
            </div>
          </div>
          <Modal isActive={showForm} setIsActive={setShowForm} close>
            <UpdateHomepageForm setShowForm={setShowForm} homepage={homepage} />
          </Modal>
        </div>
      </div>
    </>
  );
}
