import { useContext, useReducer, useEffect, createContext } from 'react';
import { toast } from 'react-toastify';
import {
  getShops,
  addShop,
  updateShop,
  updateShopVisibility,
} from '../helpers/shopHelper.js';
import { getActivities } from '../helpers/activityHelper.js';

const initialState = {
  shop: {
    _id: '',
    name: '',
    address: '',
    geo_location: {},
    visible: false,
    activity: {},
    phone: '',
    whatsapp: '',
    telegram: '',
    instagram: '',
  },
  shops: [],
  activities: [],
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case 'GET_ACTIVITIES':
      return {
        ...state,
        activities: action.payload,
      };
    case 'SET_SHOP':
      return {
        ...state,
        shop: action.payload,
      };
    case 'RESET_SHOP':
      return {
        ...state,
        shop: {
          _id: '',
          name: '',
          address: '',
          geo_location: {},
          visible: false,
          activity: {},
          phone: '',
          whatsapp: '',
          telegram: '',
          instagram: '',
        },
      };
    case 'SET_SHOPS':
      return {
        ...state,
        shops: action.payload,
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext(initialState);

export const ShopGlobalProvider = (props) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  const getData = async () => {
    try {
      const { activities } = await getActivities();
      dispatch({
        type: 'GET_ACTIVITIES',
        payload: activities,
      });
      const { alert, shops } = await getShops();
      if (shops) {
        dispatch({
          type: 'SET_SHOPS',
          payload: shops,
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
  const addData = async (data) => {
    const { alert, shop } = await addShop(data);
    if (shop && alert) {
      toast(alert, {
        theme: 'colored',
        hideProgressBar: true,
        autoClose: 3000,
        type: 'success',
        position: 'bottom-right',
      });
      const { shops } = await getShops();
      if (shops) {
        dispatch({
          type: 'SET_SHOPS',
          payload: shops,
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
  const updateData = async (id, cat) => {
    const { alert, shop } = await updateShop(id, cat);
    if (shop && alert) {
      toast(alert, {
        theme: 'colored',
        hideProgressBar: true,
        autoClose: 3000,
        type: 'success',
        position: 'bottom-right',
      });
      const { shops } = await getShops();
      if (shops) {
        dispatch({
          type: 'SET_SHOPS',
          payload: shops,
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
  const updateVisibleData = async (id) => {
    const { alert, shop } = await updateShopVisibility(id);

    if (shop && alert) {
      const newShops = state.shops.map((data) =>
        data._id !== id ? data : shop
      );
      dispatch({ type: 'SET_SHOPS', payload: newShops });
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
  const setShop = async (act) => {
    dispatch({
      type: 'SET_SHOP',
      payload: {
        _id: act._id,
        name: act.name,
        address: act.address,
        geo_location: act.geo_location,
        activity: act.activity,
        name_activity: act.name_activity,
        visible: Boolean(act.visible),
        list_shop_items: act.list_shop_items,
      },
    });
  };
  const resetShop = async () => {
    dispatch({
      type: 'RESET_SHOP',
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
    setShop,
    resetShop,
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
