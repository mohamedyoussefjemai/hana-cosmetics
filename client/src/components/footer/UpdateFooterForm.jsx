import {useState} from "react";
import Form from "../layout/Form.jsx";
import Button from "../layout/Button.jsx";
import Input from "../layout/Input.jsx";

import { useGlobalContext } from '../../context/footerContext.js';

function UpdateFooterForm({setShowForm, footer}) {
  const { updateData } = useGlobalContext();

  const footerToUpdate = {
    top_footer_items: footer.top_footer_items,
    list_footer_items: footer.list_footer_items,
  };
  const [facebookData, setFacebookData] = useState(
    footerToUpdate.top_footer_items.facebook.data
  );
  const [facebookLink, setFacebookLink] = useState(
    footerToUpdate.top_footer_items.facebook.link
  );
  const [instagramData, setInstagramData] = useState(
    footerToUpdate.top_footer_items.instagram.data
  );
  const [instagramLink, setInstagramLink] = useState(
    footerToUpdate.top_footer_items.instagram.link
  );
  const [youtubeData, setYoutubeData] = useState(
    footerToUpdate.top_footer_items.youtube.data
  );
  const [youtubeLink, setYoutubeLink] = useState(
    footerToUpdate.top_footer_items.youtube.link
  );
  const [linkedinData, setLinkedinData] = useState(
    footerToUpdate.top_footer_items.linkedin.data
  );
  const [linkedinLink, setLinkedinLink] = useState(
    footerToUpdate.top_footer_items.linkedin.link
  );
  const [twitterData, setTwitterData] = useState(
    footerToUpdate.top_footer_items.twitter.data
  );
  const [twitterLink, setTwitterLink] = useState(
    footerToUpdate.top_footer_items.twitter.link
  );
  const [phoneData, setPhoneData] = useState(
    footerToUpdate.list_footer_items.phone.data
  );
  const [phoneLink, setPhoneLink] = useState(
    footerToUpdate.list_footer_items.phone.link
  );
  const [whatsappData, setWhatsappData] = useState(
    footerToUpdate.list_footer_items.whatsapp.data
  );
  const [whatsappLink, setWhatsappLink] = useState(
    footerToUpdate.list_footer_items.whatsapp.link
  );
  const [telegramData, setTelegramData] = useState(
    footerToUpdate.list_footer_items.telegram.data
  );
  const [telegramLink, setTelegramLink] = useState(
    footerToUpdate.list_footer_items.telegram.link
  );
  const [addressData, setAddressData] = useState(
    footerToUpdate.list_footer_items.address.data
  );
  const [addressLink, setAddressLink] = useState(
    footerToUpdate.list_footer_items.address.link
  );
  const [emailData, setEmailData] = useState(
    footerToUpdate.list_footer_items.email.data
  );
  const [emailLink, setEmailLink] = useState(
    footerToUpdate.list_footer_items.email.link
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      top_footer_items: {
        facebook: {
          link: facebookLink,
          data: facebookData,
        },
        instagram: {
          link: instagramLink,
          data: instagramData,
        },
        youtube: {
          link: youtubeLink,
          data: youtubeData,
        },
        linkedin: {
          link: linkedinLink,
          data: linkedinData,
        },
        twitter: {
          link: twitterLink,
          data: twitterData,
        },
      },
      list_footer_items: {
        phone: {
          link: phoneLink,
          data: phoneData,
        },
        whatsapp: {
          link: whatsappLink,
          data: whatsappData,
        },
        telegram: {
          link: telegramLink,
          data: telegramData,
        },
        address: {
          link: addressLink,
          data: addressData,
        },
        email: {
          link: emailLink,
          data: emailData,
        },
      },
    };
    updateData(data)
    setShowForm(false)
  };
  return (
    <Form handler={handleSubmit} title='Update footer items'>
      <div className='input-type pb-4'>
        <label>Facebook</label>
        <div className=' p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
          <Input
            handleChange={(e) => setFacebookData(e.target.value)}
            name='facebook'
            placeholder='facebook'
            type='text'
            defaultValue={footerToUpdate.top_footer_items.facebook.data}
          />
          <Input
            handleChange={(e) => setFacebookLink(e.target.value)}
            name='phone'
            placeholder='phone url link'
            type='text'
            defaultValue={footerToUpdate.top_footer_items.facebook.link}
          />
        </div>
      </div>
      <div className='input-type pb-4'>
        <label>Instagram</label>
        <div className=' p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
          <Input
            handleChange={(e) => setInstagramData(e.target.value)}
            name='instagram'
            placeholder='instagram'
            type='text'
            defaultValue={footerToUpdate.top_footer_items.instagram.data}
          />
          <Input
            handleChange={(e) => setInstagramLink(e.target.value)}
            name='instagram'
            placeholder='instagram url link'
            type='text'
            defaultValue={footerToUpdate.top_footer_items.instagram.link}
          />
        </div>
      </div>
      <div className='input-type pb-4'>
        <label>Youtube</label>
        <div className=' p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
          <Input
            handleChange={(e) => setYoutubeData(e.target.value)}
            name='youtube'
            placeholder='youtube'
            type='text'
            defaultValue={footerToUpdate.top_footer_items.youtube.data}
          />
          <Input
            handleChange={(e) => setYoutubeLink(e.target.value)}
            name='youtube'
            placeholder='youtube url link'
            type='text'
            defaultValue={footerToUpdate.top_footer_items.youtube.link}
          />
        </div>
      </div>
      <div className='input-type pb-4'>
        <label>Linkedin</label>
        <div className=' p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
          <Input
            handleChange={(e) => setLinkedinData(e.target.value)}
            name='linkedin'
            placeholder='linkedin'
            type='text'
            defaultValue={footerToUpdate.top_footer_items.linkedin.data}
          />
          <Input
            handleChange={(e) => setLinkedinLink(e.target.value)}
            name='linkedin'
            placeholder='linkedin url link'
            type='text'
            defaultValue={footerToUpdate.top_footer_items.linkedin.link}
          />
        </div>
      </div>
      <div className='input-type pb-4'>
        <label>Twitter</label>
        <div className=' p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
          <Input
            handleChange={(e) => setTwitterData(e.target.value)}
            name='twitter'
            placeholder='twitter'
            type='text'
            defaultValue={footerToUpdate.top_footer_items.twitter.data}
          />
          <Input
            handleChange={(e) => setTwitterLink(e.target.value)}
            name='twitter'
            placeholder='twitter url link'
            type='text'
            defaultValue={footerToUpdate.top_footer_items.twitter.link}
          />
        </div>
      </div>
      <div className='input-type pb-4'>
        <label>Phone</label>
        <div className=' p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
          <Input
            handleChange={(e) => setPhoneData(e.target.value)}
            name='phone'
            placeholder='phone'
            type='text'
            defaultValue={footerToUpdate.list_footer_items.phone.data}
          />
          <Input
            handleChange={(e) => setPhoneLink(e.target.value)}
            name='phone'
            placeholder='phone url link'
            type='text'
            defaultValue={footerToUpdate.list_footer_items.phone.link}
          />
        </div>
      </div>
      <div className='input-type pb-4'>
        <label>Whatsapp</label>
        <div className=' p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
          <Input
            handleChange={(e) => setWhatsappData(e.target.value)}
            name='whatsapp'
            placeholder='whatsapp'
            type='text'
            defaultValue={footerToUpdate.list_footer_items.whatsapp.data}
          />
          <Input
            handleChange={(e) => setWhatsappLink(e.target.value)}
            name='whatsapp'
            placeholder='whatsapp url link'
            type='text'
            defaultValue={footerToUpdate.list_footer_items.whatsapp.link}
          />
        </div>
      </div>
      <div className='input-type pb-4'>
        <label>Telegram</label>
        <div className=' p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
          <Input
            handleChange={(e) => setTelegramData(e.target.value)}
            name='telegram'
            placeholder='telegram'
            type='text'
            defaultValue={footerToUpdate.list_footer_items.telegram.data}
          />
          <Input
            handleChange={(e) => setTelegramLink(e.target.value)}
            name='telegram'
            placeholder='telegram url link'
            type='text'
            defaultValue={footerToUpdate.list_footer_items.telegram.link}
          />
        </div>
      </div>
      <div className='input-type pb-4'>
        <label>Address</label>
        <div className=' p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
          <Input
            handleChange={(e) => setAddressData(e.target.value)}
            name='address'
            placeholder='address'
            type='text'
            defaultValue={footerToUpdate.list_footer_items.address.data}
          />
          <Input
            handleChange={(e) => setAddressLink(e.target.value)}
            name='address'
            placeholder='address url link'
            type='text'
            defaultValue={footerToUpdate.list_footer_items.address.link}
          />
        </div>
      </div>
      <div className='input-type pb-4'>
        <label>Email</label>
        <div className=' p-6 pb-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
          <Input
            handleChange={(e) => setEmailData(e.target.value)}
            name='email'
            placeholder='email'
            type='text'
            defaultValue={footerToUpdate.list_footer_items.email.data}
          />
          <Input
            handleChange={(e) => setEmailLink(e.target.value)}
            name='email'
            placeholder='email url link'
            type='text'
            defaultValue={footerToUpdate.list_footer_items.email.link}
          />
        </div>
      </div>
      <Button>Update</Button>
    </Form>
  );
}

export default UpdateFooterForm;
