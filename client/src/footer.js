import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useGlobalContext } from './context/footerContext.js';

import Button from './components/layout/Button.jsx';
import Title from './components/layout/Title.jsx';
import SubTitle from './components/layout/SubTitle.jsx';
import Input from './components/layout/Input.jsx';
import Modal from './components/layout/Modal.jsx';

import UpdateFooterForm from './components/footer/UpdateFooterForm.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import { useNavigate } from 'react-router-dom';

export default function Page({ user }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && navigate) {
      navigate('/');
    }
  }, [user, navigate]);
  const { footer } = useGlobalContext();
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <div className="App overflow-y-hidden w-full grid grid-cols-12">
        <Navbar user={user ? user : { role: 'test' }} />
        <div className="grid grid-cols-1 xl:grid-cols-1 col-span-10 w-full">
          <div className=" col-span-2 min-h-[90vh] border-r border-gray-200 items-start justify-start flex flex-col w-full ">
            <div className="w-full justify-start flex flex-col px-12 pt-12 pb-6">
              <Title>my Footer</Title>

              <SubTitle>Top footer items</SubTitle>
              <div className="right flex">
                <div className="w-full flex justify-end py-2">
                  <Button handleClick={() => setShowForm(true)}>
                    Edit Footer
                  </Button>
                </div>
                <ToastContainer />
              </div>
              {footer.top_footer_items ? (
                <div className="container mt-4 mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
                    <div className="input-type pb-4">
                      <div className=" p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                        <label className="text-white capitalize">
                          facebook
                        </label>
                        <Input
                          name="facebook"
                          defaultValue={footer.top_footer_items.facebook.data.toString()}
                          type="text"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="input-type pb-4">
                      <div className=" p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                        <label className="text-white capitalize">
                          instagram
                        </label>
                        <Input
                          name="instagram"
                          defaultValue={footer.top_footer_items.instagram.data}
                          type="text"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="input-type pb-4">
                      <div className=" p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                        <label className="text-white capitalize">youtube</label>
                        <Input
                          name="youtube"
                          defaultValue={footer.top_footer_items.youtube.data}
                          type="text"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="input-type pb-4">
                      <div className=" p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                        <label className="text-white capitalize">
                          linkedin
                        </label>
                        <Input
                          name="linkedin"
                          defaultValue={footer.top_footer_items.linkedin.data}
                          type="text"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="input-type pb-4">
                      <div className=" p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                        <label className="text-white capitalize">twitter</label>
                        <Input
                          name="twitter"
                          defaultValue={footer.top_footer_items.twitter.data}
                          type="text"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              <SubTitle>List footer items</SubTitle>
              {footer.list_footer_items ? (
                <div className="container mt-4 mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
                    <div className="input-type pb-4">
                      <div className=" p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                        <label className="text-white capitalize">phone</label>
                        <Input
                          name="phone"
                          defaultValue={footer.list_footer_items.phone.data}
                          type="text"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="input-type pb-4">
                      <div className=" p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                        <label className="text-white capitalize">
                          whatsapp
                        </label>
                        <Input
                          name="whatsapp"
                          defaultValue={footer.list_footer_items.whatsapp.data}
                          type="text"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="input-type pb-4">
                      <div className=" p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                        <label className="text-white capitalize">
                          telegram
                        </label>
                        <Input
                          name="telegram"
                          defaultValue={footer.list_footer_items.telegram.data}
                          type="text"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="input-type pb-4">
                      <div className=" p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                        <label className="text-white capitalize">address</label>
                        <Input
                          name="address"
                          defaultValue={footer.list_footer_items.address.data}
                          type="text"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="input-type pb-4">
                      <div className=" p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                        <label className="text-white capitalize">email</label>
                        <Input
                          name="email"
                          defaultValue={footer.list_footer_items.email.data}
                          type="text"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <Modal isActive={showForm} setIsActive={setShowForm} close>
            <UpdateFooterForm setShowForm={setShowForm} footer={footer} />
          </Modal>
        </div>
      </div>
    </>
  );
}
