import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useGlobalContext } from './context/subCategoryContext';

import Button from './components/layout/Button.jsx';
import Title from './components/layout/Title.jsx';
import Table from './components/layout/Table.jsx';
import Modal from './components/layout/Modal.jsx';
import AddSubCategoryForm from './components/sub-categories/AddSubCategoryForm.jsx';
import UpdateSubCategoryForm from './components/sub-categories/UpdateSubCategoryForm.jsx';
import Navbar from './components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Page({ user }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && navigate) {
      navigate('/');
    }
  }, [user, navigate]);
  const { categories, sub_categories, updateVisibleData } = useGlobalContext();
  const [sub, setSub] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const updateHandler = (data) => {
    setSub(data);
    setShowForm('update');
  };
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
              <Title>My subcategories</Title>

              <div className="right flex">
                <div className="w-full flex justify-end py-2">
                  <Button handleClick={() => setShowForm('add')}>+</Button>
                </div>
                <ToastContainer />
              </div>
              <Table
                titles={['Name', 'Main category', 'Visibility', 'Actions']}
              >
                {sub_categories
                  ? sub_categories.map((obj, index) => (
                      <tr
                        key={index}
                        className="h-16 bg-white text-center hover:bg-gray-100 border"
                      >
                        <td className="text-center cursor-default capitalize">
                          {obj.name}
                        </td>
                        <td className="text-center cursor-default capitalize">
                          {obj.main_category.name}
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
                        <td>
                          <svg
                            onClick={() => updateHandler(obj)}
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 mx-auto text-black hover:text-pink cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
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
              <UpdateSubCategoryForm
                setShowForm={setShowForm}
                categories={categories}
                sub_category={sub}
              />
            ) : (
              <AddSubCategoryForm
                setShowForm={setShowForm}
                categories={categories}
              />
            )}
          </Modal>
        </div>
      </div>
    </>
  );
}
