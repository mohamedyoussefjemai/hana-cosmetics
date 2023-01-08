import {useState} from "react";
import FormData from "form-data";

import Form from "../layout/Form.jsx";
import Input from "../layout/Input.jsx";
import Button from "../layout/Button.jsx";
import Textarea from "../layout/Textarea.jsx";

import { useGlobalContext } from '../../context/productContext.js';

function UpdateProductForm({setShowForm, product, categories, sub_categories}) {
  const { updateData } = useGlobalContext();

  const [selectedImage, setSelectedImage] = useState(null);

  const productToUpdate = {
    name: product.name,
    image: product.image,
    description1: product.description1,
    description2: product.description2,
    price: product.price,
    main_category: product.main_category._id,
    sub_category: product.sub_category._id,
    is_new: product.is_new,
    instagram_link: product.instagram_link,
    name_category: product.name_category,
    name_sub_category: product.name_sub_category,
  };
  const [name, setName] = useState(product.name);
  const [description1, setDescription1] = useState(product.description1);
  const [description2, setDescription2] = useState(product.description2);
  const [price, setPrice] = useState(product.price);
  const [main_category, setMainCategory] = useState(product.main_category._id);
  const [sub_category, setSubCategory] = useState(product.sub_category._id);
  const [instagram_link, setInsagramLink] = useState(product.instagram_link);

  const handleRadioChange = (event) => {
    setMainCategory(event.target.value);
  };
  const handleRadioChange2 = (event) => {
    setSubCategory(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    if (selectedImage) {
      data.append("image", selectedImage, "test.png");
    }
    data.append("name", name);
    data.append("description1", description1);
    data.append("description2", description2);
    data.append("price", price);
    data.append("main_category", main_category);
    data.append("sub_category", sub_category);
    data.append("is_new", productToUpdate.is_new);
    data.append("instagram_link", instagram_link);
    updateData(product._id,data)
    setShowForm(false);
  };
  return (
    <Form handler={handleSubmit} title='update product'>
      <Input
        handleChange={(e) => setName(e.target.value)}
        name='name'
        placeholder='name'
        type='text'
        defaultValue={productToUpdate.name}
      />
      <div className='input-type'>
        <div className='flex py-2 items-center'>
          <h1 className='px-4 py-6 font-medium'>Categories:</h1>
          <select
            className='h-fit py-2'
            id='category'
            name='category'
            onChange={handleRadioChange}
            defaultValue={productToUpdate.main_category}
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
            onChange={handleRadioChange2}
            defaultValue={productToUpdate.sub_category}
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
        handleChange={(e) => setDescription1(e.target.value)}
        name='description1'
        placeholder='description1'
        rows='3'
        defaultValue={productToUpdate.description1}
      />
      <Textarea
        handleChange={(e) => setDescription2(e.target.value)}
        name='description2'
        placeholder='description2'
        rows='3'
        defaultValue={productToUpdate.description2}
      />
      <Input
        handleChange={(e) => setPrice(e.target.value)}
        name='price'
        placeholder='price'
        type='number'
        defaultValue={productToUpdate.price}
      />
      <Input
        handleChange={(e) => setInsagramLink(e.target.value)}
        name='instagram_link'
        placeholder='instagram link'
        type='text'
        defaultValue={productToUpdate.instagram_link}
      />
      <div className='py-2 flex justify-around'>
        <div className='w-1/3'>
          <h3 className='font-medium text-xl cursor-default'>Old image</h3>
          <div className='relative h-16 w-16'>
            <img
              src={`/images/${productToUpdate.image}`}
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
                  setSelectedImage(event.target.files[0]);
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

export default UpdateProductForm;
