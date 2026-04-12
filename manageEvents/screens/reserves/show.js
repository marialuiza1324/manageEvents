import React, {useEffect, useState, useContext} from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { getReserve } from "./../../services/reserveStorage"
import { getEvent } from "./../../services/eventStorage"
import { AuthContext } from '../../services/authContext';
import QRCode from 'react-native-qrcode-svg';

const ReserveShow = ({navigation, route}) => {
  const [visible, setVisible] = useState(false)
  const [visibleEvent, setVisibleEvent] = useState(false)
  const [reserve, setReserve] = useState(null)
  const [formattedReserve, setFormattedReserve] = useState(null)
  const [event, setEvent] = useState(null)
  const {user, setUser} = useContext(AuthContext)

  useEffect(() => {
    const fetchReserve = async() => {
      try{
        const eventId = route.params?.eventId || ""
        const dataReserve = await getReserve(eventId, user.email)
        if(!dataReserve){
          setVisible(true)
          return
        }

        setReserve(dataReserve)
        const dataEvent = await getEvent(dataReserve.eventId)
        if(!dataEvent){
          setVisibleEvent(true)
          return
        }
        setEvent(JSON.parse(dataEvent))
      }
      catch(e){
        console.log("Erro ao buscar reserva: ", e)
      }

      setFormattedReserve(
        {
          name: user.name,
          email: user.email,
          event: event?.eventLocal,
          confirmationDate: reserve.confirmationDate,
          confirmationHour: reserve.confirmationHour
        }
      )
    }

    fetchReserve()
  }, [reserve])

  const userShow = () => {
    setVisible(false)
    setVisibleEvent(false)
    navigation.navigate("User")
  }

  const eventShow = () => {
    setVisible(false)
    navigation.navigate("Evento", {id: reserve.eventId})
  }

  return(
    <View>
      <Text style={styles.title}>Reserva</Text>

      <QRCode value={JSON.stringify(formattedReserve)} size={200} />

      <Text>Local do evento: {formattedReserve?.event}</Text>
      <Text>Data de reserva: {formattedReserve?.confirmationDate}</Text>
      <Text>Hora de reserva: {formattedReserve?.confirmationHour}</Text>

      <TouchableOpacity onPress={() => eventShow()}>
        <Text>Ver evento</Text>
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.backgroundModal}>
          <View style={styles.modal}>
            <Text>Reserva não encontrada</Text>

            <View style={{display: "flex"}}>
              <TouchableOpacity onPress={userShow} style={styles.button}>
                <Text>Ver reservas</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setVisible(false)} style={styles.button}>
                <Text>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={visibleEvent} animationType="slide" transparent={true}>
        <View style={styles.backgroundModal}>
          <View style={styles.modal}>
            <Text>Evento não encontrado</Text>

            <View style={{display: "flex"}}>
              <TouchableOpacity onPress={userShow} style={styles.button}>
                <Text>Ver reservas</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setVisibleEvent(false)} style={styles.button}>
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

export default ReserveShow
