/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

class ClientsService {

    getToken = async () => AsyncStorage.getItem('TOKEN')
    async getclientes() {
        var token = await this.getToken();
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/tabelas/clientes',
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '0',
                pag: '0',
                numRows: '25',
                table_usage: '1',
                _token: token
            },
            headers: {
                Accept: 'application/json',
            },
        });
    }
}

const clientsService = new ClientsService();
export default clientsService;


