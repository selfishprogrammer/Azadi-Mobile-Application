import {getReq2, getReqForThirdPartyAPI, postReq} from './api';

export default class Service {
  static getAllProduct = () => getReq2('GETPRODUCTS');

  static getProductById = id => getReq2(`GETPRODUCT/${id}`);

  static userLogin = data => {
    console.log('data', data);
    return postReq('USER/LOGIN', data);
  };

  static userRegister = data => {
    console.log('data', data);
    return postReq('USER/REGISTER', data);
  };

  static getUserLocation = (lat, long) => {
    console.log('lat', lat + 'long', long);
    return getReqForThirdPartyAPI(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json&extratags=1`,
    );
  };

  static getOTP = data => {
    console.log('data', data);
    return postReq('GETOTP', data);
  };

  static verifyOTP = data => {
    return postReq('VERIFYOTP', data);
  };

  static submitContactUs = data => {
    return postReq('CONTACTUS', data);
  };

  static getAllBusiness = () => getReq2('GETBUSINESSES');

  static getTCVersion = deviceID => getReq2(`GETTCVERSION/${deviceID}`);

  static acceptTC = data => {
    return postReq('TCACCEPTED', data);
  };

  static getFoceUpdate = appVersion => getReq2(`FORCEUPDATE/${appVersion}`);
  static getMaintenace = () => getReq2('GETMAINTENENCE');
}
