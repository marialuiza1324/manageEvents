import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Eventos Disponíveis</Text>
      <View style={styles.events}>
        {
          events.length === 0 ? (
            <Text>Nenhum evento</Text>
          )
          : (
            events.map((event, index) => (
              <View style={styles.event} key={index}>
                <View>
                  <Text>Data: {event.eventDate}</Text>
                  <Text>Local: {event.eventLocal}</Text>
                </View>

                <TouchableOpacity onPress={() => fetchEvent(event.id)} style={styles.detailsButton}>
                  <Text>Ver detalhes</Text>
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
  events: {
    marginTop: 20,
  },
  event: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 5,
    padding: 4
  },
  eventInfo: {
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

export default EventIndex
