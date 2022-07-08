/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import qs from 'qs';

class FaturasService {
    getToken = async () => AsyncStorage.getItem('TOKEN')

    async addFatura(dadosFatura) {
        var token = await this.getToken();

        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/vendas/faturas',
            method: 'POST',
            timeout: 5000,
            data: qs.stringify({
                opcao: '2',
                _token: token,
                cliente: dadosFatura.cliente,
                serie: dadosFatura.serie,
                numero: dadosFatura.numero,
                moeda: 1,
                data: dadosFatura.data,
                validade: dadosFatura.validade,
                linhas: dadosFatura.linhas,
            }),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });
    }

    async getFaturas() {
        var token = await this.getToken();
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/vendas/faturas',
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

    async getFaturaDetail(id) {
        var token = await this.getToken();
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/vendas/faturas',
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '1',
                idDocument: id,
                _token: token
            },
            headers: {
                Accept: 'application/json',
            }
        });
    }

    async editFatura(dadosFatura) {
        var token = await this.getToken();
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/vendas/faturas',
            method: 'PUT',
            timeout: 5000,
            data: qs.stringify({
                opcao: '3',
                _token: token,
                cliente: dadosFatura.ID_Cliente,
                serie: dadosFatura.Serie,
                numero: dadosFatura.Numero,
                data: dadosFatura.Data,
                validade: dadosFatura.Validade,
                referencia: dadosFatura.referencia,
                pagamento: dadosFatura.Pagamento,
                banco: dadosFatura.Banco,
                vencimento: dadosFatura.Vencimento,
                moeda: dadosFatura.Moeda,
                desconto: dadosFatura.Desconto,
                observacoes: dadosFatura.Observacoes,
                linhas: dadosFatura.Linhas,
                finalizarDocumento: dadosFatura.FinalizarDocumento,
                precisaBanco: dadosFatura.PrecisaBanco,
                centrocusto: dadosFatura.Centocusto,
            }),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });
    }

    async deleteFatura(id) {
        var token = await this.getToken();
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/vendas/faturas',
            method: 'DELETE',
            timeout: 5000,
            data: qs.stringify({
                opcao: '5',
                _token: token,
                idFatura: id,
            }),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });
    }

}

const faturasService = new FaturasService();
export default faturasService;
