import React, { useState, useCallback } from "react";
import { Dimensions, BackHandler, SafeAreaView, View, ScrollView, TouchableOpacity, ImageBackground, TextInput, StatusBar, Image, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../constants/styles";
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get('screen');

const SigninScreen = ({ navigation }) => {

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        updateState({ backClickCount: 1 });
        setTimeout(() => {
            updateState({ backClickCount: 0 })
        }, 1000)
    }

    const [state, setState] = useState({
        userName: null,
        password: null,
        securePassword: false,
        backClickCount: 0
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        userName,
        password,
        securePassword,
        backClickCount,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <ImageBackground
                source={require('../assets/images/bg.png')}
                style={{ flex: 1, left: -width / 20.0, }}
            >
                <View style={{ flex: 1, right: -width / 20.0, }}>
                    {header()}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {userNameTextField()}
                        {passwordTextField()}
                        {forgotPasswordText()}
                        {signinButton()}
                        {orSigninWithDivider()}
                        {socialMediaOptions()}
                        {dontAccountInfo()}
                    </ScrollView>
                </View>
            </ImageBackground>
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor12Medium }}>
                            Press Back Once Again to Exit
                        </Text>
                    </View>
                    :
                    null
            }
        </SafeAreaView >
    )

    function dontAccountInfo() {
        return (
            <Text style={{
                textAlign: 'center',
                marginTop: Sizes.fixPadding
            }}>
                <Text style={{ ...Fonts.grayColor15Bold }}>
                    Don't have account?{` `}
                </Text>
                <Text
                    onPress={() => navigation.push('Signup')}
                    style={{ ...Fonts.primaryColor15Bold }}
                >
                    Sign up now
                </Text>
            </Text>
        )
    }

    function socialMediaOptions() {
        return (
            <View>
                <View style={styles.socialMediaOptionsWrapStyle}>
                    {optionsShort({
                        bgColor: '#4267B2',
                        image: require('../assets/images/icons/facebook.png'),
                    })}
                    {optionsShort({
                        bgColor: '#1DA1F2',
                        image: require('../assets/images/icons/twitter.png'),
                    })}
                    {optionsShort({
                        bgColor: '#EA4335',
                        image: require('../assets/images/icons/google.png')
                    })}
                </View>
            </View>
        )
    }

    function optionsShort({ bgColor, image }) {
        return (
            <View style={{ backgroundColor: bgColor, ...styles.optionsShortWrapStyle }}>
                <Image
                    source={image}
                    style={{ width: 20.0, height: 20.0, }}
                    resizeMode="contain"
                />
            </View>
        )
    }

    function orSigninWithDivider() {
        return (
            <View style={styles.orSigninWithDividerStyle}>
                <View style={{
                    flex: 1,
                    backgroundColor: Colors.grayColor,
                    height: 1.0,
                }} />
                <Text style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.grayColor14Bold }}>
                    Or sign in with
                </Text>
                <View style={{
                    flex: 1,
                    backgroundColor: Colors.grayColor,
                    height: 1.0,
                }} />
            </View>
        )
    }

    function signinButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('Signup')}
                style={styles.signinButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18SemiBold }}>
                    Sign In
                </Text>
            </TouchableOpacity>
        )
    }

    function forgotPasswordText() {
        return (
            <Text style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                textAlign: 'right',
                ...Fonts.grayColor14Bold
            }}>
                Forget password?
            </Text>
        )
    }

    function passwordTextField() {
        return (
            <View style={{ marginTop: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons name="lock" size={19} color={Colors.grayColor} />
                        <TextInput
                            secureTextEntry={securePassword}
                            value={password}
                            onChangeText={(text) => updateState({ password: text })}
                            placeholder="Password"
                            placeholderTextColor={Colors.grayColor}
                            selectionColor={Colors.primaryColor}
                            style={{
                                marginLeft: Sizes.fixPadding,
                                ...Fonts.blackColor15Bold,
                                flex: 1,
                            }}
                        />
                    </View>
                    <MaterialCommunityIcons
                        name={securePassword ? "eye-off" : "eye"}
                        size={19}
                        color={Colors.grayColor}
                        onPress={() => updateState({ securePassword: !securePassword })}
                    />
                </View>
                <View style={{
                    backgroundColor: Colors.grayColor, height: 1.5,
                    marginVertical: Sizes.fixPadding - 5.0,
                }} />
            </View>
        )
    }

    function userNameTextField() {
        return (
            <View style={{ marginTop: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome name="user" size={17} color={Colors.grayColor} />
                    <TextInput
                        value={userName}
                        onChangeText={(text) => updateState({ userName: text })}
                        placeholder="User Name"
                        placeholderTextColor={Colors.grayColor}
                        selectionColor={Colors.primaryColor}
                        style={{
                            marginLeft: Sizes.fixPadding,
                            ...Fonts.blackColor15Bold, flex: 1
                        }}
                    />
                </View>
                <View style={{
                    backgroundColor: Colors.grayColor, height: 1.5,
                    marginVertical: Sizes.fixPadding - 5.0,
                }} />
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor18Bold }}>
                    Signin to your account
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 20,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
    headerWrapStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0
    },
    signinButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 3.0,
    },
    socialMediaOptionsWrapStyle: {
        marginTop: Sizes.fixPadding + 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionsShortWrapStyle: {
        width: 45.0,
        height: 45.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding - 5.0,
    },
    orSigninWithDividerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: Sizes.fixPadding * 2.0,
    }
});

export default SigninScreen;