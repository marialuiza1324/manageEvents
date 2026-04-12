import React, {useEffect, useState, useContext} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput } from 'react-native';
import {getUser} from "../../services/userStorage.js"
import { AuthContext } from '../../services/authContext';


const Login = ({navigation}) => {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState("luiza@email.com")
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
    <View>
      <Text>Login</Text>
      <TextInput value={email} onChangeText={(email) => setEmail(email)} placeholder="E-mail" style={styles.input}></TextInput>
      <TouchableOpacity onPress={verifyLogin} style={styles.button}>
        <Text>Entrar</Text>
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.backgroundModal}>
          <View style={styles.modal}>
            <Text>Usuário não encontrado</Text>

            <View style={{display: "flex"}}>
              <TouchableOpacity onPress={() => setVisible(false)} style={styles.button}>
                <Text>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderColor: "black",
    borderWidth: 1,
    padding: 1,
    borderRadius: 5,
    width: "80%",
    marginTop: 10
  },
  button: {
    borderColor: "purple",
    borderWidth: 1,
    marginTop: 20,
    width: "30%",
    padding: 3,
    borderRadius: 4
  },
  title: {
    fontWeight: "bold",
    textSize: 20
  },
  backgroundModal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1
  },
  modal: {
    width: "70%",
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10
  }
})

export default Login
