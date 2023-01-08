import {useReducer} from "react";


import Input from "../layout/Input.jsx";
import Form from "../layout/Form.jsx";
import Button from "../layout/Button.jsx";

import { useGlobalContext } from '../../context/activityContext.js';

function AddActivityForm({setShowForm}) {
  const { addData } = useGlobalContext();

  const formReducer = (state, event) => ({
    ...state,
    [event.target.name]: event.target.value,
  });
  const [name, setName] = useReducer(formReducer, {});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name.name,
    };
    addData(data)
    setShowForm(false);
  };
  return (
    <Form handler={handleSubmit} title='add activity'>
      <Input
        handleChange={setName}
        name='name'
        placeholder='name'
        type='text'
      />
      <Button>Add</Button>
    </Form>
  );
}

export default AddActivityForm;
