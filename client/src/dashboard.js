import { useGlobalContext } from './context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/navbar/Navbar';

import FrontPage from './components/frontPage/FrontPage';
export default function Page() {
  const { user } = useGlobalContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && navigate) {
      navigate('/');
    }
  }, [user, navigate]);
  return (
    <div className="App overflow-y-hidden w-full grid grid-cols-12">
      <Navbar user={user ? user : { role: 'test' }} />
      <div className="grid grid-cols-1 xl:grid-cols-1 col-span-10 w-full">
        <FrontPage />
      </div>
    </div>
  );
}
