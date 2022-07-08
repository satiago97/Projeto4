/* eslint-disable prettier/prettier */
import React, { useState, useEffect, Component } from 'react';
import faturasService from '../services/faturasService';
import clientsService from '../services/clientsService';
import artigosService from '../services/articlesService';
import { ActivityIndicator } from 'react-native';
import { Center, Modal, Heading, VStack, Input, Button, Box, HStack, Avatar, Spacer, Image , Divider , Select  , CheckIcon } from "native-base";
import { FloatingAction } from "react-native-floating-action";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    KeyboardAvoidingView,
    LayoutAnimation,
    TouchableOpacity,
    FlatList,
    DevSettings
} from 'react-native';

import Swiper from 'react-native-swiper';


const actions = [
    {
      text: "Nova Fatura",
      icon: { uri: 'https://img.icons8.com/material-outlined/48/000000/plus--v1.png' },
      name: "bt_add",
      position: 1
    },
    {
        text: "Finalizar Faturas",
        icon: { uri: 'https://img.icons8.com/material-rounded/24/000000/final-state.png' },
        name: "bt_finalizar",
        position: 2
      },
      {
          text: "Enviar Faturas",
          icon: { uri: 'https://img.icons8.com/material-outlined/48/000000/send.png' },
          name: "bt_send",
          position: 3
        },
       {
            text: "Exportar Zip",
            icon: { uri: 'https://img.icons8.com/ios/50/000000/zip.png' },
            name: "bt_azip",
            position: 4
          },,
        {
              text: "Exportar PDF",
              icon: { uri: 'https://img.icons8.com/sf-ultralight/25/FA5252/pdf.png' },
              name: "bt_pdf",
              position: 2
            }
  ]



export default class Faturas extends Component {
    constructor(props) {
        super(props)
        this.qtdInput = React.createRef();
        this.state = {
            isLoading: true,
            dataSource: [],
            array: [],
            showModal: false,
            showModalAdd: false,
            dataFatura: [],
            dataClientes: [],
            dataCliente: [],
            dataArtigos: [],
            dataArtigo: [],
            linhas: [], 
            fatura: [],
            tot: 0,
            Value: ""
        }
    }

    getFatura = (idFatura) => {
        var id = idFatura;
        console.log("getFatura")
        faturasService.getFaturaDetail(id).then(response => {
            console.log(response.data.data.linhas)
            this.setState({
                isLoading: false,
                dataFatura: response.data.data,
                showModal: true
            })
        });
    }

    getArtigo = (idArtigo) => {
        var id = idArtigo;
        console.log("getArtigo")
        artigosService.getArtigo(id).then(response => {
            this.setState({
                dataArtigo: response.data.data,
            })
        });
    }

    getCliente = (idCliente) => {
        var id = idCliente;
        console.log("getCli")
        clientsService.getcliente(id).then(response => {
            this.setState({
                dataCliente: response.data.data,
            })
        });
    }


    submitFatura = () => {
        this.setState({
            fatura : {
                cliente: this.state.dataCliente.ID_Cliente,
                serie: 2021,
                numero: 3,
                data: this.getCurrentDate(),
                validade: this.getCurrentDate(),
                linhas: this.state.linhas
            }
        })
        faturasService.addFatura(this.state.fatura).then(response => {
            this.setState({
                linhas: [],
                dataCliente: [],
                dataArtigos: [],
                dataSource: this.state.dataSource
            });
        })
    }

    refreshData(){
        var sum = 0 ;
        for(var i=0; i < this.state.linhas.length;i++){
            sum = sum + (this.state.linhas[i].preco * this.state.linhas[i].qtd)
        }

        this.setState({
            linhas: this.state.linhas,
            tot: sum
        })
    }

     getCurrentDate=()=>{

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        return date + '/' + month + '/' + year;//format: dd-mm-yyyy;
    }

     checkTextInput = () => {
       
        if (this.state.Value == 0) {
          alert('Inserir Quantidade');
          return 1;
        }
    }

