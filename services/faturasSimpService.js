/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import qs from 'qs';


class FaturasSimpService {
    getToken = async () => AsyncStorage.getItem('TOKEN')

    async getFaturasSimp() {
        var token = await this.getToken();
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/vendas/faturas_simplificadas',
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '0',
                _token: token,
                numRows: '25',
                pag: '0',
            },
            headers: {
                Accept: 'application/json',
            }
        });
    }

    async getFaturaSimpDetail(id) {
        var token = await this.getToken();
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/vendas/faturas_simplificadas',
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '1',
                idDocument: id,
                _token: token,
            },
            headers: {
                Accept: 'application/json'
            }
        });
    }

    async addFaturaSimp(dadosFatSimp) {
        var token = await this.getToken();

        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/vendas/faturas_simplificadas',
            method: 'POST',
            timeout: 5000,
            data: qs.stringify({
                opcao: '2',
                _token: token,
                cliente: '1',
                serie: dadosFatSimp.Serie,
                numero: dadosFatSimp.Numero,
                data: dadosFatSimp.Data,
                validade: dadosFatSimp.Validade,
                referencia: dadosFatSimp.referencia,
                pagamento: dadosFatSimp.Pagamento,
                banco: dadosFatSimp.Banco,
                vencimento: dadosFatSimp.Vencimento,
                moeda: dadosFatSimp.Moeda,
                desconto: dadosFatSimp.Desconto,
                observacoes: dadosFatSimp.Observacoes,
                linhas: dadosFatSimp.Linhas,
                finalizarDocumento: dadosFatSimp.FinalizarDocumento,
                precisaBanco: dadosFatSimp.PrecisaBanco,
                centrocusto: dadosFatSimp.Centocusto,
            }),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });
    }

    async editFaturaSimp(dadosFatSimp) {
        var token = await this.getToken();
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/vendas/faturas_simplificadas',
            method: 'PUT',
            timeout: 5000,
            data: qs.stringify({
                opcao: '3',
                _token: token,
                cliente: '1',
                serie: dadosFatSimp.Serie,
                numero: dadosFatSimp.Numero,
                data: dadosFatSimp.Data,
                validade: dadosFatSimp.Validade,
                referencia: dadosFatSimp.referencia,
                pagamento: dadosFatSimp.Pagamento,
                banco: dadosFatSimp.Banco,
                vencimento: dadosFatSimp.Vencimento,
                moeda: dadosFatSimp.Moeda,
                desconto: dadosFatSimp.Desconto,
                observacoes: dadosFatSimp.Observacoes,
                linhas: dadosFatSimp.Linhas,
                finalizarDocumento: dadosFatSimp.FinalizarDocumento,
                precisaBanco: dadosFatSimp.PrecisaBanco,
                centrocusto: dadosFatSimp.Centocusto,
            })
        })
    }

    async deleteFatSimp(id) {
        var token = await this.getToken();
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/vendas/faturas_simplificadas',
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

const faturaSimpService = new FaturasSimpService();
export default faturaSimpService;