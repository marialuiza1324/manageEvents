import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { createUser } from "./../../services/userStorage"

const UserNew = ({navigation}) => {
  const [name, setName] = useState("Luiza")
  const [email, setEmail] = useState("luiza@email.com")

  const clean = () => {
    setName("")
    setEmail("")
  }

  const addUser = async () => {
    //TODO verificar se o email ja nao existe
    const user = await createUser(name, email)
    clean()
    userShow(user)
  }

  const userShow = (user) => {
    const parseUser = JSON.parse(user)
    navigation.navigate("Usuário", {email: parseUser.email});
  }

  return(
    <View>
      <Text>Cadastrar Usuário</Text>
      <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={name => setName(name)}></TextInput>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={email => setEmail(email)}></TextInput>

      <TouchableOpacity onPress={addUser} style={styles.button}>
        <Text>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={clean} style={styles.button}>
        <Text>Limpar</Text>
      </TouchableOpacity>
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
  }
})

export default UserNew
