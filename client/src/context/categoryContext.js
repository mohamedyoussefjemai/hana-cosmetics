import { useContext, useReducer, useEffect, createContext } from 'react';
import { toast } from 'react-toastify';
import {
  getCategories,
  addCategory,
  updateCategory,
  updateCategoryVisibility,
} from '../helpers/categoryHelper.js';
// initial state
const initialState = {
  category: {
    _id: '',
    name: '',
    icon: '',
    visible: null,
  },
  categories: [],
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return {
        ...state,
        category: action.payload,
      };
    case 'RESET_CATEGORY':
      return {
        ...state,
        category: {
          _id: '',
          name: '',
          icon: '',
          visible: null,
        },
      };
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext(initialState);

export const CategoryGlobalProvider = (props) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  const getData = async () => {
    try {
      const { alert, categories } = await getCategories();

      if (categories) {
        dispatch({
          type: 'SET_CATEGORIES',
          payload: categories,
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
    const { alert, category } = await addCategory(cat);
    if (category && alert) {
      dispatch({
        type: 'SET_CATEGORIES',
        payload: [category, ...state.categories],
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
  const updateData = async (id, cat) => {
    const { alert, category } = await updateCategory(id, cat);
    if (category && alert) {
      const newCategories = state.categories.map((data) =>
        data._id !== id ? data : category
      );
      dispatch({ type: 'SET_CATEGORIES', payload: newCategories });
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
  const updateVisibleData = async (id) => {
    const { alert, category } = await updateCategoryVisibility(id);

    if (category && alert) {
      const newCategories = state.categories.map((data) =>
        data._id !== id ? data : category
      );
      dispatch({ type: 'SET_CATEGORIES', payload: newCategories });
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
  const setCategory = async (cat) => {
    dispatch({
      type: 'SET_CATEGORY',
      payload: {
        _id: cat._id,
        name: cat.name,
        icon: cat.icon,
        visible: Boolean(cat.visible),
      },
    });
  };
  const resetCategory = async () => {
    dispatch({
      type: 'RESET_CATEGORY',
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
    setCategory,
    resetCategory,
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
