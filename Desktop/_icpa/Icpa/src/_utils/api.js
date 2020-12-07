import axios from "axios";
import { listCount } from '../_const/const'
// export const BASE_URL = "http://localhost:5555";
export const BASE_URL = "http://142.93.220.155:5555/";
export const authToken = () => {
  return localStorage.getItem('icpa_toke');
}

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/authorize/login`, { email, password })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const register = (obj) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/authorize/register`, { ...obj })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const upload = (data, authToken, type) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/file/upload?type=${type}`, data , { headers: {
        Authorization: authToken
      }})
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const list = (authToken,type,pageNo = 1) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/file/list?pageSize=${listCount}&fileType=${type}&pageNum=${pageNo}`, { headers: {
        Authorization: authToken
      }})
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const download = (id,authToken) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/file/download?docId=${id}`, { headers: {
        Authorization: authToken
      }})
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const notificationList = (authToken) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/me/getMyNotficationList?pageSize=500&pageNum=1`, { headers: {
        Authorization: authToken
      }})
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const markAsRead = (id,authToken) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/me/markAsRead?docId=${id}`, { headers: {
        Authorization: authToken
      }})
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const raiseGrevience = (data,authToken) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/me/raiseGrievance`,{...data}, { headers: {
        Authorization: authToken
      }})
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export const getGrevience = (authToken) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/me/getGrievanceList?page_size=250&page_num=1`, { headers: {
        Authorization: authToken
      }})
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const setAcknowledged = (id,authToken) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/me/ackGrievance?gId=${id}`, { headers: {
        Authorization: authToken
      }})
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

