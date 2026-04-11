import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { getAllUser } from "./../../services/userStorage"

const UserIndex = ({navigation}) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async() => {
      try{
        const allUsers = await getAllUser()
        setUsers(allUsers || [])
      }
      catch(e){
        console.log("Erro ao buscar usuários: " + e)
      }
    }

    getUsers()
  }, [])

  const createUser = () => {
    navigation.navigate("Cadastrar Usuário");
  }

  const fetchUser = (email) => {
    navigation.navigate("Usuário", {email: email});
  }

  return(
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Usuários Cadastrados</Text>
      <View style={styles.users}>
        {
          users.length === 0 ? (
            <Text>Você ainda não possui usuários</Text>
          )
          : (
            users.map((user, index) => (
              <View style={styles.user} key={index}>
                <View>
                  <Text>Nome: {user.name}</Text>
                  <Text>Email: {user.email}</Text>
                </View>

                <TouchableOpacity onPress={() => fetchUser(user.email)} style={styles.detailsButton}>
                  <Text>Ver detalhes</Text>
                </TouchableOpacity>
              </View>
            ))
          )
        }
      </View>

      <TouchableOpacity onPress={createUser} style={styles.button}>
        <Text>Cadastrar Usuário</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 50,
    marginLeft: 10,
    marginRight: 10,
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  users: {
    marginTop: 20,
  },
  user: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 5,
    padding: 4
  },
  userInfo: {
    flexDirection: "row",
    gap: 20
  },
  detailsButton: {
    backgroundColor: "#ccc",
    padding: 5,
    alignSelf: 'flex-start',
    marginTop: 20,
    borderRadius: 4
  },
  button: {
    backgroundColor: "#aac",
    marginTop: 20,
    padding: 5,
    alignSelf: 'flex-center',
    borderRadius: 4
  }
})

export default UserIndex
