import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { getUser } from "./../../services/userStorage"

const UserShow = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async() => {
      try{
        const email = route.params?.email || ""
        const dataUser = await getUser(email)
        if(dataUser !== undefined && dataUser !== null){
          setUser(JSON.parse(dataUser))
        }
        else{
          setVisible(true)
        }
      }
      catch(e){
        console.log("Error: ", e)
      }
    }

    if(isFocused){
      fetchUser()
    }
  }, [isFocused])

  const index = () => {
    setVisible(false)
    navigation.navigate("Usuários")
  }

  return(
    <View>
      <Text style={styles.title}>Usuário</Text>
      <Text>{user?.name}</Text>
      <Text>{user?.email}</Text>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.backgroundModal}>
          <View style={styles.modal}>
            <Text>Usuário não encontrado</Text>

            <View style={{display: "flex"}}>
              <TouchableOpacity onPress={index} style={styles.button}>
                <Text>Ver usuários</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setVisible(false)} style={styles.button}>
                <Text>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
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
  },
  button: {
    backgroundColor: "ligthBlue",
    width: "50%"
  }
})

export default UserShow
