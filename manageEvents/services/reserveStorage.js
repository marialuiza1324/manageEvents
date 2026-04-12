import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createReserve = async (eventId, userEmail) => {
  //TODO nao criar duplicado
  try{
    const now = new Date()
    const reserve = {eventId: eventId, userEmail: userEmail, confirmationDate: now.toLocaleDateString(), confirmationHour: now.toLocaleTimeString()}
    const reserves = await getAllReserve(userEmail)
    const dataReserve = await getReserve(eventId, userEmail)
    if(dataReserve === null){
      reserves.push(reserve)
      await AsyncStorage.setItem(`reserve:user:${userEmail}`, JSON.stringify(reserves))
      console.log("Reserva feita")
    }
    else{
      console.log("Reserva já feita para o evento: " + eventId)
    }

    return reserve
  }
  catch(e){
    console.log("Erro ao efetuar reserva: " + e)
  }
}

export const getReserve = async (eventId, userEmail) => {
  //TODO validacao se vier vazio e se nao tiver resultado - na view
  try{
    const reserves = await getAllReserve(userEmail)
    const reserve = reserves.find((r) => r.eventId === eventId)
    return reserve || null
  }
  catch(e){
    console.log("Erro ao encontrar reserva: " + e)
  }
}

export const getAllReserve = async (userEmail) => {
  try{
    const reserves = await AsyncStorage.getItem(`reserve:user:${userEmail}`);
    if(reserves === undefined || reserves === null){
      return []
    }

    return JSON.parse(reserves)
  }
  catch(e){
    console.log("Erro ao encontrar reservas: " + e)
  }
}
