import './styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Layout2 from './components/layout/Layout2';
import { GlobalProvider, useGlobalContext } from './context/GlobalContext';

const App = () => {
  const { user } = useGlobalContext();
  return (
    <GlobalProvider>
      <Layout2 user={user} />
    </GlobalProvider>
  );
};

export default App;
