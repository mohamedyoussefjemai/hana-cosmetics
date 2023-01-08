import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { useGlobalContext } from './context/shopContext.js';

import Button from './components/layout/Button.jsx';
import Input from './components/layout/Input.jsx';
import Title from './components/layout/Title.jsx';
import Table from './components/layout/Table.jsx';
import Modal from './components/layout/Modal.jsx';

import AddShopForm from './components/shops/AddShopForm.jsx';
import UpdateShopForm from './components/shops/UpdateShopForm.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import { useNavigate } from 'react-router-dom';

export default function Page({ user }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && navigate) {
      navigate('/');
    }
  }, [user, navigate]);
  const { shops, activities, updateVisibleData } = useGlobalContext();

  const [shop, setShop] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [telegram, setTelegram] = useState('');
  const [instagram, setInstagram] = useState('');

  const updateHandler = (data) => {
    setShop(data);
    setShowForm('update');
  };
  const updateVisibilityHandler = async (data) => {
    updateVisibleData(data._id);
  };

  const setModalData = (data1, data2, data3, data4) => {
    setPhone(data1);
    setWhatsapp(data2);
    setTelegram(data3);
    setInstagram(data4);
    setShowModal(true);
  };
  return (
    <>
      <div className="App overflow-y-hidden w-full grid grid-cols-12">
        <Navbar user={user ? user : { role: 'test' }} />
        <div className="grid grid-cols-1 xl:grid-cols-1 col-span-10 w-full">
          <div className=" col-span-2 min-h-[90vh] border-r border-gray-200 items-start justify-start flex flex-col w-full ">
            <div className="w-full justify-start flex flex-col px-12 pt-12 pb-6">
              <Title>My shops</Title>

              <div className="right flex">
                <div className="w-full flex justify-end py-2">
                  <Button handleClick={() => setShowForm('add')}>+</Button>
                </div>
                <ToastContainer />
              </div>
              <Table
                titles={[
                  'Name',
                  'Address',
                  'geo_location',
                  'Activity',
                  'visible',
                  'Actions',
                ]}
              >
                {shops
                  ? shops.map((obj, index) => (
                      <tr
                        key={index}
                        className="h-16 bg-white text-center hover:bg-gray-100 border"
                      >
                        <td className="text-center cursor-default capitalize">
                          {obj.name}
                        </td>
                        <td className="text-center cursor-default capitalize">
                          {obj.address}
                        </td>
                        <td className="text-center cursor-default capitalize">
                          {`(${obj.geo_location.longitude}, ${obj.geo_location.latitude})`}
                        </td>
                        <td className="text-center cursor-default capitalize">
                          {obj.activity.name}
                        </td>
                        <td>
                          <button
                            className={`text-white px-3 py-1 border rounded-md hover:bg-pink ${
                              obj.visible
                                ? 'bg-green-500 hover:bg-green-600'
                                : 'bg-red-500 hover:bg-red-600'
                            }`}
                            onClick={() => updateVisibilityHandler(obj)}
                          >
                            {obj.visible ? 'Visible' : 'Invisible'}
                          </button>
                        </td>
                        <td className="grid grid-cols-2 my-6 mx-0">
                          <svg
                            onClick={() => updateHandler(obj)}
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 mx-auto  text-black hover:text-pink cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                          <svg
                            onClick={() =>
                              setModalData(
                                obj.list_shop_items.phone.data,
                                obj.list_shop_items.whatsapp.data,
                                obj.list_shop_items.telegram.data,
                                obj.list_shop_items.instagram.data
                              )
                            }
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 mx-auto text-black hover:text-pink cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                            />
                          </svg>
                        </td>
                      </tr>
                    ))
                  : null}
              </Table>
            </div>
          </div>
          <Modal isActive={showForm} setIsActive={setShowForm} close>
            {showForm === 'update' ? (
              <UpdateShopForm
                setShowForm={setShowForm}
                shop={shop}
                activities={activities}
              />
            ) : (
              <AddShopForm setShowForm={setShowForm} activities={activities} />
            )}
          </Modal>
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/* content */}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/* header */}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Contacts</h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/* body */}
                    <div className="relative p-6 flex-auto">
                      <div className="input-type pb-4">
                        <label>Phone</label>
                        <div className=" p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                          <Input
                            name="phone"
                            defaultValue={phone}
                            type="text"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="input-type pb-4">
                        <label>Whatsapp</label>
                        <div className=" p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                          <Input
                            name="whatsapp"
                            defaultValue={whatsapp}
                            type="text"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="input-type pb-4">
                        <label>Telegram</label>
                        <div className=" p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                          <Input
                            name="telegram"
                            defaultValue={telegram}
                            type="text"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="input-type pb-4">
                        <label>Instagram</label>
                        <div className=" p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                          <Input
                            name="instagram"
                            defaultValue={instagram}
                            type="text"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    {/* footer */}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black" />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
