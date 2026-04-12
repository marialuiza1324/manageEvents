import React, {useEffect, useState, useContext} from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { getEvent } from "./../../services/eventStorage"
import { createReserve } from "./../../services/reserveStorage"
import { AuthContext } from '../../services/authContext';
import { FontAwesome } from '@expo/vector-icons';

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
    <View style={styles.container}>
      <Text style={styles.title}>Evento</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <FontAwesome name="calendar" size={18} color="#7C3AED" />
          <Text style={styles.infoText}>{event?.eventDate}</Text>
        </View>
        <View style={styles.row}>
          <FontAwesome name="map-marker" size={18} color="#7C3AED" />
          <Text style={styles.infoText}>{event?.eventLocal}</Text>
        </View>
        {event?.description ? (
          <View style={styles.row}>
            <FontAwesome name="info-circle" size={18} color="#7C3AED" />
            <Text style={styles.description}>{event.description}</Text>
          </View>
        ) : null}
      </View>

      <TouchableOpacity onPress={() => addReserve()} style={styles.button}>
        <FontAwesome name="check-circle" size={18} color="#FFFFFF" />
        <Text style={styles.buttonText}>Marcar presença</Text>
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.backgroundModal}>
          <View style={styles.modal}>
            <FontAwesome name="exclamation-circle" size={40} color="#EF4444" style={{ marginBottom: 12 }} />
            <Text style={styles.modalTitle}>Evento não encontrado</Text>
            <TouchableOpacity onPress={index} style={styles.modalButton}>
              <FontAwesome name="list" size={14} color="#FFFFFF" />
              <Text style={styles.buttonText}>Ver eventos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisible(false)} style={styles.modalButtonSecondary}>
              <Text style={styles.modalButtonSecondaryText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={visibleReserve} animationType="slide" transparent={true}>
        <View style={styles.backgroundModal}>
          <View style={styles.modal}>
            <FontAwesome name="check-circle" size={40} color="#10B981" style={{ marginBottom: 12 }} />
            <Text style={styles.modalTitle}>Reserva realizada!</Text>
            <TouchableOpacity onPress={() => reserveShow()} style={styles.modalButton}>
              <FontAwesome name="ticket" size={14} color="#FFFFFF" />
              <Text style={styles.buttonText}>Ver reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisibleReserve(false)} style={styles.modalButtonSecondary}>
              <Text style={styles.modalButtonSecondaryText}>Ok</Text>
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
    marginBottom: 20,
    textAlign: 'center'
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
    gap: 12
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  infoText: {
    fontSize: 15,
    color: '#1F2937',
    flex: 1
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    flex: 1
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

export default EventShow
