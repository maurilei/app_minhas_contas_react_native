import axios from 'axios';
import Config from '../../../util/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import AsyncStorage from '@react-native-community/async-storage';

class HomeService {
  //cadastrar conta
  async cadastrar(data) {
    let token = await AsyncStorage.getItem('TOKEN');
    return axios({
      url: Config.API_URL + 'contas/cadastrar',
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
  //buscar todas as contas
  async listar() {
    //let token = await AsyncStorage.getItem('TOKEN');
    let token = await AsyncStorage.getItem('TOKEN');
    return axios({
      url: Config.API_URL + 'contas/listar',
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

  //buscar contas do mes
  async listarMes(data) {
    //let token = await AsyncStorage.getItem('TOKEN');
    let token = await AsyncStorage.getItem('TOKEN');
    //console.log(token);
    return axios({
      url: Config.API_URL + 'contas/listarmes',
      method: 'POST',
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
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

  //somar contas do mes
  async somarMes(data) {
    let token = await AsyncStorage.getItem('TOKEN');
    return axios({
      url: Config.API_URL + 'contas/somarmes',
      method: 'POST',
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
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

  //somar contas Pagas do mes
  async somarPagasMes(data) {
    let token = await AsyncStorage.getItem('TOKEN');
    return axios({
      url: Config.API_URL + 'contas/somarpagasmes',
      method: 'POST',
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
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

  //somar contas nao Pagas do mes
  async somarNaoPagasMes(data) {
    let token = await AsyncStorage.getItem('TOKEN');
    return axios({
      url: Config.API_URL + 'contas/somarnaopagasmes',
      method: 'POST',
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
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

  async update(data) {
    let token = await AsyncStorage.getItem('TOKEN');
    return axios({
      url: Config.API_URL + 'contas/atualizar',
      method: 'POST',
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

  //apagar conta pelo id
  async deletar(data) {
    let token = await AsyncStorage.getItem('TOKEN');
    return axios({
      url: Config.API_URL + 'contas/apagar',
      method: 'POST',
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

const homeService = new HomeService();
export default homeService;
