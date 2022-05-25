/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

class clientsService {

    getToken = async () => AsyncStorage.getItem('TOKEN')
    async getclientes() {
        var token = await this.getToken();
        console.log(token);
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/tabelas/clientes',
            method: 'GET',
            timeout: 5000,
            headers: {
                Accept: 'application/json',
            },
            data: {
                _token: token,
                opcao: '0',
                pag: '0',
                numRows: '25',
                table_usage: '1',
            }
        });
    }
}


