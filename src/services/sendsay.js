import Sendsay from 'sendsay-api';
const sendsay = new Sendsay({apiUrl: 'https://api.sendsay.ru/general/api/v100/json/x_1642748154138690'});
sendsay.setSessionFromCookie('sendsay_session');

export class SendsayCustom {
  static sendsay = sendsay;
}
