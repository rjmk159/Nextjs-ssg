import { createSlice } from '@reduxjs/toolkit';
import { raiseGrevience,getGrevience ,setAcknowledged} from '../../_utils/api';

const { actions, reducer } = createSlice({
  name: 'dataGrevience',
  initialState: {
   grevienceList:[]
  },
  reducers: {
    showLoader: (state, { payload }) => {
      state.showLoading = payload.status;
    },
    setList:(state,{ payload }) => {
      state.grevienceList = payload;
    }
  }
});

export default reducer;

export const {
  showLoader, setList
} = actions;

export const addGrevience = (obj,authToken, callback) => (dispatch) => {
  try {
    raiseGrevience(obj, authToken)
      .then((res) => {
        if (res.data.ok) {
          callback(false);
        }
      })
      .catch((_error) => {
        callback(true,(_error.response && _error.response.data ? _error.response.data.message:''));
      });
  } catch (_error) {}
};
export const acknowledged = (id,authToken, callback) => (dispatch) => {
  try {
    setAcknowledged(id, authToken)
      .then((res) => {
        if (res.data.ok) {
          callback(false);
        }
      })
      .catch((_error) => {
        callback(true,(_error.response && _error.response.data ? _error.response.data.message:''));
      });
  } catch (_error) {}
};

export const getGrevienceList = (authToken, callback) => (dispatch) => {
  try {
    getGrevience(authToken)
      .then((res) => {
        console.log(res)
        if (res.data.ok) {
          console.log(res.data.result.multipleDocData)
          dispatch(setList(res.data.result.multipleDocData))
        }
      })
      .catch((_error) => {
        callback(true,(_error.response && _error.response.data ? _error.response.data.message:''));
      });
  } catch (_error) {}
};

const errorHandlerObj = () => {
  let obj = {
    message: 'Something went wrong! please try again or refresh the page',
    type: 'error',
    show: true
  };
  return obj;
};