    addLinha(){
        var itemValue = this.state.Value;

        if(this.state.linhas.length != 0){
            console.log(this.state.linhas.length)
        for(var i = 0; i < this.state.linhas.length; i++ ){
            if(this.state.linhas[i].artigo == this.state.dataArtigo.ID_Artigo){
                this.state.linhas[i].qtd = parseInt(this.state.linhas[i].qtd) + parseInt(itemValue);
                return;
            }else{
                this.state.linhas.push({qtd: itemValue , descricao: this.state.dataArtigo.Nome ,artigo: this.state.dataArtigo.ID_Artigo,preco: this.state.dataArtigo.Preco,imposto: 1 , motivo: 0 , desconto: 0 , retencao:  0})
                return;
                }
            }
             }else{
                this.state.linhas.push({qtd: itemValue , descricao: this.state.dataArtigo.Nome ,artigo: this.state.dataArtigo.ID_Artigo,preco: this.state.dataArtigo.Preco,imposto: 1 , motivo: 0 , desconto: 0 , retencao:  0})
                return;
            }
    }

    componentDidMount() {
        faturasService.getFaturas().then(response => {
            this.setState({
                dataSource: response.data.aaData,
            });
        });
        artigosService.getArtigos().then(response => {
            this.setState({
                dataArtigos: response.data.aaData,
            });
        });
        clientsService.getclientes().then(response => {
            this.setState({
                isLoading: false,
                dataClientes: response.data.aaData,
            });
        });
    }

