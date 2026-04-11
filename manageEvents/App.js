import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import UserIndex from './screens/users/index';
import UserShow from './screens/users/show';
import UserNew from './screens/users/new';
import EventIndex from './screens/events/index';
import EventShow from './screens/events/show';
import { createEvents } from './services/eventStorage.js';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Eventos" component={EventIndex} />
      <Drawer.Screen name="Usuários" component={UserIndex} />
      <Drawer.Screen name="Cadastrar Usuário" component={UserNew} />
    </Drawer.Navigator>
  );
}

function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Usuários" component={DrawerRoutes} />
      <Stack.Screen name="Usuário" component={UserShow} />
      <Stack.Screen name="Cadastrar Usuário" component={UserNew} />
      <Stack.Screen name="Eventos" component={EventIndex} />
      <Stack.Screen name="Evento" component={EventShow} />
    </Stack.Navigator>
  );
}

export default function App() {

  // TODO fazer algo pra nao rodar toda vez
  useEffect(() => {
    const loadEvents = async () => {
      try {
        await createEvents();
        console.log("Eventos carregados");
      } catch (e) {
        console.log("Erro ao carregar eventos:", e);
      }
    };

    loadEvents();
  }, []);

  return (
    <NavigationContainer>
      <StackRoutes/>
    </NavigationContainer>
  );
}
