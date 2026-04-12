import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Usuários Cadastrados</Text>
      <View style={styles.list}>
        {
          users.length === 0 ? (
            <View style={styles.emptyContainer}>
              <FontAwesome name="users" size={48} color="#DDD6FE" />
              <Text style={styles.emptyText}>Nenhum usuário cadastrado</Text>
            </View>
          )
          : (
            users.map((user, index) => (
              <View style={styles.card} key={index}>
                <View style={styles.row}>
                  <FontAwesome name="user" size={15} color="#7C3AED" />
                  <Text style={styles.cardLabel}>Nome: <Text style={styles.cardValue}>{user.name}</Text></Text>
                </View>
                <View style={styles.row}>
                  <FontAwesome name="envelope" size={13} color="#7C3AED" />
                  <Text style={styles.cardLabel}>Email: <Text style={styles.cardValue}>{user.email}</Text></Text>
                </View>
                <TouchableOpacity onPress={() => fetchUser(user.email)} style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>Ver detalhes</Text>
                  <FontAwesome name="chevron-right" size={12} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ))
          )
        }
      </View>

      <TouchableOpacity onPress={createUser} style={styles.button}>
        <FontAwesome name="user-plus" size={16} color="#FFFFFF" />
        <Text style={styles.buttonText}>Cadastrar Usuário</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3FF'
  },
  content: {
    padding: 20,
    paddingBottom: 40
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4C1D95',
    marginBottom: 20
  },
  list: {
    gap: 12
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    gap: 8
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  cardLabel: {
    fontSize: 14,
    color: '#6B7280'
  },
  cardValue: {
    color: '#1F2937',
    fontWeight: '500'
  },
  detailsButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  detailsButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13
  },
  button: {
    backgroundColor: '#7C3AED',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
    gap: 16
  },
  emptyText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 15
  }
})

export default UserIndex
