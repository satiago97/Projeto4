/* eslint-disable prettier/prettier */
import React, { useState, useEffect, Component } from 'react';
import clientsService from '../services/clientsService';
import { Center, Modal, Heading, VStack, Input, Button, Box, HStack, Avatar, Spacer, Image , Icon , Divider } from "native-base";
import { Ionicons , FontAwesome  } from "@expo/vector-icons";
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
    DevSettings,
} from 'react-native';

import Swiper from 'react-native-swiper';

const actions = [
    {
      text: "Adicionar",
      icon: { uri: 'https://img.icons8.com/material-outlined/48/000000/plus--v1.png' },
      name: "bt_add",
      position: 1
    }
  ]


export default class Clientes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            dataSource: [],
            array: [],
            showModal: false,
            showModalEdit: false,
            showModalAdd: false,
            dataCliente: [],
            newCliente: []
        }
    }


    getCli = (idCliente) => {
        var id = idCliente;
        console.log("getCli")
        clientsService.getcliente(id).then(response => {
            this.setState({
                isLoading: false,
                dataCliente: response.data.data,
                showModal: true
            })
            console.log(this.state.dataCliente)
        });
    }

    editCli = (idCliente) => {
        console.log("editCli")
        var id = idCliente;
        clientsService.getcliente(id).then(response => {
            this.setState({
                isLoading: false,
                dataCliente: response.data.data,
                showModalEdit: true
            })
        });
    }


    deleteCli = (idCliente) => {
        console.log("deleteCli")
        var id = idCliente;
        clientsService.deletecliente(id);
        ToastAndroid.show('Cliente eliminado com sucesso', ToastAndroid.SHORT)
        clientsService.getclientes().then(response => {
            this.setState({
                dataSource: response.data.aaData,
            })


        });
    }



    submitEditCliente = () => {

        console.log(this.state.dataCliente)
        clientsService.editcliente(this.state.dataCliente).then(response => {
            this.setState({ showModalEdit: false })
        });

    }

    
    submitAddCliente = () => {
        clientsService.addcliente(this.state.newCliente).then(response => {
            this.setState({ showModalAdd: false })
        });
    }

    componentDidMount() {
        clientsService.getclientes().then(response => {
            this.setState({
                isLoading: false,
                dataSource: response.data.aaData,
            })
        });
    }



    render() {
        let { container } = styles;
        let { dataSource, dataCliente, newCliente, isLoading, array, showModal, showModalEdit , showModalAdd } = this.state;


        for (let i = 0; i < dataSource.length; i++) {
            array[i] = { 'id': dataSource[i][0], 'nome': dataSource[i][2], "idCliente": dataSource[i][9] };
        }

        return (
            <View style={{ flex: 1}}>
            <Box>
                <Heading fontSize="xl" p="4" pb="3">
                    Clientes
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
                                    <Text style={{ fontWeight: "bold", color: 'black' }}>ID:</Text> {item.id}
                                </Text>
                                <Text style={{ color: 'black' }}>
                                    <Text style={{ fontWeight: "bold" }}>Nome do cliente:</Text> {item.nome}
                                </Text>
                            </VStack>
                            <Spacer />
                            <VStack>
                                <TouchableOpacity onPress={() => this.getCli(item.idCliente)}>
                                    <Image size="20px" alt='viewImage' source={{
                                        uri: 'https://img.icons8.com/color/48/000000/eyes-cartoon.png'
                                    }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.editCli(item.idCliente)}>
                                    <Image size="20px" alt='editImage' source={{
                                        uri: 'https://img.icons8.com/color/48/000000/edit--v1.png'
                                    }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.deleteCli(item.idCliente)}>
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
                        <Modal.Header>{dataCliente.Nome}</Modal.Header>
                        <Modal.Body>
                            <Swiper style={styles.wrapper} showsButtons={true}>
                                <View style={styles.slide1}>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>NIF: </Text>{dataCliente.Nif}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Codigo: </Text>{dataCliente.Codigo}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Codigo Interno: </Text>{dataCliente.CodigoInterno}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Endereço: </Text>{dataCliente.Endereco}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Codigo Postal: </Text>{dataCliente.CodigoPostal}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Localidade: </Text>{dataCliente.Localidade}</Text></Center>
                                </View>
                                <View style={styles.slide2}>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Cidade: </Text>{dataCliente.Cidade}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Pais: </Text>{dataCliente.Pais}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Região: </Text>{dataCliente.Regiao}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Email: </Text>{dataCliente.Email}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Telefone: </Text>{dataCliente.Telefone}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Telemovel: </Text>{dataCliente.Telemovel}</Text></Center>
                                </View>
                                <View style={styles.slide3}>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Fax: </Text>{dataCliente.Fax}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Website: </Text>{dataCliente.Website}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Vencimento: </Text>{dataCliente.Vencimento}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Desconto: </Text>{dataCliente.Desconto}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Ativo: </Text>{dataCliente.Ativo}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Isenção IVA: </Text>{dataCliente.IsencaoIVA}</Text></Center>
                                </View>
                            </Swiper>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>

                {/*Modal Editar Cliente */}
                <Modal isOpen={showModalEdit} onClose={() => this.setState({ showModalEdit: false })}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>{dataCliente.Nome}</Modal.Header>
                        <Modal.Body>
                            <Swiper style={styles.wrapper} showsButtons={false}>
                                <View style={styles.slide1}>
                                    <Text style={styles.Label}>Nif</Text>
                                    <Input type='number' size="xs" variant="underlined" value={dataCliente.Nif} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Nif: text } })} />
                                    <Text style={styles.Label}>Codigo</Text>
                                    <Input size="xs" variant="underlined" value={dataCliente.Codigo} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Codigo: text } })} />
                                    <Text style={styles.Label}>Codigo Interno</Text>
                                    <Input size="xs" variant="underlined" value={dataCliente.CodigoInterno} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, CodigoInterno: text } })} />
                                    <Text style={styles.Label}>Endereço</Text>
                                    <Input size="xs" variant="underlined" value={dataCliente.Endereco} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Endereco: text } })} />
                                    <Text style={styles.Label}>Codigo Postal</Text>
                                    <Input size="xs" variant="underlined" value={dataCliente.CodigoPostal} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, CodigoPostal: text } })} />
                                    <Text style={styles.Label}>Localidade</Text>
                                    <Input size="xs" variant="underlined" value={dataCliente.Localidade} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Localidade: text } })} />
                                </View>
                                <View style={styles.slide2}>
                                    <Text style={styles.Label}>Cidade</Text>
                                    <Input size="xs" variant="underlined" value={dataCliente.Cidade} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Cidade: text } })} />
                                    <Text style={styles.Label}>Pais</Text>
                                    <Input size="xs" variant="underlined" value={dataCliente.Pais} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Pais: text } })} />
                                    <Text style={styles.Label}>Região</Text>
                                    <Input size="xs" variant="underlined" value={dataCliente.Regiao} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Regiao: text } })} />
                                    <Text style={styles.Label}>Email</Text>
                                    <Input size="xs" variant="underlined" value={dataCliente.Email} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Email: text } })} />
                                    <Text style={styles.Label}>Telefone</Text>
                                    <Input size="xs" variant="underlined" value={dataCliente.Telefone} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Telefone: text } })} />
                                    <Text style={styles.Label}>Telemovel</Text>
                                    <Input size="xs" variant="underlined" value={dataCliente.Telemovel} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Telemovel: text } })} />
                                </View>
                                <View style={styles.slide3}>
                                    <Text style={styles.Label}>Fax</Text>
                                    <Input size="xs" variant="underlined" value={dataCliente.Fax} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Fax: text } })} />
                                    <Text style={styles.Label}>Website</Text>
                                    <Input size="xs" variant="underlined" value={dataCliente.Website} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Website: text } })} />
                                    <Text style={styles.Label}>Vencimento</Text>
                                    <Input size="xs" variant="underlined" value={dataCliente.Vencimento} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Vencimento: text } })} />
                                    <Text style={styles.Label}>Desconto</Text>
                                    <Input size="xs" variant="underlined" value={dataCliente.Desconto} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Desconto: text } })} />
                                    <Text style={styles.Label}>Ativo</Text>
                                    <Input size="xs" variant="underlined" value={dataCliente.Ativo} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, Ativo: text } })} />
                                    <Text style={styles.Label}>Isenção IVA</Text>
                                    <Input size="xs" variant="underlined" value={dataCliente.IsencaoIVA} onChangeText={(text) => this.setState({ dataCliente: { ...this.state.dataCliente, IsencaoIVA: text } })} />
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



                                 {/*Modal Add Cliente */}
                <Modal isOpen={showModalAdd} onClose={() => this.setState({ showModalAdd: false })}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Novo Cliente</Modal.Header>
                        <Modal.Body>
                            <Swiper style={styles.wrapper} showsButtons={false}>
                                <View style={styles.slide1}>
                                    <Text style={styles.Label}>Nome</Text>
                                    <Input size="xs" variant="underlined" placeholder="Nome" onChangeText={(text) => this.setState({ newCliente: { ...this.state.newCliente, Nome: text } })} />
                                    <Text style={styles.Label}>Nif</Text>
                                    <Input type='number' size="xs" variant="underlined" placeholder="Nif" onChangeText={(text) => this.setState({ newCliente: { ...this.state.newCliente, Nif: text } })} />
                                    <Text style={styles.Label}>Endereço</Text>
                                    <Input size="xs" variant="underlined" placeholder="Endereço"onChangeText={(text) => this.setState({ newCliente: { ...this.state.newCliente, Endereco: text } })} />
                                    <Text style={styles.Label}>Codigo Postal</Text>
                                    <Input size="xs" variant="underlined" placeholder="Codigo Postal" onChangeText={(text) => this.setState({ newCliente: { ...this.state.newCliente, CodigoPostal: text } })} />
                                    <Text style={styles.Label}>Localidade</Text>
                                    <Input size="xs" variant="underlined" placeholder="Localidade" onChangeText={(text) => this.setState({ newCliente: { ...this.state.newCliente, Localidade: text } })} />
                                </View>
                                <View style={styles.slide2}>
                                    <Text style={styles.Label}>Cidade</Text>
                                    <Input size="xs" variant="underlined" placeholder="Cidade" onChangeText={(text) => this.setState({ newCliente: { ...this.state.newCliente, Cidade: text } })} />
                                    <Text style={styles.Label}>Pais</Text>
                                    <Input size="xs" variant="underlined" placeholder="Pais" onChangeText={(text) => this.setState({ newCliente: { ...this.state.newCliente, Pais: text } })} />
                                    <Text style={styles.Label}>Região</Text>
                                    <Input size="xs" variant="underlined" placeholder="Região" onChangeText={(text) => this.setState({ newCliente: { ...this.state.newCliente, Regiao: text } })} />
                                    <Text style={styles.Label}>Email</Text>
                                    <Input size="xs" variant="underlined" placeholder="Email" onChangeText={(text) => this.setState({ newCliente: { ...this.state.newCliente, Email: text } })} />
                                    <Text style={styles.Label}>Telefone</Text>
                                    <Input size="xs" variant="underlined" placeholder="Telefone" onChangeText={(text) => this.setState({ newCliente: { ...this.state.newCliente, Telefone: text } })} />
                                    <Text style={styles.Label}>Telemovel</Text>
                                    <Input size="xs" variant="underlined" placeholder="Telemovel" onChangeText={(text) => this.setState({ newCliente: { ...this.state.newCliente, Telemovel: text } })} />
                                </View>
                                <View style={styles.slide3}>
                                    <Text style={styles.Label}>Fax</Text>
                                    <Input size="xs" variant="underlined" value='' placeholder="Fax" onChangeText={(text) => this.setState({ newCliente: { ...this.state.newCliente, Fax: text } })} />
                                    <Text style={styles.Label}>Website</Text>
                                    <Input size="xs" variant="underlined" placeholder="Website" onChangeText={(text) => this.setState({ newCliente: { ...this.state.newCliente, Website: text } })} />
                                    <Text style={styles.Label}>Vencimento</Text>
                                    <Input size="xs" variant="underlined" placeholder="Vencimento" onChangeText={(text) => this.setState({ newCliente: { ...this.state.newCliente, Vencimento: text } })} />
                                    <Text style={styles.Label}>Desconto</Text>
                                    <Input size="xs" variant="underlined" placeholder="Desconto" onChangeText={(text) => this.setState({ newCliente: { ...this.state.newCliente, Desconto: text } })} />
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
                                    this.submitAddCliente();
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
