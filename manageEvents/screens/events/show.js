import React, {useEffect, useState, useContext} from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { getEvent } from "./../../services/eventStorage"
import { createReserve } from "./../../services/reserveStorage"
import { AuthContext } from '../../services/authContext';

const EventShow = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false)
  const [visibleReserve, setVisibleReserve] = useState(false)
  const [event, setEvent] = useState(null)
  const {user, setUser} = useContext(AuthContext)

  useEffect(() => {
    const fetchEvent = async() => {
      try{
        const id = route.params?.id
        const dataEvent = await getEvent(id)
        if(dataEvent !== undefined && dataEvent !== null){
          setEvent(JSON.parse(dataEvent))
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
      fetchEvent()
    }
  }, [isFocused])

  const index = () => {
    setVisible(false)
    navigation.navigate("Eventos")
  }

  const addReserve = async () => {
    const dataReserve = await createReserve(event.id, user.email)
    setVisibleReserve(true)
  }

  const reserveShow = () => {
    setVisibleReserve(false)
    navigation.navigate("Reserva", {eventId: event.id})
  }

  return(
    <View>
      <Text style={styles.title}>Evento</Text>
      <Text>{event?.eventDate}</Text>
      <Text>{event?.eventLocal}</Text>
      <Text>{event?.description}</Text>

      <TouchableOpacity onPress={() => addReserve()}>
        <Text>Marcar presença</Text>
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.backgroundModal}>
          <View style={styles.modal}>
            <Text>Evento não encontrado</Text>

            <View style={{display: "flex"}}>
              <TouchableOpacity onPress={index} style={styles.button}>
                <Text>Ver eventos</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setVisible(false)} style={styles.button}>
                <Text>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={visibleReserve} animationType="slide" transparent={true}>
        <View style={styles.backgroundModal}>
          <View style={styles.modal}>
            <Text>Reserva realizada</Text>

            <View style={{display: "flex"}}>
              <TouchableOpacity onPress={() => reserveShow()} style={styles.button}>
                <Text>Ver reserva</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setVisibleReserve(false)} style={styles.button}>
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

export default EventShow
