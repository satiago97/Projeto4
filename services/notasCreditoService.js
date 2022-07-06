/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import qs from 'qs';


class NotasCreditoService {
    getToken = async () => AsyncStorage.getItem('TOKEN')

    async getNotas() {
        var token = await this.getToken();
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/vendas/notas_credito',
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '0',
                pag: '0',
                numRows: '25',
                _token: token
            },
            headers: {
                Accept: 'application/json',
            }
        });
    }

    async getNotasDetails(id) {
        var token = await this.getToken();
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/vendas/notas_credito',
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '1',
                idDocument: id,
                _token: token
            },
            headers: {
                Accept: 'application/json',
            },
        });
    }

}

const notasCreditoService = new NotasCreditoService();
export default notasCreditoService;