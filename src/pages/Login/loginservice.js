import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from '../../../util/config';

class LoginService {
  //cadastrar usuario
  async cadastrar(data) {
    return axios({
      url: Config.API_URL + 'usuario/cadastrar',
      method: 'POST',
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: Config.HEADER_REQUEST,
    })
      .then(response => {
        return Promise.resolve(response);
        //console.log('OK');
      })
      .catch(error => {
        return Promise.reject(error);
        //console.log(error);
      });
  }

  //logar no aplicativo e salvar token e email no asyncstorage
  async login(data) {
    return axios({
      url: Config.API_URL + 'usuarios/login',
      method: 'POST',
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: Config.HEADER_REQUEST,
    })
      .then(response => {
        //console.log(response.data.token);
        AsyncStorage.setItem('TOKEN', response.data.token);
        AsyncStorage.setItem('EMAIL', response.data.dados.email);
        //console.log(response.data.dados.email);
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  //logar automatico com token salvo
  async loginComToken(data) {
    let token = await AsyncStorage.getItem('TOKEN');

    return axios({
      url: Config.API_URL + 'usuarios/login-token',
      method: 'POST',
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: {Accept: 'application/json', Authorization: 'Bearer ' + token},
    })
      .then(response => {
        if (response.data.dados.email) {
          return Promise.resolve(response);
        } else {
          return Promise.reject(response);
        }
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
}

const loginService = new LoginService();
export default loginService;
