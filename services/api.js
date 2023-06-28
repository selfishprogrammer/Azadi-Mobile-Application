import axios from 'axios';
import {base_url} from '../constants/Urls';

export const getReq2 = async des_url => {
  let url = base_url + des_url;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(function (response) {
        // console.log('result data====>', response.data);
        resolve(response.data);
      })
      .catch(function (error) {
        resolve(error?.response);
      })
      .finally(function () {
        // always executed
      });
  });
};
export const getReqForThirdPartyAPI = async url => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(function (response) {
        // console.log('result data====>', response.data);
        resolve(response?.data);
      })
      .catch(function (error) {
        resolve(error?.response);
      })
      .finally(function () {
        // always executed
      });
  });
};
export const postReq = async (des_url, body) => {
  let url = base_url + des_url;
  return new Promise((resolve, reject) => {
    axios
      .post(url, body)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        console.log('server error', error);
        // Handle cases whereby no responses return from Server (eg, API server totally down)

        if (error.response) {
          resolve(error.response.data);
          return;
        }
      })
      .finally(function () {
        // always executed
      });
  });
};
