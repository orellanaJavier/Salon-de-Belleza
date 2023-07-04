import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes, } from "../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const NailsServicesList = [
    {
        id: '1',
        serviceName: 'Uñas cuadras french con diseño medianas',
        amount: 18.00,
        duration: '30 min',
        serviceDetail:'Precio varía según diseño y largo'
    },
];

const NailsDetailsScreen = ({navigation}) => {
    const [state, setState] = useState({
        selectedNailsServiceId: NailsServicesList[0].id
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        selectedNailsServiceId
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
                    {NailsServices()}
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

    function NailsServices(){
        return(
            <View style={{ marginTop: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Bold }}>
                     Uñas Acrilicas
                </Text>
                {
                    NailsServicesList.map((item) => (
                        <View key={`${item.id}`}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => updateState({ selectedNailsServiceId: item.id })}
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
                                        backgroundColor: selectedNailsServiceId == item.id ? 'transparent' : Colors.lightGrayColor,
                                        borderColor: selectedNailsServiceId == item.id ? Colors.primaryColor : Colors.lightGrayColor,
                                        ...styles.radioButtonStyle,
                                    }}>
                                        {
                                            selectedNailsServiceId == item.id
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
                            {
                                NailsServicesList.length == 1
                                    ?
                                    null
                                    :
                                    <View style={{
                                        height: 1.0,
                                        backgroundColor: Colors.grayColor,
                                        marginTop: Sizes.fixPadding + 5.0,
                                        marginBottom: Sizes.fixPadding + 2.0,
                                    }} />
                            }
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
                    Uñas Acrilicas
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

export default NailsDetailsScreen;