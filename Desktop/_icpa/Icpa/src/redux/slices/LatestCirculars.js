import { createSlice } from '@reduxjs/toolkit';
import { upload ,list, download} from '../../_utils/api';
import store from '../../store';

const { actions, reducer } = createSlice({
  name: 'dataCirculars',
  initialState: {
    filesList:[],
    filesListCopy:[],
    isLoading:false,
    currentPage: 1,
    totalCount : 0,
  },
  reducers: {
    setList: (state, { payload }) => {
      state.filesList = payload;
      state.filesListCopy = payload;
    },
    showLoader: (state, { payload }) => {
      state.isLoading = payload;
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    setTotalCount: (state, { payload }) => {
      state.totalCount = payload;
    },
    setListWithOutCopy: (state, { payload }) => {
      state.filesList = payload;
    },
  }
});

export default reducer;

export const {
  setList,
  setListWithOutCopy,
  showLoader,
  setTotalCount,
  setCurrentPage
} = actions;

export const searchList = (value) =>  (dispatch) => {
  let state = { };
  if(value) {
    let regex = new RegExp(value.toLowerCase());
    var array = state.dataLetters.filesListCopy.filter((item)=>regex.test(item.originalName.toLowerCase()))
    dispatch(setListWithOutCopy( array ));
  } else {
    dispatch(setListWithOutCopy( state.dataLetters.filesListCopy )); 
  }

};

export const uploadFile = (obj, type, authToken, callback) => (dispatch) => {
  try {
    upload(obj,authToken,type)
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

export const listFile = (authToken, type, pageNo, callback) => (dispatch) => {
  dispatch(showLoader(true))
  try {
    list(authToken,type,pageNo)
      .then((res) => {
        if (res.data.ok) {
          dispatch(setList(res.data.result.multipleDocData))
          dispatch(setTotalCount(res.data.result.totalCount))
          dispatch(setCurrentPage(pageNo))
        } else {
          callback(true);
        }
        dispatch(showLoader(false))
      })
      .catch((_error) => {
        callback(true,(_error.response && _error.response.data ? _error.response.data.message:''));
        dispatch(showLoader(false))
      });
  } catch (_error) {}
};

export const downloadFile = (id,authToken, callback) => () => {
  try {
    download(id,authToken)
      .then((res) => {
        if (res.data.ok) {
        } else {
          callback(true);
        }
      })
      .catch((_error) => {
        callback(true,(_error.response && _error.response.data ? _error.response.data.message:''));
      });
  } catch (_error) {}
};
