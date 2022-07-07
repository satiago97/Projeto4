/* eslint-disable prettier/prettier */
import React, { useState, useEffect, Component } from 'react';
import orcamentosService from '../services/orcamentosService';
import { ActivityIndicator, ToastAndroid } from 'react-native';
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

export default class OrcamentosDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            dataSource: [],
            array: [],
            showModal: false,
            showModalEdit: false,
            dataOrcamento: []
        }
    }



    componentDidMount() {
        orcamentosService.getOrcamentos().then(response => {
            this.setState({
                isLoading: false,
                dataSource: response.data.aaData,
            });
        });
    }

    getOrcamentoDetails = (id) => {
        orcamentosService.getOrcamentosDetail(id).then(response => {
            this.setState({
                isLoading: false,
                dataOrcamento: response.data.data,
                showModal: true,
            })
        });
    }

    deleteOrcamento = (id) => {
        orcamentosService.deleteOrcamento(id);
        orcamentosService.getOrcamentos().then(response => {
            this.setState({
                dataSource: response.data.aaData,
            })
        });
    }

    finalizarOrcamento = (id) => {
        orcamentosService.finalizarOrcamento(id);
        ToastAndroid.show('Orçamento finalizado com sucesso', ToastAndroid.SHORT)
    }


    render() {
        let { container } = styles;
        let { dataSource, dataOrcamento, isLoading, array, showModal, showModalEdit } = this.state;


        for (let i = 0; i < dataSource.length; i++) {
            array[i] = { 'id': dataSource[i][0], 'nome': dataSource[i][2], "total": dataSource[i][6] };
        }

        return (

            <Box>
                <Heading fontSize="xl" p="4" pb="3">
                    Orçamentos
                </Heading>
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
                                    <Text style={{ fontWeight: "bold", color: 'black' }}>ID:</Text> {item.id}
                                </Text>
                                <Text style={{ color: 'black' }}>
                                    <Text style={{ fontWeight: "bold" }}>Nome do cliente:</Text> {item.nome}
                                </Text>
                                <Text style={{ color: 'black' }}>
                                    <Text style={{ fontWeight: "bold", color: 'black' }}>Total €:</Text> {Number.parseFloat(item.total)}
                                </Text>
                            </VStack>
                            <Spacer />
                            <VStack>
                                <TouchableOpacity onPress={() => this.getOrcamentoDetails(item.id)}>
                                    <Image size="20px" alt='viewImage' source={{
                                        uri: 'https://img.icons8.com/color/48/000000/eyes-cartoon.png'
                                    }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.deleteOrcamento(item.id)}>
                                    <Image size="20px" alt='deleteImage' source={{
                                        uri: 'https://img.icons8.com/plasticine/100/000000/filled-trash.png'
                                    }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.finalizarOrcamento(item.id)}>
                                    <Image size="20px" alt='viewImage' source={{
                                        uri: 'https://img.icons8.com/external-basicons-color-edtgraphics/50/000000/external-flag-flags-edtim-flat-edtim-13.png'
                                    }} />
                                </TouchableOpacity>
                            </VStack>
                        </HStack>
                    </Box>} keyExtractor={item => item.id} />

                {/*Modal Ver Detalhes */}
                <Modal isOpen={showModal} onClose={() => this.setState({ showModal: false })}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>{dataOrcamento.ID_Orcamento}</Modal.Header>
                        <Modal.Body>
                            <Swiper style={styles.wrapper} showsButtons={true}>
                                <View style={styles.slide1}>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Cliente: </Text>{dataOrcamento.Cliente}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>NIF: </Text>{dataOrcamento.Nif}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Endereco Cliente: </Text>{dataOrcamento.EnderecoCliente}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Cidade Cliente: </Text>{dataOrcamento.CidadeCliente}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Data Validade: </Text>{dataOrcamento.DataValidade}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>% Desconto: </Text>{dataOrcamento.PercentagemDesconto}</Text></Center>
                                </View>
                                <View style={styles.slide2}>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Moeda: </Text>{dataOrcamento.Moeda}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Taxa Moeda: </Text>{dataOrcamento.TaxaMoeda}</Text></Center>
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