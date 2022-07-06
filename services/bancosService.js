/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import qs from 'qs';

class BancosService {
    getToken = async () => AsyncStorage.getItem('TOKEN');
    async getBancos() {
        var token = await this.getToken();

        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/tabelas/bancos',
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

    async getBancoDetails(id) {
        var token = await this.getToken();

        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/tabelas/bancos',
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '1',
                idBanco: id,
                _token: token
            },
            headers: {
                Accept: 'application/json',
            },
        });
    }

    async addBanco(nome, numero_snc) {
        var token = await this.getToken();
        console.log("numero" + numero_snc, "nome" + nome)
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/tabelas/bancos',
            method: 'POST',
            timeout: 5000,
            data: qs.stringify({
                opcao: '2',
                _token: token,
                snc_base_banco: numero_snc,
                debito_banco: '0.00',
                credito_banco: '0.00',
                flagPredefinir: '0',
                descricao_banco: nome,
            }),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log("error" + error)
        })

    }

    async deleteBanco(id) {
        var token = await this.getToken();
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/tabelas/bancos',
            method: 'DELETE',
            timeout: 5000,
            data: qs.stringify({
                opcao: '4',
                _token: token,
                idBanco: id,
            }),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });
    }

}


const bancosService = new BancosService();
export default bancosService;