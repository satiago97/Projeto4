/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import qs from 'qs';


class OrcamentosService {
    getToken = async () => AsyncStorage.getItem('TOKEN')
    async getOrcamentos() {
        var token = await this.getToken();

        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/orcamentos/orcamentos',
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '0',
                _token: token,
                pag: '0',
                numRows: '25',
            },
            headers: {
                Accept: 'application/json',
            }
        });
    }

    async getOrcamentosDetail(id) {
        var token = await this.getToken();

        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/orcamentos/orcamentos',
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '1',
                idDocument: id,
                _token: token,
            },
            headers: {
                Accept: 'application/json',
            },
        });
    }

    async finalizarOrcamento(id) {
        var token = await this.getToken();

        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/orcamentos/orcamentos',
            method: 'PATCH',
            timeout: 5000,
            params: {
                opcao: '6',
                idOrcamento: id,
                _token: token,
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            }
        })
    }

    //falta o add orcamento mas quero ver quando fizer a parte dos orcamentos

    async deleteOrcamento(id) {
        var token = await this.getToken();

        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/orcamentos/orcamentos',
            method: 'DELETE',
            timeout: 5000,
            data: qs.stringify({
                opcao: '4',
                _token: token,
                idOrcamento: id,
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
        });
    }
}


const orcamentosService = new OrcamentosService();
export default orcamentosService;