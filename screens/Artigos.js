/* eslint-disable prettier/prettier */
import React, { useState, useEffect, Component } from 'react';
import articlesService from '../services/articlesService';
import { ActivityIndicator } from 'react-native';
import { Stack, Center, Heading, VStack, Divider, NativeBaseProvider, Box, HStack, Avatar, Spacer, Image } from "native-base";

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    Animated,
    FlatList,
} from 'react-native';


export default class Artigos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            array: [],
        }
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
        let { dataSource, isLoading, array } = this.state;
        for (let i = 0; i < dataSource.length; i++) {
            array[i] = { 'id': dataSource[i][0], 'nome': dataSource[i][1] };
        }
        return (
            <Box>
                <Heading fontSize="xl" p="4" pb="3">
                    Clientes
                </Heading>
                <FlatList data={array} renderItem={({
                    item
                }) => <Box borderBottomWidth="1" _dark={{
                    borderColor: "gray.600"
                }} borderColor="coolGray.200" pl="4" pr="5" py="2">
                        <HStack space={3} justifyContent="space-between">
                            <Avatar size="48px" source={{
                                uri: 'https://img.icons8.com/arcade/64/000000/experimental-box-arcade.png'
                            }} />
                            <VStack>
                                <Text _dark={{
                                    color: "warmGray.50"
                                }} color="coolGray.800" bold>
                                    <Text style={{ fontWeight: "bold" }}>ID:</Text> {item.id}
                                </Text>
                                <Text color="coolGray.600" _dark={{
                                    color: "warmGray.200"
                                }}>
                                    <Text style={{ fontWeight: "bold" }}>Nome do cliente:</Text> {item.nome}
                                </Text>
                            </VStack>
                            <Spacer />
                            <TouchableOpacity>
                                <Image size="20px" alt='viewImage' source={{
                                    uri: 'https://img.icons8.com/color/48/000000/eyes-cartoon.png'
                                }} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image size="20px" alt='editImage' source={{
                                    uri: 'https://img.icons8.com/color/48/000000/edit--v1.png'
                                }} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image size="20px" alt='deleteImage' source={{
                                    uri: 'https://img.icons8.com/plasticine/100/000000/filled-trash.png'
                                }} />
                            </TouchableOpacity>
                        </HStack>
                    </Box>} keyExtractor={item => item.id} />
            </Box>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },

});
