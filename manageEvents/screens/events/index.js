import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getAllEvents } from "./../../services/eventStorage"

const EventIndex = ({navigation}) => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const getEvents = async() => {
      try{
        const allEvents = await getAllEvents()
        setEvents(allEvents || [])
      }
      catch(e){
        console.log("Erro ao buscar eventos: " + e)
      }
    }

    getEvents()
  }, [])

  const fetchEvent = (id) => {
    navigation.navigate("Evento", {id: id});
  }

  return(
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Eventos Disponíveis</Text>
      <View style={styles.list}>
        {
          events.length === 0 ? (
            <View style={styles.emptyContainer}>
              <FontAwesome name="calendar-times-o" size={48} color="#DDD6FE" />
              <Text style={styles.emptyText}>Nenhum evento disponível</Text>
            </View>
          )
          : (
            events.map((event, index) => (
              <View style={styles.card} key={index}>
                <View style={styles.row}>
                  <FontAwesome name="calendar" size={15} color="#7C3AED" />
                  <Text style={styles.cardLabel}>Data: <Text style={styles.cardValue}>{event.eventDate}</Text></Text>
                </View>
                <View style={styles.row}>
                  <FontAwesome name="map-marker" size={15} color="#7C3AED" />
                  <Text style={styles.cardLabel}>Local: <Text style={styles.cardValue}>{event.eventLocal}</Text></Text>
                </View>
                <TouchableOpacity onPress={() => fetchEvent(event.id)} style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>Ver detalhes</Text>
                  <FontAwesome name="chevron-right" size={12} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ))
          )
        }
      </View>
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

export default EventIndex
