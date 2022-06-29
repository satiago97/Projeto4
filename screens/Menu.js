/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native'
import { Stack, Center, Heading, ScrollView, VStack, Divider, NativeBaseProvider, Text, View } from "native-base";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


const data1 = [
  {
    name: "Faturado",
    population: 50000,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 8
  },
  {
    name: "Pago",
    population: 30000,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 8
  }
];

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

function Menu() {

  return (
    <ScrollView>
      <VStack space="2.5" mt="3" px="4">
        <Heading size="md" margin={2} textAlign="center" >2022</Heading>
        <Stack direction="row" mb="2.5" mt="1.5" space={3}>
          <Center size="20" bg="#C8742A" rounded="lg" _text={{
            color: "warmGray.50",
            fontWeight: "medium"
          }} shadow={"3"}>
            Total Faturado
            <Text fontSize="md" color="white">1500€</Text>
          </Center>
          <Center bg="#C6620A" size="20" rounded="lg" _text={{
            color: "warmGray.50",
            fontWeight: "medium"
          }} shadow={"3"}>
            Total Fat. Liquidado
            <Text fontSize="md" color="white">15000€</Text>
          </Center>
          <Center size="20" bg="#9C5D26" rounded="lg" _text={{
            color: "warmGray.50",
            fontWeight: "medium"
          }} shadow={"3"}>
            Total Fat. P/ Liquidar
            <Text fontSize="md" color="white">150000€</Text>
          </Center>
        </Stack>
      </VStack>
      <VStack space="2.5" mt="3" px="4">
        <Stack direction="row" mb="2.5" mt="1.5" space={3}>
          <Center size="20" bg="#C8742A" rounded="lg" _text={{
            color: "warmGray.50",
            fontWeight: "medium"
          }} shadow={"3"}>
            Total IVA Faturas
            <Text fontSize="md" color="white">1500€</Text>
          </Center>
          <Center bg="#C6620A" size="20" rounded="lg" _text={{
            color: "warmGray.50",
            fontWeight: "medium"
          }} shadow={"3"}>
            Total Comprado
            <Text fontSize="md" color="white">15000€</Text>
          </Center>
          <Center size="20" bg="#9C5D26" rounded="lg" _text={{
            color: "warmGray.50",
            fontWeight: "medium"
          }} shadow={"3"}>
            Total Compras Liquidado
            <Text fontSize="md" color="white">150000€</Text>
          </Center>
        </Stack>
      </VStack>
      <VStack space="2.5" mt="3" px="4">
        <Stack direction="row" mb="2.5" mt="1.5" space={3}>
          <Center size="20" bg="#C8742A" rounded="lg" _text={{
            color: "warmGray.50",
            fontWeight: "medium"
          }} shadow={"3"}>
            Tot. Compras P/Liquidar
            <Text fontSize="md" color="white">1500€</Text>
          </Center>
          <Center bg="#C6620A" size="20" rounded="lg" _text={{
            color: "warmGray.50",
            fontWeight: "medium"
          }} shadow={"3"}>
            Nº Clientes
            <Text fontSize="md" color="white">15000€</Text>
          </Center>
          <Center size="20" bg="#9C5D26" rounded="lg" _text={{
            color: "warmGray.50",
            fontWeight: "medium"
          }} shadow={"3"}>
            Nº Fornecedores
            <Text fontSize="md" color="white">150000€</Text>
          </Center>
        </Stack>
      </VStack>
      <VStack space="2.5" mt="3" px="4">
        <Stack direction="row" mb="2.5" mt="1.5" space={3}>
          <Center size="20" bg="#C8742A" rounded="lg" _text={{
            color: "warmGray.50",
            fontWeight: "medium"
          }} shadow={"3"}>
            Nº Guias Registadas
            <Text fontSize="md" color="white">1500€</Text>
          </Center>
          <Center bg="#C6620A" size="20" rounded="lg" _text={{
            color: "warmGray.50",
            fontWeight: "medium"
          }} shadow={"3"}>
            Nº Fat Registadas
            <Text fontSize="md" color="white">15000€</Text>
          </Center>
        </Stack>
      </VStack>

      <VStack space="2.5" mt="3" px="4">
        <Heading size="md" margin={2} textAlign="center" >Visão Global</Heading>
        <Stack direction="row" mb="2.5" mt="1.5" space={3}>
          <Center size="20" bg="#C8742A" rounded="lg" _text={{
            color: "warmGray.50",
            fontWeight: "medium"
          }} shadow={"3"}>
            Faturado Hoje
            <Text fontSize="md" color="white">1500€</Text>
          </Center>
          <Center bg="#C6620A" size="20" rounded="lg" _text={{
            color: "warmGray.50",
            fontWeight: "medium"
          }} shadow={"3"}>
            Faturado Mês
            <Text fontSize="md" color="white">15000€</Text>
          </Center>
          <Center size="20" bg="#9C5D26" rounded="lg" _text={{
            color: "warmGray.50",
            fontWeight: "medium"
          }} shadow={"3"}>
            Faturado Ano
            <Text fontSize="md" color="white">150000€</Text>
          </Center>
        </Stack>
      </VStack>
      <VStack space="2.5" mt="3" px="4">
        <Stack direction="row" mb="2.5" mt="1.5" space={3}>
          <Center size="20" bg="#C8742A" rounded="lg" _text={{
            color: "warmGray.50",
            fontWeight: "medium"
          }} shadow={"3"}>
            Iva Mês Anterior
            <Text fontSize="md" color="white">1500€</Text>
          </Center>
          <Center bg="#C6620A" size="20" rounded="lg" _text={{
            color: "warmGray.50",
            fontWeight: "medium"
          }} shadow={"3"}>
            Iva Mês Atual
            <Text fontSize="md" color="white">15000€</Text>
          </Center>
          <Center size="20" bg="#9C5D26" rounded="lg" _text={{
            color: "warmGray.50",
            fontWeight: "medium"
          }} shadow={"3"}>
            Iva Anual
            <Text fontSize="md" color="white">150000€</Text>
          </Center>
        </Stack>
      </VStack>
      {/* Line Chart*/}
      <View>
        <Heading size="md" margin={2} textAlign="center">Variação Anual de Compras</Heading>
        <LineChart
          data={{
            labels: ["Jan", "Febr", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={Dimensions.get("window").width - 100} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>

      {/* Pie Chart*/}
      <Heading size="md" margin={2} textAlign="center">Variação Anual de Faturação</Heading>
      <View backgroundColor={"cyan.300"} rounded="xl" marginBottom={2} marginTop={2}>
        <PieChart
          data={data1}
          width={Dimensions.get("window").width - 100}
          height={200}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          center={[0, 0]}
          absolute
        />
      </View>
    </ScrollView>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Menu />
      </Center>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  Pie: {
    backgroundColor: 'black'
  },
  heading: {
    fontFamily: "Papyrus",
    fontSize: 24,
    fontWeight: 700
  }
});
