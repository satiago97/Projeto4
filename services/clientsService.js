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

    async getcliente(id) {
        var token = await this.getToken();
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/tabelas/clientes',
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '1',
                idCliente: id,
                _token: token
            },
            headers: {
                Accept: 'application/json',
            },
        });
    }


    async editcliente(dadosCli) {
        var token = await this.getToken();
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/tabelas/clientes',
            method: 'PUT',
            timeout: 5000,
            params: {
                opcao: '3',
                _token: token,
                idCliente: dadosCli.idCliente,
                nome_cliente: dadosCli.Nome ,
                nif_cliente: dadosCli.Nif,
                pais_cliente: dadosCli.Pais,
                endereco_cliente: dadosCli.Endereco,
                codigopostal_cliente: dadosCli.CodigoPostal,
                regiao_cliente: dadosCli.Regiao,
                cidade_cliente: dadosCli.Cidade,
                email_cliente: dadosCli.Email,
                website_cliente: dadosCli.Website,
                tlm_cliente: dadosCli.Telemovel,
                tlf_cliente: dadosCli.Telefone,
                fax_cliente: dadosCli.Fax,
                preferencial_nome_cliente: dadosCli.NomePref,
                preferencial_email_cliente: dadosCli.EmailPref,
                preferencial_tlm_cliente: dadosCli.TelemovelPref,
                preferencial_tlf_cliente: dadosCli.TelefonePref,
                pagamento_cliente: dadosCli.Pagametno,
                vencimento_cliente: dadosCli.Vencimento,
                desconto_cliente: dadosCli.Desconto,
                flagContaGeral: dadosCli.Flag,
                codigo_interno_cliente: dadosCli.CodigoInterno,
            },
            headers: {
                Accept: 'application/json',
            },
        });
    }
}

const clientsService = new ClientsService();
export default clientsService;


