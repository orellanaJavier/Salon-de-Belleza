import React, { createRef, useState } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, ImageBackground, Dimensions, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { Circle } from 'react-native-animated-spinkit';
import OTPTextView from 'react-native-otp-textinput';

const { width } = Dimensions.get('window');

const VerificationScreen = ({ navigation }) => {

    const [otpInput, setotpInput] = useState('');
    const [isLoading, setisLoading] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <ImageBackground
                source={require('../assets/images/bg.png')}
                style={{
                    flex: 1,
                    left: -width / 20.0,
                    alignSelf: 'stretch'
                }}
            >
                <View style={{ flex: 1, right: -width / 20.0 }}>
                    {header()}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {verifyInfo()}
                        {otpInfo()}
                        {getStartedButton()}
                    </ScrollView>
                </View>
            </ImageBackground>
            {loading()}
        </SafeAreaView>
    )

    function loading() {
        return (
            <Dialog.Container
                visible={isLoading}
                contentStyle={{
                    borderRadius: Sizes.fixPadding - 5.0,
                    width: width - 40,
                    paddingVertical: Sizes.fixPadding,
                }}
                headerStyle={{ margin: 0.0 }}
            >
                <View style={{
                    marginTop: Sizes.fixPadding + 5.0,
                    backgroundColor: Colors.whiteColor,
                    alignItems: 'center',
                }}>
                    <Circle size={50} color={Colors.primaryColor} />
                    <Text style={{
                        ...Fonts.grayColor14Bold,
                        marginTop: Sizes.fixPadding * 2.5
                    }}>
                        Please Wait..
                    </Text>
                </View>
            </Dialog.Container>
        );
    }

    function getStartedButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    setisLoading(true)
                    setTimeout(() => {
                        setisLoading(false)
                        navigation.push('BottomTabBar')
                    }, 2000);
                }}
                style={styles.getStartedButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18SemiBold }}>
                    Get Started
                </Text>
            </TouchableOpacity>
        )
    }

    function otpInfo() {
        return (
            <View>
                <Text style={{ marginTop: Sizes.fixPadding + 5.0, textAlign: 'center', ...Fonts.blackColor14Bold }}>
                    Enter OTP code here
                </Text>
                <OTPTextView
                    containerStyle={{ marginHorizontal: Sizes.fixPadding * 5.0, marginTop: Sizes.fixPadding + 5.0, }}
                    handleTextChange={(text) => {
                        setotpInput(text)
                        if (otpInput.length == 3) {
                            setisLoading(true)
                            setTimeout(() => {
                                setisLoading(false)
                                navigation.push('BottomTabBar')
                            }, 2000);
                        }
                    }}
                    inputCount={4}
                    keyboardType="numeric"
                    tintColor={Colors.primaryColor}
                    offTintColor={Colors.lightGrayColor}
                    textInputStyle={{ ...styles.textFieldStyle }}
                />
            </View>
        )
    }

    function verifyInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, alignItems: 'center' }}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    Verify your mobile number
                </Text>
                <Text style={{ textAlign: 'center', ...Fonts.blackColor13Medium }}>
                    {`We have an SMS with a code to\nnumber +91 8562312365`}
                </Text>
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0
    },
    getStartedButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 3.0,
    },
    textFieldStyle: {
        borderBottomWidth: null,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        ...Fonts.blackColor14Medium,
    },
});

export default VerificationScreen;