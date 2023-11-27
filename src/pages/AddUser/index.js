/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import moment from 'moment';
import {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';

import {TextInputMask} from 'react-native-masked-text';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
//import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import {Picker} from '@react-native-picker/picker';

import usuarioService from '../Usuarios/usuarioService';

export default function AddUser() {
  const navigation = useNavigation();

  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [telefone, setTelefone] = useState(0);
  const [senha, setsenha] = useState();
  const [isAdmin, setIsAdmin] = useState('user');
  const [checkBoxChecked, setCheckBoxChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const alertSalvar = () => {
    if (nome == null || nome.length < 3) {
      Alert.alert('Atenção', 'Preencha Corretamente os Campos');
    } else {
      Alert.alert(
        'Salvar',
        'Deseja Salvar o Usuario?', // <- this part is optional, you can pass an empty string
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => salvarUsuario()},
        ],
        {cancelable: false},
      );
    }
  };

  const salvarUsuario = async () => {
    setIsLoading(true);

    let data = {
      nome: nome,
      email: email,
      telefone: telefone,
      senha: senha,
      admin: isAdmin,
    };
    //return console.log(data);
    usuarioService
      .cadastrar(data)
      .then(response => {
        navigation.reset({
          index: 0,
          routes: [{name: 'Usuarios'}],
        });
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
        // showDialog("Erro", "Houve um erro inesperado", "ERRO")
        Alert.alert('Erro', 'Houve um erro inesperado');
      });
  };

  const pageUsuarios = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Usuarios'}],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <LottieView
          //resizeMode="contain"
          autoSize
          autoPlay
          loop
          source={require('../../assets/load.json')}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
          }}
        />
      )}
      <View style={styles.topo}>
        <Text style={styles.topoTexto}>Adicionar Usuario</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={'#000'}
          placeholder="Nome Completo"
          //value={descricao}
          onChangeText={setNome}

          //secureTextEntry={true}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={'#000'}
          placeholder="Email"
          //value={descricao}
          onChangeText={setEmail}
          keyboardType="email-address"

          //secureTextEntry={true}
        />
        <Text style={styles.label}>Telefone</Text>
        <TextInputMask
          placeholder="EX. (12)9 9999-9999"
          style={styles.input}
          type={'cel-phone'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) ',
          }}
          placeholderTextColor={'#000'}
          onChangeText={value => {
            setTelefone(value);
          }}
        />

        {/*<Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={'#000'}
          placeholder="Senha"
          //value={descricao}
          onChangeText={setsenha}
          secureTextEntry={true}
        />*/}

        <Text style={styles.label}>Senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholderTextColor={'#000'}
            placeholder="Senha"
            value={senha}
            onChangeText={setsenha}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Text style={styles.eyeIcon}>{showPassword ? '🔐' : '🔓'}</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text style={{fontSize: 18, color: '#000', fontWeight: 'bold'}}>
            Tipo de Usuario
          </Text>
          <Picker
            style={{
              width: 200,
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              fontWeight: 'bold',
              color: '#000',
            }}
            dropdownIconColor={'#000'}
            selectedValue={isAdmin}
            //selectedValue={anoBusca}
            onValueChange={
              itemValue => setIsAdmin(itemValue) //setSelectedLanguage(itemValue)
            }>
            <Picker.Item label="Usuario" value="user" />
            <Picker.Item label="Administrador" value="admin" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={alertSalvar}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
      {/* Botao ADD Conta */}
      <TouchableOpacity
        onPress={pageUsuarios}
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
        <Icon name="arrow-left" size={30} color="#01a699" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },
  topo: {
    backgroundColor: '#dedede',
    marginTop: 10,
    width: '95%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topoTexto: {
    fontSize: 25,
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  form: {
    width: '80%',
    height: 100,
    //alignItems: 'center',
  },

  inputDescricao: {
    marginTop: 10,
    width: '90%',
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
    borderRadius: 10,
  },

  label: {
    marginTop: 20,
    marginBottom: 5,
    color: '#000',
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    alignItems: 'center',
    textAlign: 'center',
    color: '#000',
    width: '90%',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  avatarContainer: {
    marginTop: 10,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  passwordContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingRight: 8,
  },
  eyeIcon: {
    fontSize: 20,
  },
});
