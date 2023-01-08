import {useReducer, useState} from "react";

import Form from "../layout/Form.jsx";
import Input from "../layout/Input.jsx";
import Button from "../layout/Button.jsx";

import { useGlobalContext } from '../../context/shopContext.js';

function AddShopForm({setShowForm, activities}) {

  const { addData } = useGlobalContext();

  const formReducer = (state, event) => ({
    ...state,
    [event.target.name]: event.target.value,
  });
  const [name, setName] = useReducer(formReducer, {});
  const [address, setAddress] = useReducer(formReducer, {});
  const [longitude, setLongitude] = useReducer(formReducer, {});
  const [latitude, setLatitude] = useReducer(formReducer, {});
  const [visible, setVisible] = useReducer(formReducer, {});
  const [activityId, setActivityId] = useState(activities[0]._id);

  const [phoneData, setPhoneData] = useReducer(formReducer, "");
  const [phoneLink, setPhoneLink] = useReducer(formReducer, "");

  const [whatsappData, setWhatsappData] = useReducer(formReducer, "");
  const [whatsappLink, setWhatsappLink] = useReducer(formReducer, "");

  const [telegramData, setTelegramData] = useReducer(formReducer, "");
  const [telegramLink, setTelegramLink] = useReducer(formReducer, "");

  const [instagramData, setInstagramData] = useReducer(formReducer, "");
  const [instagramLink, setInstagramLink] = useReducer(formReducer, "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name.name,
      address: address.address,
      geo_location: {
        longitude: longitude.longitude,
        latitude: latitude.latitude,
      },
      visible: visible.visible === "true",
      activity: activityId,
      list_shop_items: {
        phone: {
          title: "phone",
          link: phoneLink.phone,
          data: phoneData.phone,
        },
        whatsapp: {
          title: "whatsapp",
          link: whatsappLink.whatsapp,
          data: whatsappData.whatsapp,
        },
        telegram: {
          title: "telegram",
          link: telegramLink.telegram,
          data: telegramData.telegram,
        },
        instagram: {
          title: "instagram",
          link: instagramLink.instagram,
          data: instagramData.instagram,
        },
      },
    };
    addData(data)
    setShowForm(false);
  };
  return (
    <Form handler={handleSubmit} title='add shop'>
      <Input
        handleChange={setName}
        name='name'
        placeholder='name'
        type='text'
      />
      <Input
        handleChange={setAddress}
        name='address'
        placeholder='address'
        type='text'
      />
      <Input
        handleChange={setLongitude}
        name='longitude'
        placeholder='longitude'
        type='text'
      />
      <Input
        handleChange={setLatitude}
        name='latitude'
        placeholder='latitude'
        type='text'
      />
      <div className='input-type'>
        <div className='flex py-2 items-center'>
          <h1 className='px-4 py-6 font-medium'>Activities:</h1>
          <select
            className='h-fit py-2'
            id='activity'
            name='activity'
            onChange={(e) => {
              setActivityId(e.target.value);
            }}
          >
            {activities.map((obj, index) => (
              <option key={index} value={obj._id}>
                {obj.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='input-type py-2'>
        <div className='w-1/2 mx-auto flex flex-col justify-center'>
          <div className='my-2 flex justify-evenly'>
            <button
              className={`w-20  py-2 border rounded-md ${
                visible.visible === "true"
                  ? "bg-green-500 text-white"
                  : "border-green-500 text-green-500 bg-white hover:bg-green-500 hover:text-white"
              }`}
              onClick={setVisible}
              type='button'
              value='true'
              name='visible'
            >
              Visible
            </button>

            <button
              className={`w-20 py-2 border rounded-md ${
                visible.visible === "false"
                  ? "bg-red-500 text-white"
                  : "border-red-500 text-red-500 bg-white hover:bg-red-500 hover:text-white"
              }`}
              onClick={setVisible}
              type='button'
              value='false'
              name='visible'
            >
              Invisible
            </button>
          </div>
        </div>
      </div>
      <div className='input-type pb-4'>
        <label>Phone</label>
        <div className=' p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
          <Input
            handleChange={setPhoneData}
            name='phone'
            placeholder='phone number'
            type='text'
          />
          <Input
            handleChange={setPhoneLink}
            name='phone'
            placeholder='phone url link'
            type='text'
          />
        </div>
      </div>
      <div className='input-type pb-4'>
        <label>Whatsapp</label>
        <div className=' p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
          <Input
            handleChange={setWhatsappData}
            name='whatsapp'
            placeholder='whatsapp number'
            type='text'
          />
          <Input
            handleChange={setWhatsappLink}
            name='whatsapp'
            placeholder='whatsapp url link'
            type='text'
          />
        </div>
      </div>
      <div className='input-type pb-4'>
        <label>Instagram</label>
        <div className=' p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
          <Input
            handleChange={setInstagramData}
            name='instagram'
            placeholder='instagram number'
            type='text'
          />
          <Input
            handleChange={setInstagramLink}
            name='instagram'
            placeholder='instagram url link'
            type='text'
          />
        </div>
      </div>
      <div className='input-type pb-4'>
        <label>Telegram</label>
        <div className=' p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
          <Input
            handleChange={setTelegramData}
            name='telegram'
            placeholder='telegram number'
            type='text'
          />
          <Input
            handleChange={setTelegramLink}
            name='telegram'
            placeholder='telegram url link'
            type='text'
          />
        </div>
      </div>
      <Button>Add</Button>
    </Form>
  );
}

export default AddShopForm;
