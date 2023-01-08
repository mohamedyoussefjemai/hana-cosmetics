import { useContext, useReducer, useEffect, createContext } from 'react';
import { toast } from 'react-toastify';
import {
  getActivities,
  addActivity,
  updateActivity,
} from '../helpers/activityHelper.js';
// initial state
const initialState = {
  activity: {
    _id: '',
    name: '',
  },
  activities: [],
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVITY':
      return {
        ...state,
        activity: action.payload,
      };
    case 'RESET_ACTIVITY':
      return {
        ...state,
        activity: {
          _id: '',
          name: '',
        },
      };
    case 'SET_ACTIVITIES':
      return {
        ...state,
        activities: action.payload,
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext(initialState);

export const ActivityGlobalProvider = (props) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const getData = async () => {
    try {
      const { alert, activities } = await getActivities();

      if (activities) {
        dispatch({
          type: 'SET_ACTIVITIES',
          payload: activities,
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
    const { alert, activity } = await addActivity(data);
    if (activity && alert) {
      dispatch({
        type: 'SET_ACTIVITIES',
        payload: [activity, ...state.activities],
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
    const { alert, activity } = await updateActivity(id, cat);
    if (activity && alert) {
      const newActivities = state.activities.map((data) =>
        data._id !== id ? data : activity
      );
      dispatch({ type: 'SET_ACTIVITIES', payload: newActivities });
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
  const setActivity = async (act) => {
    dispatch({
      type: 'SET_ACTIVITY',
      payload: {
        _id: act._id,
        name: act.name,
      },
    });
  };
  const resetActivity = async () => {
    dispatch({
      type: 'RESET_ACTIVITY',
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
    setActivity,
    resetActivity,
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
