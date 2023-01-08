import {useReducer, useState} from "react";
import Form from "../layout/Form.jsx";
import Input from "../layout/Input.jsx";
import Button from "../layout/Button.jsx";

import { useGlobalContext } from '../../context/subCategoryContext.js';

function AddSubCategoryForm({setShowForm, categories}) {
  const {  addData } = useGlobalContext();
  const formReducer = (state, event) => ({
    ...state,
    [event.target.name]: event.target.value,
  });
  const [name, setName] = useReducer(formReducer, {});
  const [categoryId, setCategoryId] = useState(categories[0]._id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name.name,
      main_category: categoryId,
      visible: false,
    };
    addData(data);
    setShowForm(false);
  };

  return (
    <Form handler={handleSubmit} title='add subcategory'>
      <Input
        handleChange={setName}
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
      <Button>Add</Button>
    </Form>
  );
}

export default AddSubCategoryForm;
