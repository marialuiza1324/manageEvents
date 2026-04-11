import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { getEvent } from "./../../services/eventStorage"

const EventShow = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false)
  const [event, setEvent] = useState(null)

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

  return(
    <View>
      <Text style={styles.title}>Evento</Text>
      <Text>{event?.eventDate}</Text>
      <Text>{event?.eventLocal}</Text>
      <Text>{event?.description}</Text>
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
