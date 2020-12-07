import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "../../_utils/api";

const { actions, reducer } = createSlice({
  name: "dataLogin",
  initialState: {
    token: "",
    isLoading: false,
  },
  reducers: {
    setToken: (state, { payload }) => {
      console.log(payload)
      state.token = payload.token;
    },
    setLoader: (state, { payload }) => {
      state.isLoading = payload.status;
    },
  },
});
export default reducer;
export const { setToken, setLoader } = actions;

export const checkLogin = (email, password, callback) => (dispatch) => {
  console.log(checkLogin,email,password)
  try {
    login(email, password)
      .then((res) => {
        console.log('*******',res)
        if (res.data.ok) {
          dispatch(setToken({ token: res.data.result }));
          callback(false,res.data.result);
        }
      })
      .catch((_error) => {
        callback(true,(_error.response && _error.response.data ? _error.response.data.message:''));
      });
  } catch (_error) {}
};

export const registerUser = (obj, callback) => (dispatch) => {
  try {
    register(obj)
      .then((res) => {
        if (res.data.ok) {
          dispatch(setLoader(false));
          callback(false);
        }
      })
      .catch((_error) => {
        callback(true,(_error.response && _error.response.data ? _error.response.data.message:''));
      });
  } catch (_error) {}
};

export const logout = () =>  (dispatch) => {
  localStorage.removeItem('icpa_token')
  dispatch(setToken({ token: null }));
};