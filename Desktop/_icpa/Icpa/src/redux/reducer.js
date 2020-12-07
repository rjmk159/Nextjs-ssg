import { combineReducers } from 'redux';
import dataLogin from './slices/Login';
import dataDashboard from './slices/Dashboard'
import dataLetters from './slices/LatestLetters';
import dataCirculars from './slices/LatestCirculars';
import dataOnlineForms from './slices/OnlineForms'
import dataGrevience from './slices/GrevienceSection'

const rootReducer = combineReducers({
  dataDashboard,
  dataLogin,
  dataLetters,
  dataCirculars,
  dataOnlineForms,
  dataGrevience,
});

export default rootReducer;
