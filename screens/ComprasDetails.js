/* eslint-disable prettier/prettier */
import React, { useState, useEffect, Component } from 'react';
import comprasService from '../services/comprasService';
import { ActivityIndicator } from 'react-native';
import { Center, Modal, Heading, VStack, Input, Button, Box, HStack, Avatar, Spacer, Image , Divider } from "native-base";
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
      text: "Nova Compra",
      icon: { uri: 'https://img.icons8.com/material-outlined/48/000000/plus--v1.png' },
      name: "bt_add",
      position: 1
    }
  ]

export default class ComprasDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            dataSource: [],
            array: [],
            showModal: false,
            showModalEdit: false,
            datacompras: []
        }
    }


    getCompra = (idCompra) => {
        var id = idCompra;
        console.log("getCompra")
        comprasService.getComprasDetails(id).then(response => {
            this.setState({
                isLoading: false,
                datacompras: response.data.data,
                showModal: true
            })
            console.log(this.state.datacompras)
        });
    }

    finalizarCompra = (idCompra) => {
        var id = idCompra;
        console.log("Finalizar")
        comprasService.finalizarCompra(id).then(response => {
            this.setState({
                isLoading: false,
            })
        });
    }

    anularCompra = (idCompra) => {
        var id = idCompra;
        console.log("Anular")
        comprasService.anularCompra(id).then(response => {
            this.setState({
                isLoading: false,
            })
        });
    }


    componentDidMount() {
        comprasService.getCompras().then(response => {
            this.setState({
                isLoading: false,
                dataSource: response.data.aaData,
            });
        });
    }

    render() {
        let { container } = styles;
        let { dataSource, datacompras, isLoading, array, showModal, showModalEdit } = this.state;
        console.log(dataSource)
        let color;
        for (let i = 0; i < dataSource.length; i++) {
            if(dataSource[i][7] == "Pago"){
                color = "#6bff77"
            }else if(dataSource[i][7] == "Aberto"){
                color = "#4287f5"
            }else if(dataSource[i][7] == "Rascunho"){
                color = "#ffd333"
            }else{
                color = "#f7693e"
            }
            array[i] = { 'id': dataSource[i][0], 'nome': dataSource[i][1], "idCompra": dataSource[i][8] , "total": Math.round( dataSource[i][5] * 100) / 100 , "color" : color , "estado": dataSource[i][7]};
        }
        console.log(array)
        return (
            <View style={{ flex: 1}}>
            <Box>
                <Heading fontSize="xl" p="4" pb="3">
                    Compras
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
                                    <Text style={{ fontWeight: "bold", color: 'black' }}>ID:</Text> {item.idCompra} <View style={{ backgroundColor: item.color, width: 10,height: 10,borderRadius: 10/2}}></View>
                                </Text>
                                <Text style={{ color: 'black' }}>
                                    <Text style={{ fontWeight: "bold" }}>Nome do Fornecedor:</Text> {item.nome}
                                </Text>
                                <Text style={{ color: 'black' }}>
                                    <Text style={{ fontWeight: "bold" }}>Total:</Text> {item.total} €
                                </Text>
                            </VStack>
                            <Spacer />
                            <VStack>
                                <TouchableOpacity onPress={() => this.getCompra(item.idCompra)}>
                                    <Image size="20px" alt='viewImage' source={{
                                        uri: 'https://img.icons8.com/color/48/000000/eyes-cartoon.png'
                                    }} />
                                </TouchableOpacity>
                               { item.estado === "Rascunho" &&
                                <TouchableOpacity onPress={() => this.anularCompra(item.idCompra)}>
                                    <Image size="20px" alt='editImage' source={{
                                        uri: 'https://img.icons8.com/ios-glyphs/30/FA5252/xbox-x.png'
                                    }} />
                                </TouchableOpacity>
                                }
                                <TouchableOpacity onPress={() => this.finalizarCompra(item.idCompra)}>
                                    <Image size="20px" alt='editImage' source={{
                                        uri: 'https://img.icons8.com/color/48/000000/checked-checkbox.png'
                                    }} />
                                </TouchableOpacity>
                            </VStack>
                        </HStack>
                    </Box>} keyExtractor={item => item.id} />

                {/*Modal Ver Detalhes */}
                <Modal isOpen={showModal} onClose={() => this.setState({ showModal: false })}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Detalhes Compra</Modal.Header>
                        <Modal.Body>
                            <Swiper style={styles.wrapper} showsButtons={true}>
                                <View style={styles.slide1}>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Numero: </Text>{datacompras}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Fornecedor: </Text>{datacompras}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Nif: </Text>{datacompras}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Data: </Text>{datacompras}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Validade: </Text>{datacompras}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Total: </Text>{datacompras}</Text></Center>
                                </View>
                                <View style={styles.slide2}>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Saldo: </Text>{datacompras}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Estado: </Text>{datacompras}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Região: </Text>{datacompras}</Text></Center>
                                </View>
                            </Swiper>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>

                {/*Modal Editar */}
                <Modal isOpen={showModalEdit} onClose={() => this.setState({ showModalEdit: false })}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>{datacompras}</Modal.Header>
                        <Modal.Body>
                            <Swiper style={styles.wrapper} showsButtons={false}>
                                <View style={styles.slide1}>
                                    <Text style={styles.Label}>Nif</Text>
                                    <Input type='number' size="xs" variant="underlined" value={datacompras} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Nif: text } })} />
                                    <Text style={styles.Label}>Codigo</Text>
                                    <Input size="xs" variant="underlined" value={datacompras} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Codigo: text } })} />
                                    <Text style={styles.Label}>Codigo Interno</Text>
                                    <Input size="xs" variant="underlined" value={datacompras} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, CodigoInterno: text } })} />
                                    <Text style={styles.Label}>Endereço</Text>
                                    <Input size="xs" variant="underlined" value={datacompras} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Endereco: text } })} />
                                    <Text style={styles.Label}>Codigo Postal</Text>
                                    <Input size="xs" variant="underlined" value={datacompras} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, CodigoPostal: text } })} />
                                    <Text style={styles.Label}>Localidade</Text>
                                    <Input size="xs" variant="underlined" value={datacompras} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Localidade: text } })} />
                                </View>
                                <View style={styles.slide2}>
                                    <Text style={styles.Label}>Cidade</Text>
                                    <Input size="xs" variant="underlined" value={datacompras} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Cidade: text } })} />
                                    <Text style={styles.Label}>Pais</Text>
                                    <Input size="xs" variant="underlined" value={datacompras} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Pais: text } })} />
                                    <Text style={styles.Label}>Região</Text>
                                    <Input size="xs" variant="underlined" value={datacompras} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Regiao: text } })} />
                                    <Text style={styles.Label}>Email</Text>
                                    <Input size="xs" variant="underlined" value={datacompras} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Email: text } })} />
                                    <Text style={styles.Label}>Telefone</Text>
                                    <Input size="xs" variant="underlined" value={datacompras} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Telefone: text } })} />
                                    <Text style={styles.Label}>Telemovel</Text>
                                    <Input size="xs" variant="underlined" value={datacompras} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Telemovel: text } })} />
                                </View>
                                <View style={styles.slide3}>
                                    <Text style={styles.Label}>Fax</Text>
                                    <Input size="xs" variant="underlined" value={datacompras} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Fax: text } })} />
                                    <Text style={styles.Label}>Website</Text>
                                    <Input size="xs" variant="underlined" value={datacompras} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Website: text } })} />
                                    <Text style={styles.Label}>Vencimento</Text>
                                    <Input size="xs" variant="underlined" value={datacompras} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Vencimento: text } })} />
                                    <Text style={styles.Label}>Desconto</Text>
                                    <Input size="xs" variant="underlined" value={datacompras} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Desconto: text } })} />
                                    <Text style={styles.Label}>Ativo</Text>
                                    <Input size="xs" variant="underlined" value={datacompras} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Ativo: text } })} />
                                    <Text style={styles.Label}>Isenção IVA</Text>
                                    <Input size="xs" variant="underlined" value={datacompras} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, IsencaoIVA: text } })} />
                                </View>
                            </Swiper>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                    this.setState({ showModalEdit: false })
                                }}>
                                    Cancel
                                </Button>
                                <Button bg={'#CCAC6E'} onPress={() => {
                                    this.submitEditCompra();
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


