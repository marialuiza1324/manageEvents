import React, {useEffect, useState, useContext} from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { getAllReserve } from "./../../services/reserveStorage"
import { getAllEvents } from "./../../services/eventStorage"
import { AuthContext } from '../../services/authContext';

const UserShow = ({navigation}) => {
  const [visible, setVisible] = useState(false)
  const {user, setUser} = useContext(AuthContext)
  const [reserves, setReserves] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchUser = async() => {
      if(!user){
        setVisible(true)
        return
      }

      try{
        const dataReserves = await getAllReserve(user.email)
        setReserves(dataReserves)
      }
      catch(e){
        console.log("Erro ao buscar reservas: ", e)
      }

      try{
        const dataEvents = await getAllEvents()
        setEvents(dataEvents)
      }
      catch(e){
        console.log("Erro ao buscar eventos: ", e)
      }
    }

    fetchUser()
  }, [user])

  const users = () => {
    setVisible(false)
    navigation.navigate("Usuários")
  }

  const allEvents = () => {
    navigation.navigate("Eventos")
  }

  const reserveShow = (eventId) => {
    navigation.navigate("Reserva", {eventId: eventId});
  }

  return(
    <View>
      <Text style={styles.title}>Usuário</Text>
      <Text>{user?.name}</Text>
      <Text>{user?.email}</Text>
      {
        (reserves.length === 0) ? (
          <View>
            <Text>Você ainda não marcou presença em nenhum evento</Text>
            <TouchableOpacity onPress={() => allEvents()}>
              <Text>Ver eventos</Text>
            </TouchableOpacity>
          </View>
        ) : (
          reserves.map((reserve, index) => (
            <View style={styles.event} key={index}>
              {/* <Text>Evento: {events.find(event => event.id === reserve.eventId).name}</Text> */}
              <TouchableOpacity onPress={() => reserveShow(reserve.eventId)} style={styles.detailsButton}>
                <Text>Ver reserva</Text>
              </TouchableOpacity>
            </View>
          ))
        )
      }
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.backgroundModal}>
          <View style={styles.modal}>
            <Text>Você precisa estar logado</Text>

            <View style={{display: "flex"}}>
              <TouchableOpacity onPress={() => users()} style={styles.button}>
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
    backgroundColor: "ligthblue",
    width: "50%"
  }
})

export default UserShow
