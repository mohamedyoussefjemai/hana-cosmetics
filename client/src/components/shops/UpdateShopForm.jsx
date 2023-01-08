import {useState} from "react";

import Form from "../layout/Form.jsx";
import Input from "../layout/Input.jsx";
import Button from "../layout/Button.jsx";

import { useGlobalContext } from '../../context/shopContext.js';

function UpdateShopForm({shop, activities, setShowForm}) {
  const { updateData } = useGlobalContext();

  const shopToUpdate = {
    name: shop.name,
    address: shop.address,
    geo_location: shop.geo_location,
    list_shop_items: shop.list_shop_items,
    visible: shop.visible,
    activity: shop.activity,
  };
  const [name, setName] = useState(shopToUpdate.name);
  const [address, setAddress] = useState(shopToUpdate.address);
  const [longitude, setLongitude] = useState(
    shopToUpdate.geo_location.longitude
  );
  const [latitude, setLatitude] = useState(shopToUpdate.geo_location.latitude);
  const [activity, setActivity] = useState(shopToUpdate.activity);
  const [phoneData, setPhoneData] = useState(
    shopToUpdate.list_shop_items.phone.data
  );
  const [phoneLink, setPhoneLink] = useState(
    shopToUpdate.list_shop_items.phone.link
  );
  const [whatsappData, setWhatsappData] = useState(
    shopToUpdate.list_shop_items.whatsapp.data
  );
  const [whatsappLink, setWhatsappLink] = useState(
    shopToUpdate.list_shop_items.whatsapp.link
  );
  const [telegramData, setTelegramData] = useState(
    shopToUpdate.list_shop_items.telegram.data
  );
  const [telegramLink, setTelegramLink] = useState(
    shopToUpdate.list_shop_items.telegram.link
  );
  const [instagramData, setInstagramData] = useState(
    shopToUpdate.list_shop_items.instagram.data
  );
  const [instagramLink, setInstagramLink] = useState(
    shopToUpdate.list_shop_items.instagram.link
  );

  const handleRadioChange = (event) => {
    setActivity(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      address,
      geo_location: {
        longitude,
        latitude,
      },
      activity,
      list_shop_items: {
        phone: {
          title: "phone",
          link: phoneLink,
          data: phoneData,
        },
        whatsapp: {
          title: "whatsapp",
          link: whatsappLink,
          data: whatsappData,
        },
        telegram: {
          title: "telegram",
          link: telegramLink,
          data: telegramData,
        },
        instagram: {
          title: "instagram",
          link: instagramLink,
          data: instagramData,
        },
      },
    };
    updateData(shop._id,data)
    setShowForm(false);
  };
  return (
    <Form handler={handleSubmit} title='update shop'>
      <Input
        handleChange={(e) => setName(e.target.value)}
        name='name'
        placeholder='name'
        type='text'
        defaultValue={shopToUpdate.name}
      />
      <Input
        handleChange={(e) => setAddress(e.target.value)}
        name='address'
        placeholder='address'
        type='text'
        defaultValue={shopToUpdate.address}
      />
      <Input
        handleChange={(e) => setLongitude(e.target.value)}
        name='longitude'
        placeholder='longitude'
        type='text'
        defaultValue={shopToUpdate.geo_location.longitude}
      />
      <Input
        handleChange={(e) => setLatitude(e.target.value)}
        name='latitude'
        placeholder='latitude'
        type='text'
        defaultValue={shopToUpdate.geo_location.latitude}
      />
      <div className='input-type'>
        <div className='flex py-2 items-center'>
          <h1 className='px-4 py-6 font-medium'>Activities:</h1>
          <select
            className='h-fit py-2'
            id='activity'
            name='activity'
            onChange={handleRadioChange}
            defaultValue={shopToUpdate.activity._id}
          >
            {activities.map((obj, index) => (
              <option key={index} value={obj._id}>
                {obj.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='input-type pb-4'>
        <label>Phone</label>
        <div className=' p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
          <Input
            handleChange={(e) => setPhoneData(e.target.value)}
            name='phone'
            placeholder='phone number'
            type='text'
            defaultValue={shopToUpdate.list_shop_items.phone.data}
          />
          <Input
            handleChange={(e) => setPhoneLink(e.target.value)}
            name='phone'
            placeholder='phone url link'
            type='text'
            defaultValue={shopToUpdate.list_shop_items.phone.link}
          />
        </div>
      </div>
      <div className='input-type pb-4'>
        <label>Whatsapp</label>
        <div className=' p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
          <Input
            handleChange={(e) => setWhatsappData(e.target.value)}
            name='whatsapp'
            placeholder='whatsapp number'
            type='text'
            defaultValue={shopToUpdate.list_shop_items.whatsapp.data}
          />
          <Input
            handleChange={(e) => setWhatsappLink(e.target.value)}
            name='whatsapp'
            placeholder='whatsapp url link'
            type='text'
            defaultValue={shopToUpdate.list_shop_items.whatsapp.link}
          />
        </div>
      </div>
      <div className='input-type pb-4'>
        <label>Instagram</label>
        <div className=' p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
          <Input
            handleChange={(e) => setInstagramData(e.target.value)}
            name='instagram'
            placeholder='instagram number'
            type='text'
            defaultValue={shopToUpdate.list_shop_items.instagram.data}
          />
          <Input
            handleChange={(e) => setInstagramLink(e.target.value)}
            name='instagram'
            placeholder='instagram url link'
            type='text'
            defaultValue={shopToUpdate.list_shop_items.instagram.link}
          />
        </div>
      </div>
      <div className='input-type pb-4'>
        <label>Telegram</label>
        <div className=' p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
          <Input
            handleChange={(e) => setTelegramData(e.target.value)}
            name='telegram'
            placeholder='telegram number'
            type='text'
            defaultValue={shopToUpdate.list_shop_items.telegram.data}
          />
          <Input
            handleChange={(e) => setTelegramLink(e.target.value)}
            name='telegram'
            placeholder='telegram url link'
            type='text'
            defaultValue={shopToUpdate.list_shop_items.telegram.link}
          />
        </div>
      </div>
      <Button>Update</Button>
    </Form>
  );
}

export default UpdateShopForm;
