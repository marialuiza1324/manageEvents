import React, {useEffect, useState, useContext} from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
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
    <View style={styles.container}>
      <Text style={styles.title}>Reserva</Text>

      <View style={styles.qrContainer}>
        <QRCode value={JSON.stringify(formattedReserve)} size={180} />
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <FontAwesome name="map-marker" size={16} color="#7C3AED" />
          <Text style={styles.cardLabel}>Local do evento: <Text style={styles.cardValue}>{formattedReserve?.event}</Text></Text>
        </View>
        <View style={styles.row}>
          <FontAwesome name="calendar" size={15} color="#7C3AED" />
          <Text style={styles.cardLabel}>Data de reserva: <Text style={styles.cardValue}>{formattedReserve?.confirmationDate}</Text></Text>
        </View>
        <View style={styles.row}>
          <FontAwesome name="clock-o" size={15} color="#7C3AED" />
          <Text style={styles.cardLabel}>Hora de reserva: <Text style={styles.cardValue}>{formattedReserve?.confirmationHour}</Text></Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => eventShow()} style={styles.button}>
        <FontAwesome name="calendar" size={15} color="#FFFFFF" />
        <Text style={styles.buttonText}>Ver evento</Text>
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.backgroundModal}>
          <View style={styles.modal}>
            <FontAwesome name="exclamation-circle" size={40} color="#EF4444" style={{ marginBottom: 12 }} />
            <Text style={styles.modalTitle}>Reserva não encontrada</Text>
            <TouchableOpacity onPress={userShow} style={styles.modalButton}>
              <FontAwesome name="ticket" size={14} color="#FFFFFF" />
              <Text style={styles.buttonText}>Ver reservas</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisible(false)} style={styles.modalButtonSecondary}>
              <Text style={styles.modalButtonSecondaryText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={visibleEvent} animationType="slide" transparent={true}>
        <View style={styles.backgroundModal}>
          <View style={styles.modal}>
            <FontAwesome name="exclamation-circle" size={40} color="#EF4444" style={{ marginBottom: 12 }} />
            <Text style={styles.modalTitle}>Evento não encontrado</Text>
            <TouchableOpacity onPress={userShow} style={styles.modalButton}>
              <FontAwesome name="ticket" size={14} color="#FFFFFF" />
              <Text style={styles.buttonText}>Ver reservas</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisibleEvent(false)} style={styles.modalButtonSecondary}>
              <Text style={styles.modalButtonSecondaryText}>Fechar</Text>
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
    backgroundColor: '#F5F3FF',
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4C1D95',
    textAlign: 'center',
    marginBottom: 24
  },
  qrContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    gap: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  cardLabel: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1
  },
  cardValue: {
    color: '#1F2937',
    fontWeight: '500'
  },
  button: {
    backgroundColor: '#7C3AED',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15
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
    alignItems: 'center',
    gap: 10
  },
  modalTitle: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '600'
  },
  modalButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8
  },
  modalButtonSecondary: {
    borderWidth: 1,
    borderColor: '#DDD6FE',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%'
  },
  modalButtonSecondaryText: {
    color: '#7C3AED',
    fontWeight: '600',
    fontSize: 15
  }
})

export default ReserveShow
