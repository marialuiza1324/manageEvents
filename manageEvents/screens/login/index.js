import React, {useState, useContext} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {getUser} from "../../services/userStorage.js"
import { AuthContext } from '../../services/authContext';


const Login = ({navigation}) => {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState("")
  const {user, setUser} = useContext(AuthContext)

  const verifyLogin = async () => {
    const dataUser = await getUser(email)
    if(!dataUser){
      setVisible(true)
      return
    }
    const userParsed = JSON.parse(dataUser)
    setUser(userParsed)
    setVisible(false)
    setEmail("")
    navigation.navigate("Usuário", {email: userParsed.email})
  }

  return(
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <FontAwesome name="calendar-check-o" size={52} color="#7C3AED" />
      </View>
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputWrapper}>
        <FontAwesome name="envelope-o" size={16} color="#9CA3AF" style={styles.inputIcon} />
        <TextInput
          value={email}
          onChangeText={(email) => setEmail(email)}
          placeholder="E-mail"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity onPress={verifyLogin} style={styles.button}>
        <FontAwesome name="sign-in" size={18} color="#FFFFFF" />
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.backgroundModal}>
          <View style={styles.modal}>
            <FontAwesome name="exclamation-circle" size={40} color="#EF4444" style={{ marginBottom: 12 }} />
            <Text style={styles.modalTitle}>Usuário não encontrado</Text>
            <TouchableOpacity onPress={() => setVisible(false)} style={styles.modalButton}>
              <Text style={styles.buttonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#F5F3FF'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4C1D95',
    textAlign: 'center',
    marginBottom: 32
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DDD6FE',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16
  },
  inputIcon: {
    marginRight: 8
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16
  },
  button: {
    backgroundColor: '#7C3AED',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16
  },
  backgroundModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modal: {
    width: '75%',
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 14,
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center'
  },
  modalButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center'
  }
})

export default Login
