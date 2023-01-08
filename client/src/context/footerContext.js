import { useContext, useReducer, useEffect, createContext } from 'react';
import { toast } from 'react-toastify';
import {
  getFootersByAdmin,
  addFooter,
  updateFooter,
} from '../helpers/footerHelper.js';
// initial state
const initialState = {
  footer: {
    _id: '',
    top_footer_items: {
      facebook: {
        link: '',
        data: '',
      },
      instagram: {
        link: '',
        data: '',
      },
      youtube: {
        link: '',
        data: '',
      },
      linkedin: {
        link: '',
        data: '',
      },
      twitter: {
        link: '',
        data: '',
      },
    },
    list_footer_items: {
      phone: {
        link: '',
        data: '',
      },
      whatsapp: {
        link: '',
        data: '',
      },
      telegram: {
        link: '',
        data: '',
      },
      address: {
        link: '',
        data: '',
      },
      email: {
        link: '',
        data: '',
      },
    },
  },
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FOOTER':
      return {
        ...state,
        footer: action.payload,
      };
    case 'RESET_FOOTER':
      return {
        ...state,
        footer: {
          _id: '',
          top_footer_items: {},
          list_footer_items: {},
        },
      };
    case 'SET_FOOTERS':
      return {
        ...state,
        footer: action.payload,
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext(initialState);

export const FooterGlobalProvider = (props) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const getData = async () => {
    try {
      const { alert, footer } = await getFootersByAdmin();
      if (footer) {
        dispatch({
          type: 'SET_FOOTERS',
          payload: footer,
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
  const addData = async (cat) => {
    const { alert, footer } = await addFooter(cat);
    if (footer && alert) {
      dispatch({
        type: 'SET_FOOTERS',
        payload: [footer, ...state.footer],
      });
      toast(alert, {
        theme: 'colored',
        hideProgressBar: true,
        autoClose: 3000,
        type: 'success',
        position: 'bottom-right',
      });
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
  const updateData = async (cat) => {
    const { alert, updatedFooter } = await updateFooter(cat);
    if (updatedFooter && alert) {
      const { footer } = await getFootersByAdmin();
      if (footer) {
        dispatch({
          type: 'SET_FOOTERS',
          payload: footer,
        });
      }
      toast(alert, {
        theme: 'colored',
        hideProgressBar: true,
        autoClose: 3000,
        type: 'success',
        position: 'bottom-right',
      });
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

  const setFooter = async (cat) => {
    dispatch({
      type: 'SET_FOOTER',
      payload: {
        _id: cat._id,
        top_footer_items: cat.top_footer_items,
        list_footer_items: cat.list_footer_items,
      },
    });
  };
  const resetFooter = async () => {
    dispatch({
      type: 'RESET_FOOTER',
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const value = {
    ...state,
    getData,
    addData,
    updateData,
    setFooter,
    resetFooter,
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
