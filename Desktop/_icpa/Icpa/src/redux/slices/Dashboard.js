import { createSlice } from "@reduxjs/toolkit";
import { notificationList, markAsRead } from "../../_utils/api";

const { actions, reducer } = createSlice({
  name: "dataDashboard",
  initialState: {
    active: "Letters",
    isSideBar: true,
    notificationList: [],
    unreadCount: 0,
  },
  reducers: {
    setSidebar: (state, { payload }) => {
      state.active = payload.status;
    },
    showSidebar: (state, { payload }) => {
      state.isSideBar = payload;
    },
    setNotification: (state, { payload }) => {
      state.notificationList = payload.filteredData;
      state.unreadCount = payload.unreadCount;
    },
  },
});

export default reducer;

export const {
  setSidebar,
  setList,
  setListWithOutCopy,
  showSidebar,
  setNotification,
} = actions;

export const setActiveSidebar = (data) => (dispatch) => {
  dispatch(setSidebar({ status: data }));
};

export const getNotificationList = (authToken, callback = () => {}) => (
  dispatch
) => {
  try {
    notificationList(authToken)
      .then((res) => {
        if (res.data.ok) {
          dispatch(setNotification(res.data.result));
        }
      })
      .catch((_error) => {
        callback(true);
      });
  } catch (_error) {}
};
export const setUpreadAndOpen = (id,authToken, callback) => (dispatch) => {
  try {
    markAsRead(id,authToken)
      .then((res) => {
        if (res.data.ok) {
          dispatch(setNotification(res.data.result));
        }
      })
      callback()
      .catch((_error) => {
        callback();
      });
  } catch (_error) {}
};
