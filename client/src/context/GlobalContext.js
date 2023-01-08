import React, { useContext, useReducer, useEffect, createContext } from 'react';
import { getCurrentUser, logoutUser, loginUser } from '../helpers/authHelper';

// initial state
const initialState = {
  user: null,
  fetchingUser: true,
};

//reducer
const globalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        fetchingUser: false,
      };
    case 'RESET_USER':
      return {
        ...state,
        user: null,
        fetchingUser: false,
      };
    default:
      return state;
  }
};

//create the context
export const GlobalContext = createContext(initialState);

//provider
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  //use Effect as a hook
  useEffect(() => {
    getCurrent();
  }, []);

  //action: get current user
  const getCurrent = async () => {
    try {
      const { user } = await getCurrentUser();

      if (user) {
        dispatch({ type: 'SET_USER', payload: user });
        return true;
      } else {
        dispatch({ type: 'RESET_USER' });
        return false;
      }
    } catch (err) {
      dispatch({ type: 'RESET_USER' });
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      dispatch({ type: 'RESET_USER' });
    } catch (err) {
      dispatch({ type: 'RESET_USER' });
    }
  };
  const login = async (data) => {
    try {
      const response = await loginUser(data);
      if (response.user) {
        dispatch({ type: 'SET_USER', payload: response.user });
      }
    } catch (err) {
      dispatch({ type: 'RESET_USER' });
    }
  };

  const value = {
    ...state,
    getCurrent,
    logout,
    login,
  };

  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
};
export function useGlobalContext() {
  return useContext(GlobalContext);
}
