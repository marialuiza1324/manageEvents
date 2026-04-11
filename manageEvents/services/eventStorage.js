import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import instance from "./eventsApi.js"

export const createEvents = async () => {
  try{
    const response = await instance.get()
    const events = response.data

    for(const event of events){
      const dataEvent =  await getEvent(event.id)
      if(dataEvent === null || dataEvent === undefined){
        AsyncStorage.setItem(`event:${event.id}`, JSON.stringify(event))
      }
      else{
        console.log("Evento já criado: " + event.id)
      }
    }
    console.log("Eventos criados")
  }
  catch(e){
    console.log("Erro ao cadastrar eventos: " + e)
  }
}

export const getEvent = async (id) => {
  //TODO validacao se vier vazio e se nao tiver resultado
  try{
    const event = await AsyncStorage.getItem(`event:${id}`)
    return event
  }
  catch(e){
    console.log("Erro ao buscar evento " + id + " : " + e)
  }
}

export const getAllEvents = async () => {
  try{
    const keys = await AsyncStorage.getAllKeys();
    const eventKeys = keys.filter(k => k.startsWith("event:"));

    if(!eventKeys || eventKeys.length === 0){
      return []
    }

    const dataEvents = await AsyncStorage.multiGet(eventKeys)
    const events = dataEvents.map(([key, value]) => {
      return JSON.parse(value)
    })

    return events
  }
  catch(e){
    console.log("Erro ao buscar eventos: " + e)
  }
}
