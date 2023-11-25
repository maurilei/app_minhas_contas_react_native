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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {TextInputMask} from 'react-native-masked-text';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
//import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import homeService from '../Home/homeservice';

export default function AddConta() {
  const navigation = useNavigation();

  let ddd = new Date();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [descricao, setDescricao] = useState();
  const [valorInput, setvalorInput] = useState();
  const [valor, setvalor] = useState(0);
  const [vencimento, setVencimento] = useState(
    moment(ddd).format('DD/MM/YYYY'),
  );
  const [vencData, setVencimentoData] = useState(
    moment(ddd).format('YYYY-MM-DD'),
  );
  const [contaPaga, setContaPaga] = useState('false');
  const [checkBoxChecked, setCheckBoxChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    //console.warn(date);
    setVencimento(moment(date).format('DD/MM/YYYY'));
    setVencimentoData(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };

  const alertSalvar = () => {
    if (descricao == null || descricao.length < 3) {
      Alert.alert('Atenção', 'Preencha Corretamente os Campo');
    } else {
      Alert.alert(
        'Salvar',
        'Deseja Salvar A Conta?', // <- this part is optional, you can pass an empty string
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => salvarConta()},
        ],
        {cancelable: false},
      );
    }
  };

  const salvarConta = () => {
    setIsLoading(true);
    let sit = 'Pendente';
    if (checkBoxChecked === true) {
      sit = 'Paga';
    }
    //let venc = moment(vencimento).format('YYYY-MM-DD');
    let data = {
      descricao: descricao,
      valor: valor,
      vencimento: vencData,
      situacao: sit,
    };
    //return console.log(data);
    homeService
      .cadastrar(data)
      .then(response => {
        setDescricao();
        setvalor(0);
        setvalorInput(0);
        setVencimento(moment(ddd).format('DD/MM/YYYY'));
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
        // showDialog("Erro", "Houve um erro inesperado", "ERRO")
        Alert.alert('Erro', 'Houve um erro inesperado');
      });
  };

  const pageHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
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
        <Text style={styles.topoTexto}>Adicionar Conta</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Descrição da Conta</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={'#000'}
          placeholder="Descrição da Conta"
          //value={descricao}
          onChangeText={setDescricao}

          //secureTextEntry={true}
        />
        <Text style={styles.label}>Valor da Conta</Text>
        <TextInputMask
          placeholder="EX. R$20,86"
          style={styles.input}
          type="money"
          //value={valorInput}
          placeholderTextColor={'#000'}
          onChangeText={value => {
            setvalorInput(value);
            value = value.replace('R$', '');
            value = value.replace('.', '');
            value = value.replace(',', '.');
            setvalor(value);
            // console.log(valor);
          }}
        />

        <Text style={styles.label}>Vencimento da Conta</Text>
        <TextInput
          onPressIn={showDatePicker}
          style={styles.input}
          placeholder="EX. 01/01/1969"
          placeholderTextColor={'#000'}
          value={vencimento}
          onChangeText={setVencimento}
          editable={false}
          //secureTextEntry={true}
        />
        <Button title="Selecionar Vencimento" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <View
          //onPress={() => setCheckBox()}
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <CheckBox
            tintColors={'#000'}
            disabled={false}
            value={checkBoxChecked}
            onValueChange={newValue => setCheckBoxChecked(newValue)}
            title={'Conta Paga'}
          />
          <Text style={{fontSize: 20, color: '#000'}}>Conta Paga</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={alertSalvar}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
      {/* Botao ADD Conta */}
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
});
