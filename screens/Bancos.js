/* eslint-disable prettier/prettier */
import React, { useState, useEffect, Component } from 'react';
import bancosService from '../services/bancosService';
import { ActivityIndicator } from 'react-native';
import { Center, Modal, Heading, VStack, Input, Button, Box, HStack, Avatar, Spacer, Image } from "native-base";
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
        text: "Adicionar",
        icon: { uri: 'https://img.icons8.com/material-outlined/48/000000/plus--v1.png' },
        name: "bt_add",
        position: 1
    },
];

export default class Bancos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            dataSource: [],
            array: [],
            showModal: false,
            showModalEdit: false,
            dataBanco: []
        }
    }


    componentDidMount() {
        bancosService.getBancos().then(response => {
            this.setState({
                isLoading: false,
                dataSource: response.data.aaData,
            })
        });
    }

    getBanco = (id) => {
        bancosService.getBancoDetails(id).then(response => {
            this.setState({
                isLoading: false,
                dataBanco: response.data.data,
                showModal: true,
            })
            console.log(this.state.dataBanco)
        });
    }

    insertBanco = () => {
        bancosService.addBanco().then(response => {
            this.setState({
                isLoading: false,
            })
        })
    }

    deleteBanco = (id) => {
        bancosService.deleteBanco(id);
        bancosService.getBancos().then(response => {
            this.setState({
                dataSource: response.data.aaData,
            })
        })
    }


    render() {
        let { container } = styles;
        let { dataSource, dataBanco, isLoading, array, showModal, showModalEdit } = this.state;


        for (let i = 0; i < dataSource.length; i++) {
            array[i] = { 'id': dataSource[i][6], 'nome': dataSource[i][1] };
        }

        return (

            <View style={{ flex: 1 }}>

                <Box>
                    <Heading fontSize="xl" p="4" pb="3">
                        Bancos
                    </Heading>
                    <FlatList data={array} renderItem={({
                        item
                    }) =>
                        <Box borderBottomWidth="1" marginTop={10} _dark={{
                            borderColor: "gray.600"
                        }} borderColor="coolGray.200" pl="4" pr="5" py="2">
                            <HStack space={3} justifyContent="space-between" >
                                <Avatar size="48px" source={{
                                    uri: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-client-gig-economy-flaticons-lineal-color-flat-icons-4.png'
                                }} />
                                <VStack width="70%">
                                    <Text style={{ color: 'black' }}>
                                        <Text style={{ fontWeight: "bold", color: 'black' }}>ID:</Text> {item.id}
                                    </Text>
                                    <Text style={{ color: 'black' }}>
                                        <Text style={{ fontWeight: "bold" }}>Nome:</Text> {item.nome}
                                    </Text>
                                </VStack>
                                <Spacer />
                                <VStack>
                                    <TouchableOpacity onPress={() => this.getBanco(item.id)}>
                                        <Image size="20px" alt='viewImage' source={{
                                            uri: 'https://img.icons8.com/color/48/000000/eyes-cartoon.png'
                                        }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.deleteBanco(item.id)}>
                                        <Image size="20px" alt='deleteImage' source={{
                                            uri: 'https://img.icons8.com/plasticine/100/000000/filled-trash.png'
                                        }} />
                                    </TouchableOpacity>
                                </VStack>
                            </HStack>
                        </Box>} keyExtractor={item => item.id} />

                    {/*Modal Ver Detalhes */}
                    <Modal isOpen={showModal} onClose={() => this.setState({ showModal: false })}>
                        <Modal.Content maxWidth="400px">
                            <Modal.CloseButton />
                            <Modal.Header>{dataBanco.Nome}</Modal.Header>
                            <Modal.Body>
                                <Swiper style={styles.wrapper} showsButtons={true}>
                                    <View style={styles.slide1}>
                                        <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>ID da conta: </Text>{dataBanco.AccountID}</Text></Center>
                                        <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Deb. Inicial: </Text>{dataBanco.DebitoInicial}</Text></Center>
                                        <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Cred. Inicial: </Text>{dataBanco.CreditoInicial}</Text></Center>
                                        <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Predefinido: </Text>{dataBanco.Predefinido}</Text></Center>
                                        <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Ativo: </Text>{dataBanco.Ativo}</Text></Center>
                                    </View>
                                </Swiper>
                            </Modal.Body>
                        </Modal.Content>
                    </Modal>

                    {/*Modal Adicionar Banco */}
                    <Modal isOpen={showModalEdit} onClose={() => this.setState({ showModalEdit: false })}>
                        <Modal.Content maxWidth="400px">
                            <Modal.CloseButton />
                            <Modal.Header>{dataBanco}</Modal.Header>
                            <Modal.Body>
                                <Swiper style={styles.wrapper} showsButtons={false}>
                                    <View style={styles.slide1}>
                                        <Text style={styles.Label}>Nif</Text>
                                        <Input type='number' size="xs" variant="underlined" value={dataBanco} onChangeText={(text) => this.setState({ dataBanco: { ...this.state.dataBanco, Nif: text } })} />
                                        <Text style={styles.Label}>Codigo</Text>
                                        <Input size="xs" variant="underlined" value={dataBanco} onChangeText={(text) => this.setState({ dataBanco: { ...this.state.dataBanco, Codigo: text } })} />
                                        <Text style={styles.Label}>Codigo Interno</Text>
                                        <Input size="xs" variant="underlined" value={dataBanco} onChangeText={(text) => this.setState({ dataBanco: { ...this.state.dataBanco, CodigoInterno: text } })} />
                                        <Text style={styles.Label}>Endereço</Text>
                                        <Input size="xs" variant="underlined" value={dataBanco} onChangeText={(text) => this.setState({ dataBanco: { ...this.state.dataBanco, Endereco: text } })} />
                                        <Text style={styles.Label}>Codigo Postal</Text>
                                        <Input size="xs" variant="underlined" value={dataBanco} onChangeText={(text) => this.setState({ dataBanco: { ...this.state.dataBanco, CodigoPostal: text } })} />
                                        <Text style={styles.Label}>Localidade</Text>
                                        <Input size="xs" variant="underlined" value={dataBanco} onChangeText={(text) => this.setState({ dataBanco: { ...this.state.dataBanco, Localidade: text } })} />
                                    </View>
                                    <View style={styles.slide2}>
                                        <Text style={styles.Label}>Cidade</Text>
                                        <Input size="xs" variant="underlined" value={dataBanco} onChangeText={(text) => this.setState({ dataBanco: { ...this.state.dataBanco, Cidade: text } })} />
                                        <Text style={styles.Label}>Pais</Text>
                                        <Input size="xs" variant="underlined" value={dataBanco} onChangeText={(text) => this.setState({ dataBanco: { ...this.state.dataBanco, Pais: text } })} />
                                        <Text style={styles.Label}>Região</Text>
                                        <Input size="xs" variant="underlined" value={dataBanco} onChangeText={(text) => this.setState({ dataBanco: { ...this.state.dataBanco, Regiao: text } })} />
                                        <Text style={styles.Label}>Email</Text>
                                        <Input size="xs" variant="underlined" value={dataBanco} onChangeText={(text) => this.setState({ dataBanco: { ...this.state.dataBanco, Email: text } })} />
                                        <Text style={styles.Label}>Telefone</Text>
                                        <Input size="xs" variant="underlined" value={dataBanco} onChangeText={(text) => this.setState({ dataBanco: { ...this.state.dataBanco, Telefone: text } })} />
                                        <Text style={styles.Label}>Telemovel</Text>
                                        <Input size="xs" variant="underlined" value={dataBanco} onChangeText={(text) => this.setState({ dataBanco: { ...this.state.dataBanco, Telemovel: text } })} />
                                    </View>
                                    <View style={styles.slide3}>
                                        <Text style={styles.Label}>Fax</Text>
                                        <Input size="xs" variant="underlined" value={dataBanco} onChangeText={(text) => this.setState({ dataBanco: { ...this.state.dataBanco, Fax: text } })} />
                                        <Text style={styles.Label}>Website</Text>
                                        <Input size="xs" variant="underlined" value={dataBanco} onChangeText={(text) => this.setState({ dataBanco: { ...this.state.dataBanco, Website: text } })} />
                                        <Text style={styles.Label}>Vencimento</Text>
                                        <Input size="xs" variant="underlined" value={dataBanco} onChangeText={(text) => this.setState({ dataBanco: { ...this.state.dataBanco, Vencimento: text } })} />
                                        <Text style={styles.Label}>Desconto</Text>
                                        <Input size="xs" variant="underlined" value={dataBanco} onChangeText={(text) => this.setState({ dataBanco: { ...this.state.dataBanco, Desconto: text } })} />
                                        <Text style={styles.Label}>Ativo</Text>
                                        <Input size="xs" variant="underlined" value={dataBanco} onChangeText={(text) => this.setState({ dataBanco: { ...this.state.dataBanco, Ativo: text } })} />
                                        <Text style={styles.Label}>Isenção IVA</Text>
                                        <Input size="xs" variant="underlined" value={dataBanco} onChangeText={(text) => this.setState({ dataBanco: { ...this.state.dataBanco, IsencaoIVA: text } })} />
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
                                        this.submitEditCliente();
                                    }}>
                                        Save
                                    </Button>
                                </Button.Group>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                </Box>
                <FloatingAction
                    color="#AF7633"
                    actions={actions}
                    onPressItem={name => {
                        if (name == 'bt_add') {
                            this.props.navigation.navigate('Adicionar Banco')
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
        alignItems: 'center',
        padding: 10
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
    },
    button: {
        alignItems: "center",
        backgroundColor: "#9C5D26",
        padding: 10,
        justifyContent: "center",
        marginLeft: 50,
        marginRight: 50,
    },
});
