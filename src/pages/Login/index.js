/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import loginService from './loginservice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // validar email
  function validarEmail() {
    const regex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return regex.test(email);
  }

  // chamar funcao entrar ao validar email
  const logar = () => {
    // Exemplo de uso
    if (validarEmail(email)) {
      // console.log('O endereço de e-mail é válido.');
      entrar();
    } else {
      //console.log('O endereço de e-mail é inválido.');
      Alert.alert('Cuidado', 'O endereço de e-mail é inválido.');
    }
  };

  // logar no aplicativo e salvar token e email o asyncstorage
  const entrar = () => {
    let data = {
      email: email,
      senha: senha,
    };
    loginService
      .login(data)
      .then(response => {
        try {
          // navigation.navigate('Home'); // Navega para a tela 'Home'
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
          //console.log('Entrou');
        } catch (error) {
          console.error('Erro ao navegar para a tela Home:', error);
        }

        //navigation.navigate('Home');
        // navigation.navigate('Home'); // Navega para a tela 'Home'
        //console.log('OK aqi');
      })
      .catch(error => {
        //showDialog("Erro","Houve um erro inesperado", "ERRO")
        Alert.alert('Erro', 'Email e/ou Senha Incorretos');
      });
  };

  // logar automaticamente com token salvo no asyncstorage
  const logarToken = async () => {
    const mail = await AsyncStorage.getItem('EMAIL');
    let token = await AsyncStorage.getItem('TOKEN');
    setIsLoading(true);
    //return console.log(token);
    if (token === null) {
      setIsLoading(false);
      return;
    }

    let data = {
      email: mail,
    };
    //console.log(data);
    loginService
      .loginComToken(data)
      .then(response => {
        try {
          // navigation.navigate('Home'); // Navega para a tela 'Home'
          setIsLoading(false);
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
          //console.log('Entrou');
        } catch (error) {
          setIsLoading(false);
          console.error('Erro ao navegar para a tela Home:', error);
        }

        //navigation.navigate('Home');
        // navigation.navigate('Home'); // Navega para a tela 'Home'
        //console.log('OK aqi');
      })
      .catch(error => {
        //showDialog("Erro","Houve um erro inesperado", "ERRO")
        setIsLoading(false);
        //Alert.alert('Erro', 'Email e/ou Senha Incorretos');
      });
  };

  //executar funcoes ao abrir tela
  useEffect(() => {
    logarToken();
  }, []);

  return (
    <>
      {isLoading && (
        <LottieView
          resizeMode="contain"
          autoSize
          autoPlay
          loop
          source={require('../../assets/chick.json')}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
          }}
        />
      )}
      <View style={styles.container}>
        <View style={styles.containeLogo}>
          <Animatable.Image
            animation={'flipInY'}
            source={require('../../assets/logo.png')}
            style={{width: '100%'}}
            resizeMode="contain"
          />
        </View>

        <Animatable.View animation={'fadeInUp'} style={styles.containerForm}>
          <KeyboardAvoidingView behavior="position" enabled>
            <ScrollView>
              <Text style={styles.title}>Email</Text>
              <TextInput
                placeholder="Digite seu E-Mail"
                style={styles.input}
                placeholderTextColor={'#000'}
                onChangeText={value => setEmail(value)}
                keyboardType="email-address"
              />

              <Text style={styles.title}>Senha</Text>
              <TextInput
                placeholder="Digite sua Senha"
                style={styles.input}
                placeholderTextColor={'#000'}
                secureTextEntry={true}
                onChangeText={value => setSenha(value)}
              />
              <TouchableOpacity style={styles.button} onPress={() => logar()}>
                <Text style={styles.buttonText}>Acessar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonRegister}>
                <Text style={styles.buttonRegisterText}>Cadastre-se</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </Animatable.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38a69d',
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  containerForm: {
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  title: {
    color: '#000',
    fontSize: 20,
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#38a69d',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: 'center',
  },
  buttonRegisterText: {
    color: '#a1a1a1',
  },
});
