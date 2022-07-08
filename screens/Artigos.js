/* eslint-disable prettier/prettier */
import React, { useState, useEffect, Component } from 'react';
import articlesService from '../services/articlesService';
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
    DevSettings
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


export default class Artigos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            array: [],
            showModal: false,
            showModalEdit: false,
            showModalAdd: false,
            dataArtigo: [],
            newArtigo: []
        }
    }

    getArt = (idArtigo) => {
        var id = idArtigo;
        console.log("getArt")
        articlesService.getArtigo(id).then(response => {
            this.setState({
                isLoading: false,
                dataArtigo: response.data.data,
                showModal: true
            })
            console.log(this.state.dataArtigo)
        });
    }

    editArt = (idArtigo) => {
        console.log("editArt")
        var id = idArtigo;
        articlesService.getArtigo(id).then(response => {
            this.setState({
                isLoading: false,
                dataArtigo: response.data.data,
                showModalEdit: true
            })
        });
    }


    deleteArt = (idArtigo) => {
        console.log("deleteArt")
        var id = idArtigo;
        console.log(id);
        articlesService.deleteArtigo(id);
        articlesService.getArtigos().then(response => {
            this.setState({
                dataSource: response.data.aaData
            })
        });
    }



    submitEditArtigo = () => {

        console.log(this.state.dataArtigo)
        articlesService.editArtigo(this.state.dataArtigo).then(response => {
            this.setState({ showModalEdit: false })
        });

    }

    
    submitAddArtigo = () => {
        articlesService.addArtigo(this.state.newArtigo).then(response => {
            console.log(response)
            this.setState({ showModalAdd: false })
        });
    }


    componentDidMount() {
        articlesService.getArtigos().then(response => {
            this.setState({
                isLoading: false,
                dataSource: response.data.aaData,
            });
        });
    }


    render() {
        let { dataSource, dataArtigo , newArtigo , isLoading, array , showModal , showModalEdit, showModalAdd} = this.state;
       console.log(dataSource)
        for (let i = 0; i < dataSource.length; i++) {
            array[i] = { 'id': dataSource[i][0], 'nome': dataSource[i][1] , 'idArtigo': dataSource[i][8]};
        }
        return (
            <View style={{ flex: 1}}>
            <Box>
                <Heading fontSize="xl" p="4" pb="3">
                    Artigos
                </Heading>
                <VStack w="70%" space={5} alignSelf="center">
                    <Input placeholder="Search" placeholderTextColor={"#000"} bg={'#CCAC6E'} variant="filled" width="100%" borderRadius="10" py="1" px="2" borderWidth="0" InputRightElement={<TouchableOpacity style={{marginRight: 10}} onPress={() => console.log("asd")}><Image size="20px" alt='viewImage' source={{uri: 'https://img.icons8.com/ios/50/000000/search--v1.png'}} /></TouchableOpacity>} />
                </VStack>
                <Divider margin={'5'} />
                <FlatList data={array} renderItem={({
                    item
                }) => <Box borderBottomWidth="1" _dark={{
                    borderColor: "gray.600"
                }} borderColor="coolGray.200" pl="4" pr="5" py="2">
                        <HStack space={3} justifyContent="space-between">
                            <Avatar size="48px" source={{
                                uri: 'https://img.icons8.com/arcade/64/000000/experimental-box-arcade.png'
                            }} />
                            <VStack width="70%">
                                <Text style={{ color: 'black' }}>
                                    <Text style={{ fontWeight: "bold", color: 'black' }}>ID:</Text> {item.id}
                                </Text>
                                <Text style={{ color: 'black' }}>
                                    <Text style={{ fontWeight: "bold" }}>Nome do artigo:</Text> {item.nome}
                                </Text>
                            </VStack>
                            <Spacer />
                            <VStack>
                                <TouchableOpacity onPress={() => this.getArt(item.id)}>
                                    <Image size="20px" alt='viewImage' source={{
                                        uri: 'https://img.icons8.com/color/48/000000/eyes-cartoon.png'
                                    }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.editArt(item.idArtigo)}>
                                    <Image size="20px" alt='editImage' source={{
                                        uri: 'https://img.icons8.com/color/48/000000/edit--v1.png'
                                    }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.deleteArt(item.idArtigo)}>
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
                        <Modal.Header>{dataArtigo.Nome}</Modal.Header>
                        <Modal.Body>
                            <Swiper style={styles.wrapper} showsButtons={true}>
                                <View style={styles.slide1}>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Nome: </Text>{dataArtigo.Nome}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Codigo: </Text>{dataArtigo.Codigo}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Codigo Barras: </Text>{dataArtigo.CodigoBarras}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Serial Number: </Text>{dataArtigo.SerialNumber}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Categoria: </Text>{dataArtigo.Categoria}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Tipo: </Text>{dataArtigo.Tipo}</Text></Center>
                                </View>
                                <View style={styles.slide2}>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Preço PVP: </Text>{dataArtigo.PrecoPVP}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Preço: </Text>{dataArtigo.Preco}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>IVA: </Text>{dataArtigo.IVA}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Unidade: </Text>{dataArtigo.Unidade}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Ativo: </Text>{dataArtigo.Ativo}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Usado: </Text>{dataArtigo.Usado}</Text></Center>
                                </View>
                                <View style={styles.slide3}>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Retenção Percecntagem: </Text>{dataArtigo.RetencaoPercentagem}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Retenção Valor: </Text>{dataArtigo.RetencaoValor}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Stock: </Text>{dataArtigo.Stock}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Motivo Isenção: </Text>{dataArtigo.MotivoIsencao}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Preço Custo: </Text>{dataArtigo.PrecoCusto}</Text></Center>
                                    <Center w="64" h="10" bg="#AF7633" rounded="lg" shadow={3} marginTop={5}><Text style={styles.text}><Text style={styles.Label}>Retenção: </Text>{dataArtigo.Retencao}</Text></Center>
                                </View>
                            </Swiper>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>

                {/*Modal Editar Cliente */}
                <Modal isOpen={showModalEdit} onClose={() => this.setState({ showModalEdit: false })}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Editar Artigo</Modal.Header>
                        <Modal.Body>
                            <Swiper style={styles.wrapper} showsButtons={false}>
                                <View style={styles.slide1}>
                                    <Text style={styles.Label}>Nome</Text>
                                    <Input type='number' size="xs" variant="underlined" value={dataArtigo.Nome} onChangeText={(text) => this.setState({ dataArtigo: { ...this.state.dataArtigo, Nome: text } })} />
                                    <Text style={styles.Label}>Preço PVP</Text>
                                    <Input size="xs" variant="underlined" value={dataArtigo.PrecoPVP} onChangeText={(text) => this.setState({ dataArtigo: { ...this.state.dataArtigo, PrecoPVP: text } })} />
                                    <Text style={styles.Label}>Preço</Text>
                                    <Input size="xs" variant="underlined" value={dataArtigo.Preco} onChangeText={(text) => this.setState({ dataArtigo: { ...this.state.dataArtigo, Preco: text } })} />
                                    <Text style={styles.Label}>IVA</Text>
                                    <Input size="xs" variant="underlined" value={dataArtigo.IVA} onChangeText={(text) => this.setState({ dataArtigo: { ...this.state.dataArtigo, IVA: text } })} />
                                    <Text style={styles.Label}>Retenção Percentagem</Text>
                                    <Input size="xs" variant="underlined" value={dataArtigo.RetencaoPercentagem} onChangeText={(text) => this.setState({ dataArtigo: { ...this.state.dataArtigo, RetencaoPercentagem: text } })} />
                                    <Text style={styles.Label}>Retenção Valor</Text>
                                    <Input size="xs" variant="underlined" value={dataArtigo.RetencaoValor} onChangeText={(text) => this.setState({ dataArtigo: { ...this.state.dataArtigo, RetencaoValor: text } })} />
                                </View>
                                <View style={styles.slide2}>
                                    <Text style={styles.Label}>Stock</Text>
                                    <Input size="xs" variant="underlined" value={dataArtigo.Stock} onChangeText={(text) => this.setState({ dataArtigo: { ...this.state.dataArtigo, Stock: text } })} />
                                    <Text style={styles.Label}>Preço Custo</Text>
                                    <Input size="xs" variant="underlined" value={dataArtigo.PrecoCusto} onChangeText={(text) => this.setState({ dataArtigo: { ...this.state.dataArtigo, PrecoCusto: text } })} />
                                    <Text style={styles.Label}>Descrição</Text>
                                    <Input size="xs" variant="underlined" value={dataArtigo.Descricao} onChangeText={(text) => this.setState({ dataArtigo: { ...this.state.dataArtigo, DescricaoLonga: text } })} />
                                    <Text style={styles.Label}>Retenção</Text>
                                    <Input size="xs" variant="underlined" value={dataArtigo.Retencao} onChangeText={(text) => this.setState({ dataArtigo: { ...this.state.dataArtigo, Retencao: text } })} />
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
                                    this.submitEditArtigo();
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
                        <Modal.Header>Novo Artigo</Modal.Header>
                        <Modal.Body>
                            <Swiper style={styles.wrapper} showsButtons={false}>
                                <View style={styles.slide1}>
                                    <Text style={styles.Label}>Nome</Text>
                                    <Input size="xs" variant="underlined" placeholder="Nome" onChangeText={(text) => this.setState({ newArtigo: { ...this.state.newArtigo, Nome: text } })} />
                                    <Text style={styles.Label}>Codigo</Text>
                                    <Input type='number' size="xs" variant="underlined" placeholder="Codigo" onChangeText={(text) => this.setState({ newArtigo: { ...this.state.newArtigo, Codigo: text } })} />
                                    <Text style={styles.Label}>Codigo Barras</Text>
                                    <Input size="xs" variant="underlined" placeholder="Codigo Barras" onChangeText={(text) => this.setState({ newArtigo: { ...this.state.newArtigo, CodigoBarras: text } })} />
                                    <Text style={styles.Label}>Serial Number</Text>
                                    <Input size="xs" variant="underlined" placeholder="Serial Number" onChangeText={(text) => this.setState({ newArtigo: { ...this.state.newArtigo, SerialNumber: text } })} />
                                    <Text style={styles.Label}>Categoria</Text>
                                    <Input size="xs" variant="underlined" placeholder="Categoria" onChangeText={(text) => this.setState({ newArtigo: { ...this.state.newArtigo, Categoria: text } })} />
                                </View>
                                <View style={styles.slide2}>
                                    <Text style={styles.Label}>Tipo</Text>
                                    <Input size="xs" variant="underlined" placeholder="Tipo" onChangeText={(text) => this.setState({ newArtigo: { ...this.state.newArtigo, Tipo: text } })} />
                                    <Text style={styles.Label}>Preço PVP</Text>
                                    <Input size="xs" variant="underlined" placeholder="Preço PVP" onChangeText={(text) => this.setState({ newArtigo: { ...this.state.newArtigo, PrecoPVP: text } })} />
                                    <Text style={styles.Label}>Preço</Text>
                                    <Input size="xs" variant="underlined" placeholder="Preço" onChangeText={(text) => this.setState({ newArtigo: { ...this.state.newArtigo, Preco: text } })} />
                                    <Text style={styles.Label}>IVA</Text>
                                    <Input size="xs" variant="underlined" placeholder="IVA" onChangeText={(text) => this.setState({ newArtigo: { ...this.state.newArtigo, IVA: text } })} />
                                    <Text style={styles.Label}>Unidade</Text>
                                    <Input size="xs" variant="underlined" placeholder="Unidade" onChangeText={(text) => this.setState({ newArtigo: { ...this.state.newArtigo, Unidade: text } })} />
                                    <Text style={styles.Label}>Retenção Percentagem</Text>
                                    <Input size="xs" variant="underlined" placeholder="Retenção Percentagem" onChangeText={(text) => this.setState({ newArtigo: { ...this.state.newArtigo, RetencaoPercentagem: text } })} />
                                </View>
                                <View style={styles.slide3}>
                                    <Text style={styles.Label}>Retenção Valor</Text>
                                    <Input size="xs" variant="underlined" placeholder="Retenção Valor" onChangeText={(text) => this.setState({ newArtigo: { ...this.state.newArtigo, RetencaoValor: text } })} />
                                    <Text style={styles.Label}>Stock</Text>
                                    <Input size="xs" variant="underlined" placeholder="Stock" onChangeText={(text) => this.setState({ newArtigo: { ...this.state.newArtigo, Stock: text } })} />
                                    <Text style={styles.Label}>Preço Custo</Text>
                                    <Input size="xs" variant="underlined" placeholder="Preço Custo" onChangeText={(text) => this.setState({ newArtigo: { ...this.state.newArtigo, PrecoCusto: text } })} />
                                    <Text style={styles.Label}>Descrição</Text>
                                    <Input size="xs" variant="underlined" placeholder="Descrição" onChangeText={(text) => this.setState({ newArtigo: { ...this.state.newArtigo, DescricaoLonga: text } })} />
                                    <Text style={styles.Label}>Retenção</Text>
                                    <Input size="xs" variant="underlined" placeholder="Retenção" onChangeText={(text) => this.setState({ newArtigo: { ...this.state.newArtigo, Retencao: text } })} />
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
                                    this.submitAddArtigo();
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