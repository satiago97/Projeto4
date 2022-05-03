/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

class LoginService {

    async login(data) {
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/auth/login',
            method: 'POST',
            timeout: 5000,
            data: data,
            headers: {
                Accept: 'application/json',
            },
        }).then(response => {
            AsyncStorage.setItem("TOKEN", response.data._token)
            return Promise.resolve(response);
        })
            .catch(error => {
                return Promise.resolve(403);
            });
    }
}

const loginService = new LoginService();
export default loginService;
