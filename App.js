import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import { NativeBaseProvider } from 'native-base';
import Login from './screens/Login';
import Menu from './screens/Menu';
import About from './screens/About';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Home() {
  return (
    <Drawer.Navigator
      initialRouteName="Menu"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#AFAAA5',
          width: 250,
        }
      }}>
      <Drawer.Screen
        name="Menu"
        component={Menu}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name="Orçamentos" component={About} />
      <Drawer.Screen name="Doc. de Transporte" component={About} />
      <Drawer.Screen name="Vendas" component={About} />
      <Drawer.Screen name="Compras" component={About} />
      <Drawer.Screen name="Análise" component={About} />
      <Drawer.Screen name="SAF-T" component={About} />
      <Drawer.Screen name="Tabelas" component={About} />
      <Drawer.Screen name="Mapas" component={About} />
      <Drawer.Screen name="EncomendaAqui" component={About} />
      <Drawer.Screen name="POS" component={About} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NativeBaseProvider>
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
