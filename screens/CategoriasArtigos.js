/* eslint-disable prettier/prettier */
import React, { useState, useEffect, Component } from 'react';
import categoriasArtigosService from '../services/categoriasArtigosService';
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

export default class CategoriasArtigos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            dataSource: [],
            array: [],
            showModal: false,
            showModalEdit: false,
            dataCategorias: []
        }
    }

    componentDidMount() {
        categoriasArtigosService.getCategorias().then(response => {
            this.setState({
                isLoading: false,
                dataSource: response.data.aaData,
            })
        });
    }

    deleteCategoria = (id) => {
        categoriasArtigosService.deleteCategorias(id);
        categoriasArtigosService.getCategorias().then(response => {
            this.setState({
                dataSource: response.data.aaData,
            })
        })
    }

    render() {
        let { container } = styles;
        let { dataSource, dataCategorias, isLoading, array, showModal, showModalEdit } = this.state;


        for (let i = 0; i < dataSource.length; i++) {
            array[i] = { 'id': dataSource[i][0], 'nome': dataSource[i][1] };
        }

        return (

            <Box>
                <Heading fontSize="xl" p="4" pb="3">
                    Categorias Artigos
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
                                <TouchableOpacity onPress={() => this.deleteCategoria(item.id)}>
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
                        <Modal.Header>{dataCategorias.Nome}</Modal.Header>
                        <Modal.Body>
                            <Swiper style={styles.wrapper} showsButtons={true}>
                                <View style={styles.slide1}>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>ID da conta: </Text>{dataCategorias.AccountID}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Deb. Inicial: </Text>{dataCategorias.DebitoInicial}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Cred. Inicial: </Text>{dataCategorias.CreditoInicial}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Predefinido: </Text>{dataCategorias.Predefinido}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Ativo: </Text>{dataCategorias.Ativo}</Text></Center>
                                </View>
                            </Swiper>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>

                {/*Modal Adicionar Banco */}
                <Modal isOpen={showModalEdit} onClose={() => this.setState({ showModalEdit: false })}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>{dataCategorias}</Modal.Header>
                        <Modal.Body>
                            <Swiper style={styles.wrapper} showsButtons={false}>
                                <View style={styles.slide1}>
                                    <Text style={styles.Label}>Nif</Text>
                                    <Input type='number' size="xs" variant="underlined" value={dataCategorias} onChangeText={(text) => this.setState({ dataCategorias: { ...this.state.dataCategorias, Nif: text } })} />
                                    <Text style={styles.Label}>Codigo</Text>
                                    <Input size="xs" variant="underlined" value={dataCategorias} onChangeText={(text) => this.setState({ dataCategorias: { ...this.state.dataCategorias, Codigo: text } })} />
                                    <Text style={styles.Label}>Codigo Interno</Text>
                                    <Input size="xs" variant="underlined" value={dataCategorias} onChangeText={(text) => this.setState({ dataCategorias: { ...this.state.dataCategorias, CodigoInterno: text } })} />
                                    <Text style={styles.Label}>Endereço</Text>
                                    <Input size="xs" variant="underlined" value={dataCategorias} onChangeText={(text) => this.setState({ dataCategorias: { ...this.state.dataCategorias, Endereco: text } })} />
                                    <Text style={styles.Label}>Codigo Postal</Text>
                                    <Input size="xs" variant="underlined" value={dataCategorias} onChangeText={(text) => this.setState({ dataCategorias: { ...this.state.dataCategorias, CodigoPostal: text } })} />
                                    <Text style={styles.Label}>Localidade</Text>
                                    <Input size="xs" variant="underlined" value={dataCategorias} onChangeText={(text) => this.setState({ dataCategorias: { ...this.state.dataCategorias, Localidade: text } })} />
                                </View>
                                <View style={styles.slide2}>
                                    <Text style={styles.Label}>Cidade</Text>
                                    <Input size="xs" variant="underlined" value={dataCategorias} onChangeText={(text) => this.setState({ dataCategorias: { ...this.state.dataCategorias, Cidade: text } })} />
                                    <Text style={styles.Label}>Pais</Text>
                                    <Input size="xs" variant="underlined" value={dataCategorias} onChangeText={(text) => this.setState({ dataCategorias: { ...this.state.dataCategorias, Pais: text } })} />
                                    <Text style={styles.Label}>Região</Text>
                                    <Input size="xs" variant="underlined" value={dataCategorias} onChangeText={(text) => this.setState({ dataCategorias: { ...this.state.dataCategorias, Regiao: text } })} />
                                    <Text style={styles.Label}>Email</Text>
                                    <Input size="xs" variant="underlined" value={dataCategorias} onChangeText={(text) => this.setState({ dataCategorias: { ...this.state.dataCategorias, Email: text } })} />
                                    <Text style={styles.Label}>Telefone</Text>
                                    <Input size="xs" variant="underlined" value={dataCategorias} onChangeText={(text) => this.setState({ dataCategorias: { ...this.state.dataCategorias, Telefone: text } })} />
                                    <Text style={styles.Label}>Telemovel</Text>
                                    <Input size="xs" variant="underlined" value={dataCategorias} onChangeText={(text) => this.setState({ dataCategorias: { ...this.state.dataCategorias, Telemovel: text } })} />
                                </View>
                                <View style={styles.slide3}>
                                    <Text style={styles.Label}>Fax</Text>
                                    <Input size="xs" variant="underlined" value={dataCategorias} onChangeText={(text) => this.setState({ dataCategorias: { ...this.state.dataCategorias, Fax: text } })} />
                                    <Text style={styles.Label}>Website</Text>
                                    <Input size="xs" variant="underlined" value={dataCategorias} onChangeText={(text) => this.setState({ dataCategorias: { ...this.state.dataCategorias, Website: text } })} />
                                    <Text style={styles.Label}>Vencimento</Text>
                                    <Input size="xs" variant="underlined" value={dataCategorias} onChangeText={(text) => this.setState({ dataCategorias: { ...this.state.dataCategorias, Vencimento: text } })} />
                                    <Text style={styles.Label}>Desconto</Text>
                                    <Input size="xs" variant="underlined" value={dataCategorias} onChangeText={(text) => this.setState({ dataCategorias: { ...this.state.dataCategorias, Desconto: text } })} />
                                    <Text style={styles.Label}>Ativo</Text>
                                    <Input size="xs" variant="underlined" value={dataCategorias} onChangeText={(text) => this.setState({ dataCategorias: { ...this.state.dataCategorias, Ativo: text } })} />
                                    <Text style={styles.Label}>Isenção IVA</Text>
                                    <Input size="xs" variant="underlined" value={dataCategorias} onChangeText={(text) => this.setState({ dataCategorias: { ...this.state.dataCategorias, IsencaoIVA: text } })} />
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