import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes, } from "../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const hairWashServicesList = [
    {
        id: '1',
        serviceName: 'Babylights en tono caramelo',
        amount: 75.00,
        duration: '20 min',
        serviceDetail: 'Incluye: lavado de color, protección de color, tratamiento nutritivo post color, secado, planchado o en ondas.'
    },
    {
        id: '2',
        serviceName: 'Balayage + babylights  en tono rubio',
        amount: 100.00,
        duration: '35 min',
        serviceDetail: 'Incluye: lavado de color, tratamiento de color, secado, planchado o en ondas. Precio varía, según largo de cabello, tono que se posee del cabello y tono deseado.'
    },
    {
        id: '3',
        serviceName: 'Cabello platinado en técnica de balayage',
        amount: 100.00,
        duration: '35 min',
        serviceDetail: 'Incluye: protección de color, aplicación de técnica, lavado de color, tratamiento nutritivo de color, secado, planchado o en ondas. Nota: Precio varía según el largo del cabello.'
    },
    {
        id: '4',
        serviceName: 'Ondas más trenza',
        amount: 35.00,
        duration: '40 min',
        serviceDetail: 'Precio varía según largo y abundancia.'
    },
    {
        id: '5',
        serviceName: 'Peinados de boda o quince años',
        duration: '1 Hora',
        amount: 45.00,
        serviceDetail: 'Incluye: protección térmica, estilizado de cabello y realización de peinado. Precio varía según estilo del peinado, largo del cabello y abundancia.'
    },
    {
        id: '6',
        serviceName: 'Alisado de keratina orgánica de 50 kilates',
        amount: 35.00,
        duration: '1 Hora',
        serviceDetail: 'Incluye: lavado, proceso de alisado, lavado con tratamiento incluido, secado y planchado ( posteriormente se programa lavado de finalizado y sellado) Nota: precio varía según abundancia y largo.'
    },
    {
        id: '7',
        serviceName: 'Tinte completo en cabello corto',
        amount: 45.00,
        duration: '1 houra 30 min',
        serviceDetail: 'Incluye: lavado de color, tratamiento de protección, lavado nutritivo de color, secado, planchado o en ondas  Nota: El precio varía según largo, abundancia , tono deseado y tonalidad que se posee actualmente en el cabello.'
    },
    {
        id: '8',
        serviceName: 'Tinte completo en cabello largo',
        amount: 55.00,
        duration: '1 houra 30 min',
        serviceDetail: 'Incluye: lavado de color, tratamiento de protección, lavado nutritivo de color, secado, planchado o en ondas Nota: El precio varía según largo, abundancia , tono deseado y tonalidad que se posee actualmente en el cabello.'
    },
    {
        id: '1',
        serviceName: 'Corte Basico',
        amount: 5.00,
        duration: '30 min',
    },
];


const ServiceDetailScreen = ({ navigation }) => {

    const [state, setState] = useState({
        selectedHairWashServiceId: hairWashServicesList[0].id,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        selectedHairWashServiceId,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 8.0, }}
                >
                    {hairWashServices()}
                </ScrollView>
                {continueButton()}
            </View>
        </SafeAreaView>
    )

    function continueButton() {
        return (
            <View style={styles.continueButtonWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('ScheduleAppointment')}
                    style={styles.continueButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor18SemiBold }}>
                        Continuar
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function hairWashServices() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Bold }}>
                    Hair Styles
                </Text>
                {
                    hairWashServicesList.map((item) => (
                        <View key={`${item.id}`}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => updateState({ selectedHairWashServiceId: item.id })}
                                style={{ alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between' }}
                            >
                                <View style={{ flex: 1 }}>
                                    <Text style={{ ...Fonts.blackColor14Bold }}>
                                        {item.serviceName}
                                    </Text>
                                    <Text style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor13Bold }}>
                                        Duracion : {item.duration}
                                    </Text>
                                    <Text style={{ lineHeight: 17.0, ...Fonts.grayColor13Bold }}>
                                        {item.serviceDetail}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{
                                        backgroundColor: selectedHairWashServiceId == item.id ? 'transparent' : Colors.lightGrayColor,
                                        borderColor: selectedHairWashServiceId == item.id ? Colors.primaryColor : Colors.lightGrayColor,
                                        ...styles.radioButtonStyle,
                                    }}>
                                        {
                                            selectedHairWashServiceId == item.id
                                                ?
                                                <View style={{
                                                    backgroundColor: Colors.primaryColor,
                                                    width: 6.0,
                                                    height: 6.0,
                                                    borderRadius: 3.0
                                                }}
                                                />
                                                :
                                                null
                                        }
                                    </View>
                                    <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.primaryColor14Bold }}>
                                        {`$`}{item.amount.toFixed(2)}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{
                                height: 1.0,
                                backgroundColor: Colors.grayColor,
                                marginTop: Sizes.fixPadding + 5.0,
                                marginBottom: Sizes.fixPadding + 2.0,
                            }} />
                        </View>
                    ))
                }
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back-ios"
                    size={22}
                    color={Colors.blackColor}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor18Bold }}>
                    Hairstyle
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0
    },
    radioButtonStyle: {
        width: 15.0,
        height: 15.0,
        borderRadius: 7.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.0,
    },
    continueButtonWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        backgroundColor: Colors.whiteColor
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
});

export default ServiceDetailScreen;