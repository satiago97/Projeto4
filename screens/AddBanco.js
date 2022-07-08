/* eslint-disable prettier/prettier */
import React, { useState, useEffect, Component } from 'react';
import bancosService from '../services/bancosService';
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
    DevSettings,
    TextInput,
} from 'react-native';

import Swiper from 'react-native-swiper';



export default class AddBanco extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            dataSource: [],
            array: [],
            showModal: false,
            showModalEdit: false,
            numero_snc: '',
            nome: '',
        }
    }


    inserirBanco = (nome, numero_snc) => {
        bancosService.addBanco(nome, numero_snc).then(response => {
            this.setState({
                isLoading: false,
            })
            console.log(nome, numero_snc)
        })

    }



    render() {
        let {
            nome, numero_snc
        } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <TextInput
                    placeholder='Nome'
                    style={styles.input}
                    onChangeText={(text) => this.setState({ ...this.state.nome, nome: text })}

                />
                <TextInput
                    style={styles.input}
                    placeholder="SNC_Base_Banco(12 ou 13)"
                    keyboardType="numeric"
                    onChangeText={(text) => this.setState({ ...this.state.numero_snc, numero_snc: text })}
                />

                <Button style={styles.btnSubmit} onPress={() => { this.inserirBanco(this.state.nome, this.state.numero_snc) }}>Adicionar</Button>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 40,
        width: '90%',

    },
    input: {
        backgroundColor: '#fff',
        width: '90%',
        marginBottom: 15,
        color: '#000',
        fontSize: 17,
        borderRadius: 7,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    btnSubmit: {
        backgroundColor: '#9C5D26',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },
});