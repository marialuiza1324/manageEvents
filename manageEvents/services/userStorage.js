import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createUser = async (name, email) => {
  try{
    const user = JSON.stringify({name: name, email: email})
    await AsyncStorage.setItem(`user:${email}`, user)
    console.log("Usuário criado")
    return user
  }
  catch(e){
    console.log("Erro ao cadastrar usuário " + name + " : " + e)
  }
}

export const getUser = async (email) => {
  //TODO validacao se vier vazio e se nao tiver resultado
  try{
    const user = await AsyncStorage.getItem(`user:${email}`)
    return user
  }
  catch(e){
    console.log("Erro ao buscar usuário " + email + " : " + e)
  }
}

export const getAllUser = async () => {
  try{
    const keys = await AsyncStorage.getAllKeys();
    const userKeys = keys.filter(k => k.startsWith("user:"));

    if(!userKeys || userKeys.length === 0){
      return []
    }

    const dataUsers = await AsyncStorage.multiGet(userKeys)
    const users = dataUsers.map(([key, value]) => {
      return JSON.parse(value)
    })

    return users
  }
  catch(e){
    console.log("Erro ao buscar usuários: " + e)
  }
}
