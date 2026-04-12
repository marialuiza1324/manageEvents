import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createEvents } from './services/eventStorage.js';
import { AuthContext } from './services/authContext';

import Login from './screens/login/index';
import UserIndex from './screens/users/index';
import UserShow from './screens/users/show';
import UserNew from './screens/users/new';
import EventIndex from './screens/events/index';
import EventShow from './screens/events/show';
import ReserveShow from './screens/reserves/show';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Eventos" component={EventIndex} />
      <Drawer.Screen name="Usuários" component={UserIndex} />
    </Drawer.Navigator>
  );
}

function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Gerenciador de Eventos" component={DrawerRoutes} />
      <Stack.Screen name="Cadastrar Usuário" component={UserNew} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Usuários" component={UserIndex} />
      <Stack.Screen name="Usuário" component={UserShow} />
      <Stack.Screen name="Eventos" component={EventIndex} />
      <Stack.Screen name="Evento" component={EventShow} />
      <Stack.Screen name="Reserva" component={ReserveShow} />
    </Stack.Navigator>
  );
}

export default function App() {

  const [user, setUser] = useState(null);

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
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <StackRoutes/>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
