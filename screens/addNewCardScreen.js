import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    ToastAndroid,
    TouchableOpacity,
    View,
    StatusBar,
    Text,
    StyleSheet,
} from "react-native";
import { Colors, Fonts, Sizes } from '../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { CreditCardInput } from "../components/creditCard/expo-credit-card";

const AddNewCardScreen = ({ navigation }) => {

    const [state, setState] = useState({
        cardNumberStatus: 'invalid',
        cardExpiryStatus: 'invalid',
        cardCvcStatus: 'invalid',
        cardHolderStatus: 'invalid',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        cardNumberStatus,
        cardExpiryStatus,
        cardCvcStatus,
        cardHolderStatus,
    } = state;

    const _onChange = (formData) => {
        updateState({
            cardNumberStatus: formData.status.number,
            cardExpiryStatus: formData.status.expiry,
            cardCvcStatus: formData.status.cvc,
            cardHolderStatus: formData.status.name,
        })
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {addNewCardText()}
                    {cardDetails()}
                    {addButton()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function addNewCardText() {
        return (
            <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Bold }}>
                Add New Card
            </Text>
        )
    }

    function cardDetails() {
        return (
            <CreditCardInput
                autoFocus={true}
                requiresName
                requiresCVC
                labelStyle={{ ...Fonts.blackColor14Medium }}
                inputStyle={{ ...Fonts.blackColor14Medium, }}
                inputContainerStyle={{
                    marginBottom: Sizes.fixPadding,
                    borderBottomColor: 'transparent',
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}
                cardFontFamily='Fahkwang_Regular'
                cardScale={1.0}
                validColor={"black"}
                invalidColor={"red"}
                placeholderColor={Colors.grayColor}
                onChange={_onChange}
            />
        )
    }

    function addButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    cardNumberStatus == 'invalid' ||
                        cardNumberStatus == 'incomplete' ||
                        cardExpiryStatus == "invalid" ||
                        cardExpiryStatus == "incomplete" ||
                        cardCvcStatus == 'invalid' ||
                        cardHolderStatus == "invalid" ?
                        ToastAndroid.show("Please fill valid details", ToastAndroid.LONG)
                        :
                        navigation.pop()
                }}
                style={styles.addButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18SemiBold }}>
                    Add
                </Text>
            </TouchableOpacity>
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding + 5.0,
        paddingBottom: Sizes.fixPadding,
    },
    addButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding + 5.0,
    },
})

export default AddNewCardScreen;