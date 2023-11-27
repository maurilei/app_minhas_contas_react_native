import axios from 'axios';
import Config from '../../../util/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import AsyncStorage from '@react-native-community/async-storage';

class UsuarioService {
  //cadastrar usuario
  async cadastrar(data) {
    let token = await AsyncStorage.getItem('TOKEN');
    return axios({
      url: Config.API_URL + 'usuarios/cadastrar',
      method: 'POST',
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      // headers: Config.HEADER_REQUEST
      headers: {Accept: 'application/json', Authorization: 'Bearer ' + token},
    })
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject(token);
        //return Promise.reject(error)
      });
  }
  //buscar todos usuarios
  async listar() {
    //let token = await AsyncStorage.getItem('TOKEN');
    let token = await AsyncStorage.getItem('TOKEN');
    return axios({
      url: Config.API_URL + 'usuarios/listar',
      method: 'POST',
      timeout: Config.TIMEOUT_REQUEST,
      headers: {Accept: 'application/json', Authorization: 'Bearer ' + token},
    })
      .then(response => {
        return response;
        //return Promise.resolve(response)
      })
      .catch(error => {
        //return console.log(error);
        return Promise.reject(error);
      });
  }

  //atualizar usuario
  async update(data) {
    let token = await AsyncStorage.getItem('TOKEN');
    return axios({
      url: Config.API_URL + 'usuarios/atualizar',
      method: 'PATCH',
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  //apagar usuario pelo id
  async deletar(data) {
    let token = await AsyncStorage.getItem('TOKEN');
    return axios({
      url: Config.API_URL + 'usuarios/apagar',
      method: 'DELETE',
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        //return Promise.reject(error)
        return error;
        //console.log(error)
      });
  }
}

const usuarioService = new UsuarioService();
export default usuarioService;
