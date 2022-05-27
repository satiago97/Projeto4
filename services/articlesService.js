/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


class ArticlesService {
    getToken = async () => AsyncStorage.getItem('TOKEN')
    async getArtigos() {
        var token = await this.getToken();

        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/tabelas/artigos',
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
            },
        });
    }
}

const articlesService = new ArticlesService();
export default articlesService;
