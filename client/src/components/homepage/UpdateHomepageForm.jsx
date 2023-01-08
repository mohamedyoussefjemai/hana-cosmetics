import {useState} from "react";
import Form from "../layout/Form.jsx";
import Button from "../layout/Button.jsx";
import Input from "../layout/Input.jsx";

import { useGlobalContext } from '../../context/homepageContext.js';

function UpdateHomepageForm({setShowForm, homepage}) {
  const { updateData } = useGlobalContext();
  const homepageToUpdate = {
    video: homepage.video
  };
  const [video, setVideo] = useState(homepageToUpdate.video);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      video: video,
    };
    updateData(data)  
    setShowForm(false);
  };
  return (
    <Form handler={handleSubmit} title='Update Homepage video link'>
      <Input
        handleChange={(e) => setVideo(e.target.value)}
        name='video'
        defaultValue={homepageToUpdate.video}
        placeholder='name'
        type='text'
      />
      <Button>Update</Button>
    </Form>
  );
}

export default UpdateHomepageForm;
