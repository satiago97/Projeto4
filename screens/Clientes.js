/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import clientsService from '../services/clientsService';
import { ActivityIndicator } from 'react-native';


import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    KeyboardAvoidingView,
    Image,
    TextInput,
    TouchableOpacity,
    Animated,
    FlatList,
    Table
} from 'react-native';

export default function Clientes() {
    return (
        <View style={styles.container}>
            <View style={styles.tableContainer}>
                <View style={styles.tableRowHeader}>
                    <View style={styles.tableColumnHeader}>
                        <Text style={styles.textHeader}>Lista de Clientes</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableColumnClockInOutTimes}>
                        <Text style={styles.textLineItem}>10:00 AM - 12:00 PM</Text>
                    </View>
                    <View style={styles.tableColumnTotals}>
                        <Text style={styles.textLineItem}>2 Hrs</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        flex: 1,
        padding: 10
    },
    tableColumnHeader: {
        alignItems: "center",
        backgroundColor: "#9C5D26",
        flex: 5,
        justifyContent: "center"
    },
    tableColumnClockInOutTimes: {
        alignItems: "center",
        backgroundColor: "#A8A7A0",
        flex: 3,
        justifyContent: "center",
        margin: 1
    },
    tableColumnTotals: {
        alignItems: "center",
        backgroundColor: "#A8A7A0",
        flex: 2,
        justifyContent: "center",
        margin: 1
    },
    tableRow: {
        flex: 5,
        flexDirection: "row",
        maxHeight: 30
    },
    tableRowHeader: {
        flex: 5,
        flexDirection: "row",
        maxHeight: 40
    },
    tableContainer: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        flex: 1,
        marginTop: 0,
        padding: 10
    },
    textHeader: {
        color: "#FFFFFF",
        fontWeight: "bold"
    },
    textLineItem: {
        color: "#FFFFFF"
    }
});