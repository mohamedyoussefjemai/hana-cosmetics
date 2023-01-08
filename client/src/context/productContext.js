import { useContext, useReducer, useEffect, createContext } from 'react';
import { toast } from 'react-toastify';
import { getCategories } from '../helpers/categoryHelper.js';
import {
  getProducts,
  addProduct,
  updateProduct,
  updateProductVisibility,
} from '../helpers/productHelper.js';
import { getSubCategories } from '../helpers/subCategoryHelper.js';

const initialState = {
  product: {
    _id: '',
    name: '',
    description1: '',
    description2: '',
    image: '',
    price: 0,
    main_category: {},
    sub_category: {},
    is_new: false,
    instagram_link: '',
  },
  products: [],
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
    case 'GET_SUBCATEGORIES':
      return {
        ...state,
        sub_categories: action.payload,
      };
    case 'SET_PRODUCT':
      return {
        ...state,
        product: action.payload,
      };
    case 'RESET_PRODUCT':
      return {
        ...state,
        product: {
          _id: '',
          name: '',
          description1: '',
          description2: '',
          image: '',
          price: 0,
          main_category: {},
          sub_category: {},
          is_new: false,
          instagram_link: '',
        },
      };
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext(initialState);

export const ProductGlobalProvider = (props) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  const getData = async () => {
    try {
      const { categories } = await getCategories();
      const { sub_categories } = await getSubCategories();
      dispatch({
        type: 'GET_CATEGORIES',
        payload: categories,
      });
      dispatch({
        type: 'GET_SUBCATEGORIES',
        payload: sub_categories,
      });
      const { alert, products } = await getProducts();
      if (products) {
        dispatch({
          type: 'SET_PRODUCTS',
          payload: products,
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
    const { alert, product } = await addProduct(cat);
    if (product && alert) {
      dispatch({
        type: 'SET_PRODUCTS',
        payload: [product, ...state.products],
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
    const { alert, product } = await updateProduct(id, cat);
    if (product && alert) {
      const newproducts = state.products.map((data) =>
        data._id !== id ? data : product
      );
      dispatch({ type: 'SET_PRODUCTS', payload: newproducts });
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
    const { alert, product } = await updateProductVisibility(id);
    if (product && alert) {
      const { products } = await getProducts();
      if (products) {
        dispatch({
          type: 'SET_PRODUCTS',
          payload: products,
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
  const setProduct = async (cat) => {
    dispatch({
      type: 'SET_PRODUCT',
      payload: {
        _id: cat._id,
        name: cat.name,
        description1: cat.description1,
        description2: cat.description2,
        image: cat.image,
        price: cat.price,
        main_category: cat.main_category,
        sub_category: cat.sub_category,
        instagram_link: cat.instagram_link,
        is_new: Boolean(cat.is_new),
      },
    });
  };
  const resetProduct = async () => {
    dispatch({
      type: 'RESET_PRODUCT',
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
    setProduct,
    resetProduct,
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