    render() {
        let { container } = styles;
        let { dataSource, dataFatura, dataArtigos , dataClientes, tot, fatura , Value, dataArtigo , dataCliente , linhas, isLoading, array, showModal, showModalAdd } = this.state;
        console.log(dataSource)


        for (let i = 0; i < dataSource.length; i++) {
            if(dataSource[i][8] == "Pago"){
                color = "#6bff77"
            }else if(dataSource[i][8] == "Aberto"){
                color = "#4287f5"
            }else if(dataSource[i][8] == "Rascunho"){
                color = "#ffd333"
            }else{
                color = "#f7693e"
            }
            array[i] = { 'id': dataSource[i][0], 'nome': dataSource[i][2], "idFatura": dataSource[i][9] , "total": Math.round( dataSource[i][6] * 100) / 100 , "color": color , "estado": dataSource[i][8]};
        }

        return (
            <View style={{ flex: 1}}>
            <Box>
                <Heading fontSize="xl" p="4" pb="3">
                    Faturas
                </Heading>
                <VStack w="70%" space={5} alignSelf="center">
                    <Input placeholder="Search" placeholderTextColor={"#000"} bg={'#CCAC6E'} variant="filled" width="100%" borderRadius="10" py="1" px="2" borderWidth="0" InputRightElement={<TouchableOpacity style={{marginRight: 10}} onPress={() => console.log("asd")}><Image size="20px" alt='viewImage' source={{uri: 'https://img.icons8.com/ios/50/000000/search--v1.png'}} /></TouchableOpacity>} />
                </VStack>
                <Divider margin={'5'} />
                <FlatList data={array} renderItem={({
                    item
                }) =>
                    <Box borderBottomWidth="1" _dark={{
                        borderColor: "gray.600"
                    }} borderColor="coolGray.200" pl="4" pr="5" py="2">
                        <HStack space={3} justifyContent="space-between" >
                            <Avatar size="48px" source={{
                                uri: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-client-gig-economy-flaticons-lineal-color-flat-icons-4.png'
                            }} />
                            <VStack width="70%">
                                <Text style={{ color: 'black' }}>
                                    <Text style={{ fontWeight: "bold", color: 'black' }}>ID:</Text> {item.id} <View style={{ backgroundColor: item.color, width: 10,height: 10,borderRadius: 10/2}}></View>
                                </Text>
                                <Text style={{ color: 'black' }}>
                                    <Text style={{ fontWeight: "bold" }}>Nome do cliente:</Text> {item.nome}
                                </Text>
                                <Text style={{ color: 'black' }}>
                                    <Text style={{ fontWeight: "bold" }}>Nome do cliente:</Text> {item.total}
                                </Text>
                            </VStack>
                            <Spacer />
                            <VStack>
                                <TouchableOpacity onPress={() => this.getFatura(item.idFatura)}>
                                    <Image size="20px" alt='viewImage' source={{
                                        uri: 'https://img.icons8.com/color/48/000000/eyes-cartoon.png'
                                    }} />
                                </TouchableOpacity>
                                { item.estado === "Rascunho" || item.estado === "Aberto" &&
                                <TouchableOpacity onPress={() => this.anularFatura(item.idFatura)}>
                                    <Image size="20px" alt='anularImage' source={{
                                        uri: 'https://img.icons8.com/ios-glyphs/30/FA5252/xbox-x.png'
                                    }} />
                                </TouchableOpacity>
                                }
                                <TouchableOpacity onPress={() => this.imprimirFatura(item.idFatura)}>
                                    <Image size="20px" alt='imprimirImage' source={{
                                        uri: 'https://img.icons8.com/office/16/000000/print.png'
                                    }} />
                                </TouchableOpacity>
                            </VStack>
                        </HStack>
                    </Box>} keyExtractor={item => item.id} />

                {/*Modal Ver Detalhes */}
                <Modal isOpen={showModal} onClose={() => this.setState({ showModal: false })}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Detalhes Fatura</Modal.Header>
                        <Modal.Body>
                            <Swiper style={styles.wrapper} showsButtons={true}>
                                <View style={styles.slide1}>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Cliente: </Text>{dataFatura.Cliente}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Nif: </Text>{dataFatura.Nif}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Data: </Text>{dataFatura.Data}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Total: </Text>{dataFatura.TotalPagar}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Taxas: </Text>{dataFatura.TaxPayable}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Cidade Cliente: </Text>{dataFatura.CidadeCliente}</Text></Center>
                                </View>
                                <View style={styles.slide2}>
                                <Heading fontSize="xl" p="4" pb="3">
                                    Artigos da Faturados
                                </Heading>
                                <Divider />
                                   <FlatList data={dataFatura.linhas} renderItem={({
                                            item
                                        }) =>
                                            <Box borderBottomWidth="1" _dark={{
                                                borderColor: "gray.600"
                                            }} borderColor="coolGray.200" pl="4" pr="5" py="2">
                                                <HStack space={3} justifyContent="space-between" >
                                                    <Avatar size="48px" source={{
                                                        uri: 'https://img.icons8.com/color/48/000000/product--v1.png'
                                                    }} />
                                                    <VStack width="70%">
                                                        <Text style={{ color: 'black' }}>
                                                            <Text style={{ fontWeight: "bold", color: 'black' }}>Artigo:</Text> {item.descricao} <View style={{ backgroundColor: item.color, width: 10,height: 10,borderRadius: 10/2}}></View>
                                                        </Text>
                                                        <Text style={{ color: 'black' }}>
                                                            <Text style={{ fontWeight: "bold" }}>Quantidade:</Text> {Math.round( item.qtd * 100) / 100}
                                                        </Text>
                                                        <Text style={{ color: 'black' }}>
                                                            <Text style={{ fontWeight: "bold" }}>Total:</Text> {Math.round( item.totalLinha * 100) / 100}
                                                        </Text>
                                                    </VStack>
                                                </HStack>
                                                </Box>} keyExtractor={item => item.artigo} />
                                </View>
                            </Swiper>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>

                {/*Modal add Fatura */}
                <Modal isOpen={showModalAdd} onClose={() => this.setState({ showModalAdd: false })}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Nova Fatura</Modal.Header>
                        <Modal.Body>
                            <Swiper style={styles.wrapper} showsButtons={false}>
                                <View style={styles.slide1}>
                                <Select placeholder="Escolha Cliente" mt={1} _selectedItem={{bg: "teal.600",endIcon: <CheckIcon size="5" />}} onValueChange={ itemValue => this.getCliente(itemValue)}>
                                     {dataClientes.map(function(object, i){
                                        return <Select.Item color={"#000"} label={object[2]} value={object[0]} key={i}/>;
                                    })}
                                    </Select>                     
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Nome: </Text>{dataCliente.Nome}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Nif: </Text>{dataCliente.Nif }</Text></Center> 
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Pais: </Text>{dataCliente.Pais}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Numero: </Text>{dataCliente.ID_Cliente}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Serie: </Text>2022</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Data: </Text>{this.getCurrentDate()}</Text></Center>     
                               </View>
                                <View style={styles.slide2}>
                                     <Select placeholder="Escolha Artigo" mt={1} _selectedItem={{bg: "teal.600",endIcon: <CheckIcon size="5" />}} onValueChange={ itemValue => this.getArtigo(itemValue)}>
                                     {dataArtigos.map(function(object, i){
                                        return <Select.Item color={"#000"} label={object[1]} value={object[0]} key={i}/>;
                                    })}
                                    </Select>     
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Nome: </Text>{dataArtigo.Nome}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Preço: </Text>{Math.round( dataArtigo.Preco * 100) / 100}</Text></Center>
                                    <Text style={styles.Label}>Quantidade</Text>
                                    <Input type='number' value={this.state.Value} size="xs" variant="underlined" onChangeText={itemValue => this.setState({ Value: itemValue})} isRequired={true}/>
                                     <Button bg={'#CCAC6E'} onPress={() => {
                                                if(this.checkTextInput() != 1){
                                                this.addLinha();
                                                this.setState({Value: 0});
                                                this.refreshData();
                                                }
                                        }}>
                                            Adidcionar Artigo
                                    </Button> 
                                    <Divider  />    
                                    <FlatList data={linhas} renderItem={({
                                                    item
                                                }) =>
                                                    <Box borderBottomWidth="1" _dark={{
                                                        borderColor: "gray.600"
                                                    }} borderColor="coolGray.200" pl="4" pr="5" py="2">
                                                        <HStack space={3} justifyContent="space-between" >
                                                            <Avatar size="48px" source={{
                                                                uri: 'https://img.icons8.com/arcade/64/000000/experimental-box-arcade.png'
                                                            }} />
                                                            <VStack width="70%">
                                                                <Text style={{ color: 'black' }}>
                                                                    <Text style={{ fontWeight: "bold", color: 'black' }}>ID:</Text> {item.artigo} <View style={{ backgroundColor: item.color, width: 10,height: 10,borderRadius: 10/2}}></View>
                                                                </Text>
                                                                <Text style={{ color: 'black' }}>
                                                                    <Text style={{ fontWeight: "bold" }}>Produto:</Text> {item.descricao}
                                                                </Text>
                                                                <Text style={{ color: 'black' }}>
                                                                    <Text style={{ fontWeight: "bold" }}>Quantidade:</Text> {item.qtd}
                                                                </Text>
                                                            </VStack>
                                                        </HStack>
                                                    </Box>} keyExtractor={item => item.artigo} />
                                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginBottom={20} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Total: </Text>{this.state.tot}€</Text></Center>

                                </View>
                            </Swiper>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                    this.setState({ showModalAdd: false })
                                }}>
                                    Cancel
                                </Button>
                                <Button bg={'#CCAC6E'} onPress={() => {
                                    this.submitFatura();
                                }}>
                                    Save
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Box>
                  <FloatingAction
                  color='#AF7633'      
                  actions={actions}
                  onPressItem={name => {
                  if(name == 'bt_add'){
                       this.setState({ showModalAdd: true })
                  }
                  }}
              />
              </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    slide1: {
        flex: 1,
    },
    slide2: {
        flex: 1,
    },
    slide3: {
        flex: 1,
    },
    text: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    Label: {
        color: '#000',
        fontSize: 15,
        fontWeight: 'bold',
    }
});


