const ip = "http://127.0.0.1:8360";
const APPID = '1256990025';
const KEY = 'gCOTxdkCHUMdLTWPSMeM';
const getApiConfig = () => {
  return {
    getVideos: ip + '/media/getSignature2',
    playVideos: ip + '/media/keyurl',
    loginAuth: ip + '/auth/login',
    register: ip + '/auth/register',
    getEvaluate: ip + '/evaluate/getEvaluate',
    getEvaluateDetail: ip + '/evaluate/getEvaluateDetail',
    sendWord: ip + '/evaluate/sendWord',
    sendWordDetail: ip + '/evaluate/sendSendWordDetail',
    upload: ip + '/media/upload',
    getUserData: ip + '/getdata/getUserData',
    getComment:ip+'/evaluate/getEvaluateDetailByUser'
  }
};
export default {
  getApiConfig,
  APPID,
  KEY,
  ip
}
