import { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from './context/GlobalContext';

import Input from './components/layout/Input';
import Form from './components/layout/Form';
import Button from './components/layout/Button';

const AuthBox = () => {
  const navigate = useNavigate();
  const formReducer = (state, event) => ({
    ...state,
    [event.target.name]: event.target.value,
  });
  const { login, user } = useGlobalContext();
  const [email, setEmail] = useReducer(formReducer, '');
  const [password, setPassword] = useReducer(formReducer, '');

  useEffect(() => {
    if (user && navigate) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { password: password.password, email: email.email };
    login(data);
  };

  return (
    <div className="container mt-4 mx-auto ">
      <div className=" grid h-screen place-items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 px-8 py-8">
        <Form handler={handleSubmit} title="Login">
          <Input
            handleChange={setEmail}
            placeholder="email"
            name="email"
            type="email"
          />
          <Input
            handleChange={setPassword}
            placeholder="password"
            name="password"
            type="password"
          />
          <Button>Login</Button>
        </Form>
      </div>
    </div>
  );
};

export default AuthBox;
