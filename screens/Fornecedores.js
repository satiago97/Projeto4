/* eslint-disable prettier/prettier */
import React, { useState, useEffect, Component } from 'react';
import fornecedoresService from '../services/fornecedoresService';
import { ActivityIndicator } from 'react-native';
import { Center, Modal, Heading, VStack, Input, Button, Box, HStack, Avatar, Spacer, Image } from "native-base";

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


export default class Fornecedores extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            dataSource: [],
            array: [],
            showModal: false,
            showModalEdit: false,
            dataFornecedores: []
        }
    }

    componentDidMount() {
        fornecedoresService.getFornecedores().then(response => {
            this.setState({
                isLoading: false,
                dataSource: response.data.aaData,
            })
        });
    }

    getFornecedor = (id) => {
        fornecedoresService.getFornecedorDetails(id).then(response => {
            this.setState({
                isLoading: false,
                dataFornecedores: response.data.data,
                showModal: true,
            })
        });
    }

    deleteFornecedor = (id) => {
        fornecedoresService.deleteFornecedor(id);
        fornecedoresService.getFornecedores().then(response => {
            this.setState({
                dataSource: response.data.aaData,
            })
        })
    }


    render() {
        let { container } = styles;
        let { dataSource, dataFornecedores, isLoading, array, showModal, showModalEdit } = this.state;


        for (let i = 0; i < dataSource.length; i++) {
            array[i] = { 'id': dataSource[i][0], 'nome': dataSource[i][1] };
        }

        return (

            <Box>
                <Heading fontSize="xl" p="4" pb="3">
                    Fornecedores
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
                                <TouchableOpacity onPress={() => this.getFornecedor(item.id)}>
                                    <Image size="20px" alt='viewImage' source={{
                                        uri: 'https://img.icons8.com/color/48/000000/eyes-cartoon.png'
                                    }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.deleteFornecedor(item.id)}>
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
                        <Modal.Header>{dataFornecedores.Nome}</Modal.Header>
                        <Modal.Body>
                            <Swiper style={styles.wrapper} showsButtons={true}>
                                <View style={styles.slide1}>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>ID da conta: </Text>{dataFornecedores.ID_Fornecedor}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>NIF: </Text>{dataFornecedores.Nif}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Código: </Text>{dataFornecedores.Codigo}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Endereço: </Text>{dataFornecedores.Endereco}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>C.Postal: </Text>{dataFornecedores.CodigoPostal}</Text></Center>
                                </View>
                                <View style={styles.slide2}>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Cidade: </Text>{dataFornecedores.Cidade}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Telemovel: </Text>{dataFornecedores.Telemovel}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Telefone: </Text>{dataFornecedores.Telefone}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Website: </Text>{dataFornecedores.Website}</Text></Center>

                                </View>
                            </Swiper>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
            </Box>
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