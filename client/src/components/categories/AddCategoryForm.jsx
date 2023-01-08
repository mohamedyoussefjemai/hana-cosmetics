import { useReducer, useState} from "react";
import FormData from "form-data";
import Input from "../layout/Input.jsx";
import Form from "../layout/Form.jsx";
import Button from "../layout/Button.jsx";

import { useGlobalContext } from '../../context/categoryContext.js';

function AddCategoryForm({setShowForm}) {
  const { addData } = useGlobalContext();

  const formReducer = (state, event) => ({
    ...state,
    [event.target.name]: event.target.value,
  });
  const [selectedimg, setSelectedimg] = useState(null);

  const [formData, setFormData] = useReducer(formReducer, {});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", selectedimg, "test.png");
    data.append("name", formData.name);
    data.append("visible", formData.visible);
    addData(data);
    setShowForm(false);
  };

  return (
    <Form handler={handleSubmit} title='add category'>
      <Input
        handleChange={setFormData}
        name='name'
        placeholder='name'
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
                setSelectedimg(event.target.files[0]);
              }}
            />
          </label>
          {!selectedimg ? null : (
            <div className='relative h-20 w-20 mx-auto'>
              <img
                src={URL.createObjectURL(selectedimg)}
                alt='test'
                layout='fill'
                objectFit='cover'
              />
            </div>
          )}
        </div>
        <div className='my-2 flex justify-evenly'>
          <button
            className={`w-20  py-2 border rounded-md ${
              formData.visible === "true"
                ? "bg-green-500 text-white"
                : "border-green-500 text-green-500 bg-white hover:bg-green-500 hover:text-white"
            }`}
            onClick={setFormData}
            type='button'
            value='true'
            name='visible'
          >
            Visible
          </button>

          <button
            className={`w-20 py-2 border rounded-md ${
              formData.visible === "false"
                ? "bg-red-500 text-white"
                : "border-red-500 text-red-500 bg-white hover:bg-red-500 hover:text-white"
            }`}
            onClick={setFormData}
            type='button'
            value='false'
            name='visible'
          >
            Invisible
          </button>
        </div>
      </div>
      <Button>Add</Button>
    </Form>
  );
}

export default AddCategoryForm;
