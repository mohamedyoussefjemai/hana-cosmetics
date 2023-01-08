import { useContext, useReducer, useEffect, createContext } from 'react';
import { toast } from 'react-toastify';
import {
  getHomepages,
  addHomepage,
  updateHomepage,
  uploadImage,
} from '../helpers/homepageHelper.js';
// initial state
const initialState = {
  homepage: {
    _id: '',
    video: '',
    images: [],
  },
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_HOMEPAGE':
      return {
        ...state,
        homepage: action.payload,
      };
    case 'RESET_HOMEPAGE':
      return {
        ...state,
        homepage: {
          _id: '',
          video: '',
          images: [],
        },
      };
    case 'SET_HOMEPAGES':
      return {
        ...state,
        homepage: action.payload,
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext(initialState);

export const HomepageGlobalProvider = (props) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  const getData = async () => {
    try {
      const { alert, homepage } = await getHomepages();
      if (homepage) {
        dispatch({
          type: 'SET_HOMEPAGES',
          payload: homepage,
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
    const { alert, homepage } = await addHomepage(cat);
    if (homepage && alert) {
      dispatch({
        type: 'SET_HOMEPAGES',
        payload: [homepage, ...state.homepage],
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
    const { alert, updatedHomepage } = await updateHomepage(cat);
    if (updatedHomepage && alert) {
      const { homepage } = await getHomepages();
      if (homepage) {
        dispatch({
          type: 'SET_HOMEPAGES',
          payload: homepage,
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
  const updateImage = async (index, data) => {
    const { alert, updatedHomepage } = await uploadImage(index, data);
    if (updatedHomepage && alert) {
      const { alert, homepage } = await getHomepages();
      if (homepage) {
        dispatch({
          type: 'SET_HOMEPAGES',
          payload: homepage,
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

  const setHomepage = async (cat) => {
    dispatch({
      type: 'SET_HOMEPAGE',
      payload: {
        _id: cat._id,
        video: cat.video,
        images: cat.images,
      },
    });
  };
  const resetHomepage = async () => {
    dispatch({
      type: 'RESET_HOMEPAGE',
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
    setHomepage,
    resetHomepage,
    updateImage,
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
