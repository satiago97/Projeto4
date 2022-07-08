/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import qs from 'qs';

class FornecedoresService {
    getToken = async () => AsyncStorage.getItem('TOKEN');

    async getFornecedores() {
        var token = await this.getToken();

        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/tabelas/fornecedores',
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '0',
                pag: '0',
                numRows: '25',
                _token: token,
            },
            headers: {
                Accept: 'application/json',
            },
        });
    }

    async getFornecedorDetails(id) {
        var token = await this.getToken();

        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/tabelas/fornecedores',
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '1',
                idFornecedor: id,
                _token: token,
            },
            headers: {
                Accept: 'application/json',
            },
        });
    }

    async deleteFornecedor(id) {
        var token = await this.getToken();

        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/tabelas/fornecedores',
            method: 'DELETE',
            timeout: 5000,
            data: qs.stringify({
                opcao: '4',
                _token: token,
                idFornecedor: id,
            }),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        })
    }


}

const fornecedoresService = new FornecedoresService();
export default fornecedoresService;