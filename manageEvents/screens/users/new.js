import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { createUser } from "./../../services/userStorage"

const UserNew = ({navigation}) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

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
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <FontAwesome name="user-plus" size={44} color="#7C3AED" />
      </View>
      <Text style={styles.title}>Cadastrar Usuário</Text>

      <View style={styles.inputWrapper}>
        <FontAwesome name="user" size={16} color="#9CA3AF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={name => setName(name)}
        />
      </View>

      <View style={styles.inputWrapper}>
        <FontAwesome name="envelope-o" size={15} color="#9CA3AF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={email => setEmail(email)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity onPress={addUser} style={styles.button}>
        <FontAwesome name="check" size={16} color="#FFFFFF" />
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={clean} style={styles.buttonSecondary}>
        <FontAwesome name="eraser" size={16} color="#7C3AED" />
        <Text style={styles.buttonSecondaryText}>Limpar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3FF',
    padding: 24,
    justifyContent: 'center'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 12
  },
  title: {
    fontSize: 22,
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
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: '#DDD6FE',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8
  },
  buttonSecondaryText: {
    color: '#7C3AED',
    fontWeight: '600',
    fontSize: 16
  }
})

export default UserNew
