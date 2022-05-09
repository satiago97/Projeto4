import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import { NativeBaseProvider } from 'native-base';
import Login from './screens/Login';
import Menu from './screens/Menu';
import About from './screens/About';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Home() {
  return (
    <Drawer.Navigator
      initialRouteName="Menu"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#FFFFFF',
          width: 250,
        }
      }}>
      <Drawer.Screen
        name="Menu"
        component={Menu}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name="Orçamentos" component={About} options={{ headerShown: false }}/>
      <Drawer.Screen name="Doc. de Transporte" component={About} options={{ headerShown: false }}/>
      <Drawer.Screen name="Vendas" component={About} options={{ headerShown: false }}/>
      <Drawer.Screen name="Compras" component={About} options={{ headerShown: false }}/>
      <Drawer.Screen name="Análise" component={About} options={{ headerShown: false }}/>
      <Drawer.Screen name="SAF-T" component={About} options={{ headerShown: false }}/>
      <Drawer.Screen name="Tabelas" component={About} options={{ headerShown: false }}/>
      <Drawer.Screen name="Mapas" component={About} options={{ headerShown: false }}/>
      <Drawer.Screen name="EncomendaAqui" component={About} options={{ headerShown: false }}/>
      <Drawer.Screen name="POS" component={About} options={{ headerShown: false }}/>
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar
        backgroundColor="#AF7633"
        barStyle="light-content"
     />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
