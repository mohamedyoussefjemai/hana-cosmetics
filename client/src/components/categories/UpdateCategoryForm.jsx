import {useState} from "react";
import FormData from "form-data";
import Form from "../layout/Form.jsx";
import Button from "../layout/Button.jsx";
import Input from "../layout/Input.jsx";

import { useGlobalContext } from '../../context/categoryContext.js';

function UpdateCategoryForm({data, setShowForm}) {
  const { updateData } = useGlobalContext();
  const [selectedimg, setSelectedimg] = useState(null);

  const catToUpdate = {
    name: data.name,
    icon: data.icon,
  };
  const [name, setName] = useState(catToUpdate.name);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    if (selectedimg)
      dataToSend.append("image", selectedimg,`${data._id}.webp`);
    dataToSend.append("name", name);
    dataToSend.append("visible", catToUpdate.visible);
    updateData(data._id,dataToSend)
    setShowForm(false);
  };
  return (
    <Form handler={handleSubmit} title='Update category'>
      <Input
        handleChange={(e) => setName(e.target.value)}
        name='name'
        defaultValue={catToUpdate.name}
        placeholder='name'
        type='text'
      />
      <div className='py-2 flex justify-around'>
        <div className='w-1/3'>
          <h3 className='font-medium text-xl cursor-default'>Old icon</h3>
          <div className='relative h-20 w-20 mx-auto'>
            <img
              className='h-16 w-16'
              src={`/images/${data.icon}`}
              alt='test'
              layout='fill'
              objectFit='cover'
            />
          </div>
        </div>
        <div className='input-type'>
          <div className='flex items-center justify-left bg-grey-lighter'>
            <label className='w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-pink hover:text-white'>
              <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
              </svg>
              <span className='mt-2 text-base leading-normal'>
                Select a file
              </span>
              <input
                type='file'
                id='small_size'
                name='image'
                className='hidden'
                onChange={(event) => {
                  setSelectedimg(event.target.files[0]);
                }}
              />
            </label>
          </div>
        </div>
      </div>
      <Button>Update</Button>
    </Form>
  );
}

export default UpdateCategoryForm;
