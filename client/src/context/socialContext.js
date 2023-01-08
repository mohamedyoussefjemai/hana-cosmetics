import { useContext, useReducer, useEffect, createContext } from 'react';
import { toast } from 'react-toastify';
import { getSocials, updateSocialVisibility } from '../helpers/socialHelper.js';
// initial state
const initialState = {
  social: {
    _id: '',
    name: '',
    image: '',
    visible: null,
  },
  socials: [],
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SOCIAL':
      return {
        ...state,
        social: action.payload,
      };
    case 'RESET_SOCIAL':
      return {
        ...state,
        social: {
          _id: '',
          name: '',
          image: '',
          visible: null,
        },
      };
    case 'SET_SOCIALS':
      return {
        ...state,
        socials: action.payload,
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext(initialState);

export const SocialGlobalProvider = (props) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const getData = async () => {
    try {
      const { alert, socials } = await getSocials();

      if (socials) {
        dispatch({
          type: 'SET_SOCIALS',
          payload: socials,
        });
      } else {
        toast(alert, {
          theme: 'colored',
          hideProgressBar: true,
          autoClose: 3000,
          type: 'error',
          position: 'bottom-right',
        });
      }
    } catch (err) {
      toast(err.message, {
        theme: 'colored',
        hideProgressBar: true,
        autoClose: 3000,
        type: 'success',
        position: 'bottom-right',
      });
    }
  };
  const updateVisibleData = async (id) => {
    const { alert, social } = await updateSocialVisibility(id);

    if (social && alert) {
      toast(alert, {
        theme: 'colored',
        hideProgressBar: true,
        autoClose: 3000,
        type: 'success',
        position: 'bottom-right',
      });
      const { socials } = await getSocials();
      if (socials) {
        dispatch({
          type: 'SET_SOCIALS',
          payload: socials,
        });
      }
    } else {
      toast(alert, {
        theme: 'colored',
        hideProgressBar: true,
        autoClose: 3000,
        type: 'warning',
        position: 'bottom-right',
      });
    }
  };
  const setSocial = async (sc) => {
    dispatch({
      type: 'SET_SOCIAL',
      payload: {
        _id: sc._id,
        name: sc.name,
        image: sc.image,
        visible: Boolean(sc.visible),
      },
    });
  };
  const resetSocial = async () => {
    dispatch({
      type: 'RESET_SOCIAL',
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const value = {
    ...state,
    getData,
    setSocial,
    resetSocial,
    updateVisibleData,
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
