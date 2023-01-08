import { useContext, useReducer, useEffect, createContext } from 'react';
import { toast } from 'react-toastify';
import {
  getSubCategories,
  addSubCategory,
  updateSubCategory,
  updateSubCategoryVisibility,
} from '../helpers/subCategoryHelper.js';
import { getCategories } from '../helpers/categoryHelper.js';
// initial state
const initialState = {
  sub_category: {
    _id: '',
    name: '',
    main_category: null,
    visible: null,
  },
  categories: [],
  sub_categories: [],
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case 'GET_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
      };
    case 'SET_SUBCATEGORY':
      return {
        ...state,
        sub_category: action.payload,
      };
    case 'RESET_SUBCATEGORY':
      return {
        ...state,
        sub_category: {
          _id: '',
          name: '',
          main_category: null,
          visible: null,
        },
      };
    case 'SET_SUBCATEGORIES':
      return {
        ...state,
        sub_categories: action.payload,
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext(initialState);

export const SubCategoryGlobalProvider = (props) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  const getData = async () => {
    try {
      const { alert, sub_categories } = await getSubCategories();
      const { categories } = await getCategories();
      if (categories) {
        dispatch({
          type: 'GET_CATEGORIES',
          payload: categories,
        });
      }
      if (sub_categories) {
        dispatch({
          type: 'SET_SUBCATEGORIES',
          payload: sub_categories,
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
    const { alert, sub_category } = await addSubCategory(cat);
    if (sub_category && alert) {
      dispatch({
        type: 'SET_SUBCATEGORIES',
        payload: [sub_category, ...state.sub_categories],
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
    const { alert, sub_category } = await updateSubCategory(id, cat);
    if (sub_category && alert) {
      const newSubCategories = state.sub_categories.map((data) =>
        data._id !== id ? data : sub_category
      );
      dispatch({ type: 'SET_SUBCATEGORIES', payload: newSubCategories });
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
    const { alert, sub_category } = await updateSubCategoryVisibility(id);

    if (sub_category && alert) {
      const newSubCategories = state.sub_categories.map((data) =>
        data._id !== id ? data : sub_category
      );
      dispatch({ type: 'SET_SUBCATEGORIES', payload: newSubCategories });
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
  const setSubCategory = async (cat) => {
    dispatch({
      type: 'SET_SUBCATEGORY',
      payload: {
        _id: cat._id,
        name: cat.name,
        main_category: cat.main_category,
        name_category: cat.name_category,
        visible: Boolean(cat.visible),
      },
    });
  };
  const resetSubCategory = async () => {
    dispatch({
      type: 'RESET_SUBCATEGORY',
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
    setSubCategory,
    resetSubCategory,
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
