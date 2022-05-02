import React, { useState, useEffect } from 'react';
import loginService from '../services/loginService';
import { ActivityIndicator } from 'react-native';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Alert, Button } from 'native-base';

export default function Login({ navigation }) {
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 80 }));

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const entrar = () => {
    let data = {
      username: username,
      password: password,
    };
    console.log(data);

    loginService.login(data).then(response => {
      setLoading(false);
      if (response.data.errors == false) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }
    });
  };

  useEffect(() => {
    Animated.spring(offset.y, {
      toValue: 0,
      speed: 4,
      bounciness: 20,
      useNativeDriver: true,
    }).start();
  }, [offset.y]);
  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Image source={require('../src/assets/logo.png')} />
      </View>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateY: offset.y }],
          },
        ]}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          autoCorrect={false}
          value={username}
          onChangeText={value => setUsername(value)}
          require
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCorrect={false}
          value={password}
          onChangeText={value => setPassword(value)}
          required
        />
        {isLoading && <ActivityIndicator />}
        {!isLoading &&
          <Button style={styles.btnSubmit} onPress={() => entrar()}>
            <Text style={styles.submitText}>Entrar</Text>
          </Button>
        }
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AFAAA5',
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginBottom: 60,
  },
  input: {
    backgroundColor: '#fff',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  btnSubmit: {
    backgroundColor: '#9C5D26',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  submitText: {
    color: '#FFF',
    fontSize: 18,
  },
});
