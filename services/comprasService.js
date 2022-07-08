/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import qs from 'qs';


class ComprasService {
    getToken = async () => AsyncStorage.getItem('TOKEN')

    async getCompras() {
        var token = await this.getToken();
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/compras/compras',
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '0',
                _token: token,
                pag: '0',
                numRows: '25',
                table_usage: '1'
            },
            headers: {
                Accept: 'application/json',
            },
        });
    }

    async getComprasDetails(id) {
        var token = await this.getToken();
        console.log(id);
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/compras/compras',
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '1',
                idCompra: id,
                _token: token
            },
            headers: {
                Accept: 'application/json',
            },
        });
    }


    async finalizarCompra(id) {
        var token = await this.getToken();
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/compras/compras',
            method: 'PATCH',
            timeout: 5000,
            data : qs.stringify({
                opcao: '6',
                _token: token,
                idCompra: id,
        }),
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });
    }

    async anularCompra(id) {
        var token = await this.getToken();
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/compras/compras',
            method: 'PATCH',
            timeout: 5000,
            data : qs.stringify({
                opcao: '5',
                _token: token,
                idCompra: id,
        }),
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });
    }


    async deleteCompra(id) {
        var token = await this.getToken();

        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/compras/compras',
            method: 'DELETE',
            timeout: 5000,
            data: qs.stringify({
                opcao: '4',
                _token: token,
                idCompra: id
            }),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });
    }

}

const comprasService = new ComprasService();
export default comprasService;