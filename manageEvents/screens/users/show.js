import React, {useEffect, useState, useContext} from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
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

  const logar = () => {
    navigation.navigate("Login");
  }

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Usuário</Text>

      <View style={styles.profileCard}>
        <View style={styles.avatarCircle}>
          <FontAwesome name="user" size={32} color="#7C3AED" />
        </View>
        <Text style={styles.profileName}>{user?.name}</Text>
        <View style={styles.profileEmailRow}>
          <FontAwesome name="envelope-o" size={13} color="#9CA3AF" />
          <Text style={styles.profileEmail}>{user?.email}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        <FontAwesome name="ticket" size={15} color="#4C1D95" />
        {"  "}Minhas Reservas
      </Text>

      {
        (reserves.length === 0) ? (
          <View style={styles.emptyContainer}>
            <FontAwesome name="calendar-times-o" size={48} color="#DDD6FE" />
            <Text style={styles.emptyText}>Você ainda não marcou presença em nenhum evento</Text>
            <TouchableOpacity onPress={() => allEvents()} style={styles.button}>
              <FontAwesome name="calendar" size={15} color="#FFFFFF" />
              <Text style={styles.buttonText}>Ver eventos</Text>
            </TouchableOpacity>
          </View>
        ) : (
          reserves.map((reserve, index) => (
            <View style={styles.card} key={index}>
              {/* <Text>Evento: {events.find(event => event.id === reserve.eventId).name}</Text> */}
              <TouchableOpacity onPress={() => reserveShow(reserve.eventId)} style={styles.detailsButton}>
                <FontAwesome name="ticket" size={13} color="#FFFFFF" />
                <Text style={styles.detailsButtonText}>Ver reserva</Text>
              </TouchableOpacity>
            </View>
          ))
        )
      }

      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.backgroundModal}>
          <View style={styles.modal}>
            <FontAwesome name="lock" size={40} color="#7C3AED" style={{ marginBottom: 12 }} />
            <Text style={styles.modalTitle}>Você precisa estar logado</Text>
            <TouchableOpacity onPress={() => logar()} style={styles.modalButton}>
              <FontAwesome name="sign-in" size={14} color="#FFFFFF" />
              <Text style={styles.buttonText}>Logar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => users()} style={styles.modalButton}>
              <FontAwesome name="users" size={14} color="#FFFFFF" />
              <Text style={styles.buttonText}>Ver usuários</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisible(false)} style={styles.modalButtonSecondary}>
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
    marginBottom: 20,
    textAlign: 'center'
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    gap: 6
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937'
  },
  profileEmailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  profileEmail: {
    fontSize: 14,
    color: '#6B7280'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4C1D95',
    marginBottom: 12
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2
  },
  detailsButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  detailsButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 20,
    gap: 16
  },
  emptyText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 15
  },
  button: {
    backgroundColor: '#7C3AED',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
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

export default UserShow
