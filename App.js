import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import { NativeBaseProvider } from 'native-base';
import Login from './screens/Login';
import Menu from './screens/Menu';
import Tabelas from './screens/Tabelas';
import { StatusBar } from 'react-native';
import Orcamentos from './screens/Orcamentos';
import DocTransporte from './screens/DocTransporte';
import Vendas from './screens/Vendas';
import Compras from './screens/Compras';
import Analise from './screens/Analise';

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
      <Drawer.Screen name="Orçamentos" component={Orcamentos} options={{ headerShown: false }} />
      <Drawer.Screen name="Doc. de Transporte" component={DocTransporte} options={{ headerShown: false }} />
      <Drawer.Screen name="Vendas" component={Vendas} options={{ headerShown: false }} />
      <Drawer.Screen name="Compras" component={Compras} options={{ headerShown: false }} />
      <Drawer.Screen name="Análise" component={Analise} options={{ headerShown: false }} />
      <Drawer.Screen name="SAF-T" component={Tabelas} options={{ headerShown: false }} />
      <Drawer.Screen name="Tabelas" component={Tabelas} options={{ headerShown: false }} />
      <Drawer.Screen name="Mapas" component={Tabelas} options={{ headerShown: false }} />
      <Drawer.Screen name="EncomendaAqui" component={Tabelas} options={{ headerShown: false }} />
      <Drawer.Screen name="POS" component={Tabelas} options={{ headerShown: false }} />
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
            title="20"
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
