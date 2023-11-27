/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import usuarioService from './usuarioService';
import {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

export default function Usuarios() {
  const navigation = useNavigation();
  let [dados, setDados] = useState(dados);
  const [list, setList] = useState();

  //buscar todos usuarios
  const buscarTodosUsuarios = () => {
    usuarioService
      .listar()
      .then(response => {
        const res = [response.data];
        setDados(res[0]);
        setList(res[0]);
        // console.log(res);
      })
      .catch(error => {
        console.log('ERRO');
        setDados();
      });
  };

  //navegar para pagina editar usuario enviando os dados
  const editarUsuario = (id, nome, email, telefone, admin) => {
    // console.log(id, nome, email, telefone);
    //return console.log(admin);
    navigation.navigate('EditarUser', {
      id: id,
      name: nome,
      mail: email,
      tel: telefone,
      admin: admin,
    });
  };

  //apagar usuario pelo id
  const apagarUsuario = id => {
    Alert.alert(
      'Apagar',
      'Deseja Apagar o Usuario?', // <- this part is optional, you can pass an empty string
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => confirmaApagarUsuario(id)},
      ],
      {cancelable: false},
    );
  };

  //confirmar apagar o usuario
  const confirmaApagarUsuario = id => {
    //console.log(id);
    let data = {
      id: id,
    };
    usuarioService
      .deletar(data)
      .then(response => {
        navigation.reset({
          index: 0,
          routes: [{name: 'Usuarios'}],
        });
      })
      .catch(error => {
        Alert.alert('Erro ao Apagar Usuario', error);
      });
  };

  //navegar para pagina adicionar conta
  const pageAddUser = () => {
    navigation.navigate('AddUser');
    /*navigation.reset({
      index: 0,
      routes: [{name: 'ADD'}],
    });*/
  };

  const pageHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  //executar funcoes ao abrir tela
  useEffect(() => {
    buscarTodosUsuarios();
    //console.log(dados);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topbar}>
        <Text style={styles.textTopBar}>Usuarios</Text>
      </View>

      <FlatList
        data={dados}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        renderItem={({item}) => {
          return (
            <SafeAreaView>
              <ScrollView
                //horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  // flex: 1,
                  flexGrow: 1,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  width: '95%',
                }}>
                <View style={styles.listaItens}>
                  <TouchableOpacity
                    style={[]}
                    onPress={() =>
                      editarUsuario(
                        item.id,
                        item.nome,
                        item.email,
                        item.telefone,
                        item.admin,
                      )
                    }
                    onLongPress={() => apagarUsuario(item.id)}>
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
                          <Text style={styles.nome}>{item.nome}</Text>
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
                          <Text style={styles.email}>{item.email}</Text>

                          <Text style={styles.telefone}>{item.telefone}</Text>
                          <Text style={styles.telefone}>{item.admin}</Text>
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
      <TouchableOpacity
        onPress={pageAddUser}
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
        onPress={pageHome}
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
        <Icon name="arrow-left" size={30} color="#ff8000" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    //alignItems: 'center',
    color: '#000',
  },
  topbar: {
    marginTop: 5,
    //width: '95%',
    height: 50,
    backgroundColor: '#cdcdcd',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTopBar: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  listaItens: {
    backgroundColor: '#707070',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  nome: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    color: '#fff',
    fontSize: 15,
  },
  telefone: {
    color: '#fff',
    fontSize: 17,
  },
});
