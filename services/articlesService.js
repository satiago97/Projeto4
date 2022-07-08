/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import qs from 'qs';


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

    async getArtigo(id) {
        var token = await this.getToken();
        console.log(id)
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/tabelas/artigos',
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '1',
                idArtigo: id,
                _token: token
            },
            headers: {
                Accept: 'application/json',
            },
        });
    }


    async editArtigo(dadosArt) {
        console.log(dadosArt);
        var token = await this.getToken();
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/tabelas/artigos',
            method: 'PUT',
            timeout: 5000,
            data : qs.stringify({
                opcao: '3',
                _token: token,
                idArtigo: dadosArt.ID_Artigo,
                codigo_artigo:dadosArt.Codigo,
                nome_artigo: dadosArt.Nome,
                categoria_artigo: dadosArt.Categoria,
                tipo_artigo: dadosArt.Tipo,
                stock_artigo: dadosArt.Stock,
                unidade_artigo: dadosArt.Unidade,
                precoPVP_artigo: dadosArt.PrecoPVP,
                imposto_artigo: dadosArt.IVA , 
                preco_artigo: dadosArt.Preco ,
                codigobarras_artigo: dadosArt.CodigoBarras,
                numeroserie_artigo: dadosArt.SerialNumber,
                retencao_valor_artigo: dadosArt.RetencaoValor,
                retencao_percenteagem_artigo: dadosArt.RetencaoPercentagem,
                observacoes_artigo: dadosArt.DescricaoLonga
        }),
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });
    }



    async deleteArtigo(id) {
        var token = await this.getToken();
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/tabelas/artigos',
            method: 'DELETE',
            timeout: 5000,
            data : qs.stringify({
                opcao: '4',
                _token: token,
                idArtigo: id
                }),
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });
    }


    async addArtigo(dadosArt) {
        console.log(dadosArt);
        var token = await this.getToken();
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/tabelas/artigos',
            method: 'POST',
            timeout: 5000,
            data : {
                opcao: '2',
                _token: token,
                codigo_artigo:dadosArt.Codigo,
                nome_artigo: dadosArt.Nome,
                categoria_artigo: dadosArt.Categoria,
                tipo_artigo: dadosArt.Tipo,
                stock_artigo: dadosArt.Stock,
                unidade_artigo: dadosArt.Unidade,
                precoPVP_artigo: dadosArt.PrecoPVP,
                imposto_artigo: dadosArt.IVA , 
                preco_artigo: dadosArt.Preco ,
                codigobarras_artigo: dadosArt.CodigoBarras,
                numeroserie_artigo: dadosArt.SerialNumber,
                retencao_valor_artigo: dadosArt.RetencaoValor,
                retencao_percenteagem_artigo: dadosArt.RetencaoPercentagem,
                observacoes_artigo: dadosArt.DescricaoLonga
        },
        headers: {
            Accept: 'application/json',
        }
        });
    }

}

const articlesService = new ArticlesService();
export default articlesService;
