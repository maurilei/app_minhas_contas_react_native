/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import moment from 'moment';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import Share from 'react-native-share';
import homeService from './homeservice';

export default function Home() {
  const navigation = useNavigation();

  const date = new Date();
  let [dados, setDados] = useState(dados);
  const [list, setList] = useState();
  const [mesBusca, setMesBusca] = useState(date.getMonth() + 1);
  const [anoBusca, setAnoBusca] = useState(date.getFullYear());
  const [mesConvertido, setMesconvertido] = useState();
  const [somaValorMes, setSomaValorMes] = useState();
  const [somaValorPagoMes, setSomaValorPagoMes] = useState();
  const [somaValorNaoPagoMes, setSomaValorNaoPagoMes] = useState();
  const [adm, setAdm] = useState();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //converter mes de numero para mes escrito
  const convertMes = async m => {
    // return;
    //console.log(typeof mesConvertido);
    // console.log(mesBusca);
    if (
      mesConvertido === '1' ||
      m === '1' ||
      mesConvertido === 1 ||
      mesBusca === 1
    ) {
      await setMesconvertido('JANEIRO');
    }
    if (
      mesConvertido === '2' ||
      m === '2' ||
      mesConvertido === 2 ||
      mesBusca === 2
    ) {
      setMesconvertido('FEVEREIRO');
    }
    if (
      mesConvertido === '3' ||
      m === '3' ||
      mesConvertido === 3 ||
      mesBusca === 3
    ) {
      setMesconvertido('MARÇO');
    }
    if (
      mesConvertido === '4' ||
      m === '4' ||
      mesConvertido === 4 ||
      mesBusca === 4
    ) {
      setMesconvertido('ABRIL');
    }
    if (
      mesConvertido === '5' ||
      m === '5' ||
      mesConvertido === 5 ||
      mesBusca === 5
    ) {
      setMesconvertido('MAIO');
    }
    if (
      mesConvertido === '6' ||
      m === '6' ||
      mesConvertido === 6 ||
      mesBusca === 6
    ) {
      setMesconvertido('JUNHO');
    }
    if (
      mesConvertido === '7' ||
      m === '7' ||
      mesConvertido === 7 ||
      mesBusca === 7
    ) {
      setMesconvertido('JULHO');
    }
    if (
      mesConvertido === '8' ||
      m === '8' ||
      mesConvertido === 8 ||
      mesBusca === 8
    ) {
      setMesconvertido('AGOSTO');
    }
    if (
      mesConvertido === '9' ||
      m === '9' ||
      mesConvertido === 9 ||
      mesBusca === 9
    ) {
      setMesconvertido('SETEMBRO');
    }
    if (
      mesConvertido === '10' ||
      m === '10' ||
      mesConvertido === 10 ||
      mesBusca === 10
    ) {
      setMesconvertido('OUTUBRO');
    }
    if (
      mesConvertido === '11' ||
      m === '11' ||
      mesConvertido === 11 ||
      mesBusca === 11
    ) {
      setMesconvertido('NOVEMBRO');
    }
    if (
      mesConvertido === '12' ||
      m === '12' ||
      mesConvertido === 12 ||
      mesBusca === 12
    ) {
      setMesconvertido('DEZEMBRO');
    }
  };

  //buscar todas contas
  const buscarTodasContas = () => {
    homeService
      .listar()
      .then(response => {
        const res = [response.data];
        setDados(res[0]);
        setList(res[0]);
        //console.log(res);
      })
      .catch(error => {
        console.log('ERRO');
        setDados();
      });
  };

  //buscar contas de um mes
  const buscarContasMes = () => {
    let data = {
      mes: mesBusca,
      ano: anoBusca,
    };
    homeService
      .listarMes(data)
      .then(response => {
        const res = [response.data];
        setDados(res[0]);
        setList(res[0]);
        //console.log(res);
      })
      .catch(error => {
        console.log('ERRO');
        setDados();
      });
  };

  //buscar contas de um mes ao clicar botao ou abrir tela
  const buscarContasMestimePicker = (m, a) => {
    //return console.log(m, a);
    //return console.log('buscar Contas Mes');
    if (m === undefined) {
      m = mesBusca;
    }
    if (a === undefined) {
      a = anoBusca;
    }
    convertMes(m);
    //return console.log(m, a);
    let data = {
      mes: m,
      ano: a,
    };
    //return console.log(data);
    homeService
      .listarMes(data)
      .then(response => {
        const res = [response.data];
        //setDados();
        //setList();
        setDados(res[0]);
        setList(res[0]);
        //console.log(res);
      })
      .catch(error => {
        console.log('ERRO');
        setDados();
      });
  };

  //somar contas de um mes
  const somarContasMes = (m, a) => {
    //return console.log(m, a);
    //return console.log('buscar Contas Mes');
    if (m === undefined) {
      m = mesBusca;
    }
    if (a === undefined) {
      a = anoBusca;
    }
    //return console.log(m, a);
    let data = {
      mes: m,
      ano: a,
    };
    //return console.log(data);
    homeService
      .somarMes(data)
      .then(response => {
        let res = [response.data];
        var resultado = res[0];
        var valor = resultado[0]['SUM(valor)'];
        //console.log(valor.toFixed(2));
        setSomaValorMes(valor.toFixed(2));
      })
      .catch(error => {
        //console.log('ERRO');
        setSomaValorMes((0.0).toFixed(2));
      });
  };

  //somar contas Pagas de um mes
  const somarContasPagasMes = (m, a) => {
    if (m === undefined) {
      m = mesBusca;
    }
    if (a === undefined) {
      a = anoBusca;
    }
    let data = {
      mes: m,
      ano: a,
    };
    homeService
      .somarPagasMes(data)
      .then(response => {
        let res = [response.data];
        var resultado = res[0];
        var valor = resultado[0]['SUM(valor)'];
        //console.log(valor.toFixed(2));
        setSomaValorPagoMes(valor.toFixed(2));
      })
      .catch(error => {
        //console.log('ERRO');
        setSomaValorPagoMes((0.0).toFixed(2));
      });
  };

  //somar contas Nao Pagas de um mes
  const somarContasNaoPagasMes = (m, a) => {
    if (m === undefined) {
      m = mesBusca;
    }
    if (a === undefined) {
      a = anoBusca;
    }
    let data = {
      mes: m,
      ano: a,
    };
    homeService
      .somarNaoPagasMes(data)
      .then(response => {
        let res = [response.data];
        var resultado = res[0];
        var valor = resultado[0]['SUM(valor)'];
        // console.log(valor.toFixed(2));
        setSomaValorNaoPagoMes(valor.toFixed(2));
      })
      .catch(error => {
        console.log('ERRO');
        setSomaValorNaoPagoMes((0.0).toFixed(2));
      });
  };

  const isAdm = async () => {
    const value = await AsyncStorage.getItem('ADMIN');
    if (value === 'admin') {
      setAdm(true);
    }
    if (value === 'user') {
      setAdm(false);
    }

    //console.log(adm);
  };
  //executar funcoes ao abrir tela
  useEffect(() => {
    isAdm();
    buscarContasMes();
    somarContasMes();
    somarContasPagasMes();
    somarContasNaoPagasMes();
    convertMes();
    //console.log(adm);
  }, []);

  //navegar para pagina adicionar conta
  const pageAddConta = () => {
    navigation.navigate('ADD');
    /*navigation.reset({
      index: 0,
      routes: [{name: 'ADD'}],
    });*/
  };

  //navegar para pagina  pageUsuarios
  const pageUsuarios = () => {
    navigation.navigate('Usuarios');
  };

  //navegar para pagina editar conta enviando os dados
  const editarConta = (id, descricao, valor, vencimento, situacao) => {
    if (situacao === 'Pendente') {
      situacao = false;
    } else {
      situacao = true;
    }
    //console.log(situacao);
    navigation.navigate('EditarConta', {
      idc: id,
      desc: descricao,
      val: valor,
      venci: vencimento,
      situ: situacao,
    });
  };

  //apagar conta pelo id
  const apagarConta = id => {
    Alert.alert(
      'Apagar',
      'Deseja Apagar A Conta?', // <- this part is optional, you can pass an empty string
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => confirmaApagarConta(id)},
      ],
      {cancelable: false},
    );
  };

  //confirmar apagar a conta
  const confirmaApagarConta = id => {
    //console.log(id);
    let data = {
      id: id,
    };
    homeService
      .deletar(data)
      .then(response => {
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      })
      .catch(error => {
        Alert.alert('Erro ao Apagar Conta', error);
      });
  };

  //compartilhar contas
  const shareAllDataOnWhatsApp = async () => {
    try {
      const shareOptions = {
        title: 'Compartilhar via',
        message:
          mesConvertido +
          ' de ' +
          anoBusca +
          dados
            .map(
              item => `
         ${item.descricao}
          Valor: R$${item.valor}
          Vencimento: ${moment(item.vencimento).format('DD/MM/YYYY')}
          Situação: ${item.situacao}
          `,
            )
            .join('') +
          '\n Total: ' +
          'R$ ' +
          somaValorMes +
          '\n Pago: ' +
          'R$ ' +
          somaValorPagoMes +
          '\n Falta Pagar: ' +
          'R$ ' +
          somaValorNaoPagoMes,
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.log('Erro ao compartilhar:', error.message);
    }
  };

  const sair = async () => {
    toggleModal();

    await await AsyncStorage.removeItem('TOKEN');
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return (
    <View style={styles.container}>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            Você tem certeza que deseja Sair?
          </Text>
          <TouchableOpacity onPress={sair}>
            <Text style={styles.modalButtonSim}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={styles.modalButtonCancel}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.topbar}>
        {adm && (
          <TouchableOpacity style={styles.settings} onPress={pageUsuarios}>
            <Icon name="user" size={30} color="#000000" />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.settings}>
          <Icon name="cog" size={30} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settings} onPress={toggleModal}>
          <Icon name="times-circle" size={30} color="#ff0000" />
        </TouchableOpacity>
      </View>
      <View style={styles.totais}>
        <Text style={styles.textTotais}>TOTAL NO MÊS DE {mesConvertido}</Text>
        <Text style={styles.textTotais}>R$ {somaValorMes}</Text>
      </View>
      <View style={styles.totais}>
        <Text style={styles.textTotais}>
          FALTA PAGAR NO MÊS DE {mesConvertido}
        </Text>
        <Text style={styles.textTotais}>R$ {somaValorNaoPagoMes} </Text>
      </View>
      <View style={styles.totais}>
        <Text style={styles.textTotais}>PAGO NO MÊS DE {mesConvertido}</Text>
        <Text style={styles.textTotais}>R$ {somaValorPagoMes} </Text>
      </View>

      <View
        style={{
          // flex: 1,
          flexDirection: 'row',
          width: '90%',
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#40617933',
          borderWidth: 2,
          borderRadius: 10,
          borderColor: '#000',
        }}>
        {/*// geral*/}
        <View
          style={{
            width: '50%',
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{fontSize: 18, color: '#000', fontWeight: 'bold'}}>
              Selecione o Mês
            </Text>
            <Picker
              style={{
                width: 150,
                textAlign: 'center',
                alignItems: 'center',
                color: '#000',
                fontWeight: 'bold',
              }}
              selectedValue={mesBusca.toString()}
              onValueChange={
                // console.log('a')
                itemValue => setMesBusca(itemValue)
              }>
              <Picker.Item label="Janeiro" value="1" />
              <Picker.Item label="Fevereiro" value="2" />
              <Picker.Item label="Março" value="3" />
              <Picker.Item label="Abril" value="4" />
              <Picker.Item label="Maio" value="5" />
              <Picker.Item label="Junho" value="6" />
              <Picker.Item label="Julho" value="7" />
              <Picker.Item label="Agosto" value="8" />
              <Picker.Item label="Setembro" value="9" />
              <Picker.Item label="Outubro" value="10" />
              <Picker.Item label="Novembro" value="11" />
              <Picker.Item label="Dezembro" value="12" />
            </Picker>
          </View>
        </View>
        <View
          style={{
            width: '50%',
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{fontSize: 18, color: '#000', fontWeight: 'bold'}}>
              Selecione o Ano
            </Text>
            <Picker
              style={{
                width: 150,
                textAlign: 'center',
                alignItems: 'center',
                fontSize: 18,
                fontWeight: 'bold',
                color: '#000',
              }}
              selectedValue={anoBusca.toString()}
              //selectedValue={anoBusca}
              onValueChange={
                itemValue => setAnoBusca(itemValue) //setSelectedLanguage(itemValue)
              }>
              {/*<Picker.Item
                label={anoBusca.toString()}
                value={anoBusca.toString()}
              />*/}
              <Picker.Item label="2022" value="2022" />
              <Picker.Item label="2023" value="2023" />
              <Picker.Item label="2024" value="2024" />
              <Picker.Item label="2025" value="2025" />
              <Picker.Item label="2026" value="2026" />
            </Picker>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.btnAddConta}
        onPress={() => {
          buscarContasMestimePicker(mesBusca, anoBusca);
          somarContasMes(mesBusca, anoBusca);
          somarContasPagasMes(mesBusca);
          somarContasNaoPagasMes(mesBusca);
          setMesconvertido(mesBusca);
          convertMes(mesBusca);
        }}>
        <Text style={styles.textBtnAdd}>Buscar</Text>
      </TouchableOpacity>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          width: '100%',
        }}>
        <View>
          <FlatList
            data={dados}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            renderItem={({item}) => {
              const itemStyle =
                item.situacao === 'Pendente'
                  ? styles.cadaItem
                  : styles.cadaItemPago;
              const vencimentoStyle =
                item.situacao === 'Pendente' &&
                item.vencimento === moment(date).format('YYYY-MM-DD')
                  ? styles.cadaItemVenceHoje
                  : '';
              return (
                <SafeAreaView>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      flexGrow: 1,
                      justifyContent: 'center',
                      width: '90%',
                    }}>
                    <View style={styles.listaItens}>
                      <TouchableOpacity
                        style={[itemStyle, vencimentoStyle]}
                        onPress={() =>
                          editarConta(
                            item.id,
                            item.descricao,
                            item.valor,
                            item.vencimento,
                            item.situacao,
                          )
                        }
                        onLongPress={() => apagarConta(item.id)}>
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                alignContent: 'center',
                                justifyContent: 'center',
                                alignSelf: 'center',
                                left: '-30%',
                              }}
                            />
                            <View>
                              <Text style={styles.descricao}>
                                {item.descricao}
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    flex: 1,
                                    height: 2,
                                    backgroundColor: 'black',
                                  }}
                                />
                                <View />
                              </View>
                              <Text style={styles.valor}>
                                Valor: R${item.valor}
                              </Text>
                              <Text style={styles.vencimento}>
                                Vencimento:{' '}
                                {moment(item.vencimento).format('DD/MM/YYYY')}
                              </Text>
                              <Text style={styles.situacao}>
                                Status: {item.situacao}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </SafeAreaView>
              );
            }}
          />
        </View>
      </ScrollView>
      {/* Botao ADD Conta */}
      <TouchableOpacity
        onPress={pageAddConta}
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 70,
          position: 'absolute',
          bottom: 10,
          right: 10,
          height: 70,
          backgroundColor: '#fff',
          borderRadius: 100,
        }}>
        <Icon name="plus" size={30} color="#01a699" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={shareAllDataOnWhatsApp}
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 70,
          position: 'absolute',
          bottom: 10,
          left: 10,
          height: 70,
          backgroundColor: '#fff',
          borderRadius: 100,
        }}>
        <Icon name="share" size={30} color="#0401a6" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },

  topbar: {
    flexDirection: 'row',
    //flex: 1,
    marginTop: 10,
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    //borderRadius: 10,
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
    justifyContent: 'flex-end',
  },
  settings: {
    //position: 'relative',
    right: 10,
    marginHorizontal: 10,
  },
  totais: {
    marginTop: 10,
    width: '90%',
    height: 50,
    backgroundColor: '#aeaeae',
    borderRadius: 10,
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  textTotais: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  btnAddConta: {
    marginTop: 20,
    width: '90%',
    height: 40,
    backgroundColor: '#285031',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    fontSize: 20,
  },
  textBtnAdd: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffff',
  },
  item: {
    backgroundColor: '#7a1c74',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    color: '#fff',
  },
  listaItens: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flex: 1,
    backgroundColor: '#ffff',
    width: '90%',
    color: '#fff',
    fontSize: 20,
  },
  cadaItem: {
    textAlign: 'center',
    alignItems: 'center',
    width: '100%',
    //height: 90,
    backgroundColor: '#1c427a',
    borderRadius: 10,
    padding: 5,
    marginTop: 10,
  },
  cadaItemPago: {
    textAlign: 'center',
    alignItems: 'center',
    width: '100%',
    //height: 90,
    backgroundColor: '#198024',
    borderRadius: 10,
    padding: 5,
    marginTop: 10,
  },
  cadaItemVenceHoje: {
    textAlign: 'center',
    alignItems: 'center',
    width: '100%',
    //height: 90,
    backgroundColor: '#fc6005',
    borderRadius: 10,
    padding: 5,
    marginTop: 10,
  },
  descricao: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  valor: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'flex-end',
    color: '#fff',
  },
  vencimento: {
    fontSize: 19,
    color: '#fff',
  },
  situacao: {
    fontSize: 19,
    color: '#fff',
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    //alignSelf: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalText: {
    marginBottom: 10,
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  modalButtonSim: {
    marginTop: 10,
    fontSize: 18,
    color: '#ffffff',
    backgroundColor: '#940000',
    width: 100,
    height: 30,
    textAlign: 'center',
    borderRadius: 10,
  },
  modalButtonCancel: {
    marginTop: 10,
    fontSize: 18,
    color: '#ffffff',
    backgroundColor: '#04320e',
    width: 100,
    height: 40,
    textAlign: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
