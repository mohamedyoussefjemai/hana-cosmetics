import {useReducer, useState} from "react";
import FormData from "form-data";

import Form from "../layout/Form.jsx";
import Input from "../layout/Input.jsx";
import Button from "../layout/Button.jsx";
import Textarea from "../layout/Textarea.jsx";

import { useGlobalContext } from '../../context/productContext.js';

function AddProductForm({setShowForm, categories, sub_categories}) {
  const { addData } = useGlobalContext();
  const formReducer = (state, event) => ({
    ...state,
    [event.target.name]: event.target.value,
  });
  const [formData, setFormData] = useReducer(formReducer, {});
  const [selectedImage, setSelectedImage] = useState(null);
  const [categoryId, setCategoryId] = useState(categories[0]._id);
  const [subCategoryId, setSubCategoryId] = useState(sub_categories[0]._id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", selectedImage, "test.png");
    data.append("name", formData.name);
    data.append("description1", formData.description1);
    data.append("description2", formData.description2);
    data.append("price", formData.price);
    data.append("main_category", categoryId);
    data.append("sub_category", subCategoryId);
    data.append("is_new", formData.is_new);
    data.append("instagram_link", formData.instagram_link);
    addData(data);
    setShowForm(false);

  };

  return (
    <Form handler={handleSubmit} title='add product'>
      <Input
        handleChange={setFormData}
        name='name'
        placeholder='name'
        type='text'
      />
      <div className='input-type'>
        <div className='flex py-2 items-center'>
          <h1 className='px-4 py-6 font-medium'>Categories:</h1>
          <select
            className='h-fit py-2'
            id='category'
            name='category'
            onChange={(e) => {
              setCategoryId(e.target.value);
            }}
          >
            {categories.map((obj, index) => (
              <option key={index} value={obj._id}>
                {obj.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='input-type'>
        <div className='flex py-2 items-center'>
          <h1 className='px-4 py-6 font-medium'>Sub Categories:</h1>
          <select
            className='h-fit py-2'
            id='sub_category'
            name='sub_category'
            onChange={(e) => {
              setSubCategoryId(e.target.value);
            }}
          >
            {sub_categories.map((obj, index) => (
              <option key={index} value={obj._id}>
                {obj.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Textarea
        handleChange={setFormData}
        name='description1'
        placeholder='description1'
        rows='3'
      />
      <Textarea
        handleChange={setFormData}
        name='description2'
        placeholder='description2'
        rows='3'
      />
      <Input
        handleChange={setFormData}
        name='price'
        placeholder='price'
        type='number'
      />
      <Input
        handleChange={setFormData}
        name='instagram_link'
        placeholder='instagram_link'
        type='text'
      />
      <div className='input-type py-2'>
        <div className='w-full flex py-2 justify-between'>
          <label className='w-1/2 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-pink hover:text-white'>
            <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
            </svg>
            <span className='mt-2 text-base leading-normal'>Select a file</span>
            <input
              type='file'
              id='small_size'
              name='image'
              className='hidden'
              onChange={(event) => {
                setSelectedImage(event.target.files[0]);
              }}
            />
          </label>
          <div className='w-1/3 flex flex-col justify-center'>
            <div className='form-check'>
              <input
                type='radio'
                onChange={setFormData}
                name='is_new'
                placeholder='name'
                className='form-check-input appearance-none
          rounded-full h-3 w-4 border boder-gray-300 bg-white
           checked:bg-green-500 checked:border-green-500
            focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                value='true'
                id='radioDefault1'
              />
              <label
                htmlFor='radioDefault1'
                className='inline-block text-gray-800 cursor-pointer'
              >
                Is new
              </label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input appearance-none
          rounded-full h-3 w-4 border boder-gray-300 bg-white
           checked:bg-red-500 checked:border-red-500
            focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                type='radio'
                onChange={setFormData}
                name='is_new'
                placeholder='name'
                value='false'
                id='radioDefault2'
              />

              <label
                htmlFor='radioDefault2'
                className='inline-block text-gray-800 cursor-pointer'
              >
                Hidden
              </label>
            </div>
          </div>
        </div>
      </div>
      <Button>Add</Button>
    </Form>
  );
}

export default AddProductForm;
