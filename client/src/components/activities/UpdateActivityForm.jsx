import {useState} from "react";
import Form from "../layout/Form.jsx";
import Button from "../layout/Button.jsx";
import Input from "../layout/Input.jsx";

import { useGlobalContext } from '../../context/activityContext.js';

function UpdateActivityForm({data, setShowForm}) {
  const { updateData } = useGlobalContext();

  const [name, setName] = useState(data.name);

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateData(data._id,{name})
    setShowForm(false);
  };
  return (
    <Form handler={handleSubmit} title='Update activity'>
      <Input
        handleChange={(e) => setName(e.target.value)}
        name='name'
        defaultValue={name}
        placeholder='name'
        type='text'
      />
      <Button>Update</Button>
    </Form>
  );
}

export default UpdateActivityForm;
