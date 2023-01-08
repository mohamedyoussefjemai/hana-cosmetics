import {useState} from "react";
import Button from "../layout/Button.jsx";
import Form from "../layout/Form.jsx";
import Input from "../layout/Input.jsx";

import { useGlobalContext } from '../../context/subCategoryContext.js';

function UpdateCategoryForm({setShowForm, categories,sub_category}) {
  const { updateData } = useGlobalContext();

  const subCatToUpdate = {
    name: sub_category.name,
    main_category: sub_category.main_category,
    name_category: sub_category.name_category,
    visible: sub_category.visible,
  };
  const [name, setName] = useState(sub_category.name);
  const [main_category, setMainCategory] = useState(sub_category.main_category);

  const handleRadioChange = (event) => {
    setMainCategory(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      main_category,
    };
    updateData(sub_category._id, data)
    setShowForm(false);
  };
  return (
    <Form handler={handleSubmit} title='update subcategory'>
      <Input
        handleChange={(e) => setName(e.target.value)}
        name='name'
        placeholder='name'
        type='text'
        defaultValue={subCatToUpdate.name}
      />
      <div className='input-type'>
        <div className='flex py-2 items-center'>
          <h1 className='px-4 py-6 font-medium'>Categories:</h1>
          <select
            className='h-fit py-2'
            id='category'
            name='category'
            onChange={handleRadioChange}
            defaultValue={subCatToUpdate.main_category._id}
          >
            {categories.map((obj, index) => (
              <option key={index} value={obj._id}>
                {obj.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button>Update</Button>
    </Form>
  );
}

export default UpdateCategoryForm;
