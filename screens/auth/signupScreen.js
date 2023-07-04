import React, { useState } from "react";
import { Dimensions, SafeAreaView, View, StatusBar, ScrollView, StyleSheet, Image, ImageBackground, TouchableOpacity, TextInput, Text } from "react-native";
import { Colors, Fonts, Sizes, } from '../../constants/styles';
import { MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebaseConfig';

const { width } = Dimensions.get('window');

const SignupScreen = () => {
    const [email,setEmail] = React.useState('')
    const [password,setPassword] = React.useState('')
    const [confirmPassword,setConfirmPassword] = React.useState('')
    const [name,setName] = React.useState('')
    const navigation = useNavigation();
  
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
  
    const handleCreateAccount = () => {
      createUserWithEmailAndPassword(auth,email,password,confirmPassword,name)
      .then((userCredential) =>{
        console.log('Cuenta Creada')
        navigation.navigate('Signin');
        const user = userCredential.user;
        console.log(user)
      })
      .catch(error =>{
        console.log(error)
        Alert.alert(error.message)
      })
    }

    const [state, setState] = useState({
        userName: null,
        mobileNumber: null,
        securePassword: false,
        secureConfirmPassword: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        userName,
        mobileNumber,
        securePassword,
        secureConfirmPassword,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <ImageBackground
                source={require('../../assets/images/bg.png')}
                style={{
                    flex: 1,
                    left: -width / 20.0,
                }}
            >
                <View style={{ flex: 1, right: -width / 20.0 }}>
                    {header()}
                    <ScrollView showsVerticalScrollIndicator={false} >
                        {userNameTextField()}
                        {emailTextField()}
                        {mobileNumberTextField()}
                        {passwordTextField()}
                        {confirmPasswordTextField()}
                        {signupButton()}
                        {orSigninWithDivider()}
                        {socialMediaOptions()}
                        {alreadyAccountInfo()}
                    </ScrollView>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )

    function alreadyAccountInfo() {
        return (
            <Text style={{
                textAlign: 'center',
                marginTop: Sizes.fixPadding
            }}>
                <Text style={{ ...Fonts.grayColor15Bold }}>
                    Already have account?{` `}
                </Text>
                <Text
                    onPress={() => navigation.push('Signin')}
                    style={{ ...Fonts.primaryColor15Bold }}
                >
                    Sign in now
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
                        image: require('../../assets/images/icons/facebook.png'),
                    })}
                    {optionsShort({
                        bgColor: '#1DA1F2',
                        image: require('../../assets/images/icons/twitter.png'),
                    })}
                    {optionsShort({
                        bgColor: '#EA4335',
                        image: require('../../assets/images/icons/google.png')
                    })}
                </View>
            </View>
        )
    }

    function optionsShort({ bgColor, image }) {
        return (
            <View style={{ ...styles.optionsShortWrapStyle, backgroundColor: bgColor, }}>
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

    function signupButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleCreateAccount}
                style={styles.signupButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18SemiBold }}>
                    Sign Up
                </Text>
            </TouchableOpacity>
        )
    }

    function confirmPasswordTextField() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons name="lock" size={19} color={Colors.grayColor} />
                        <TextInput
                            secureTextEntry={secureConfirmPassword}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholder="Confirmar Contraseña"
                            placeholderTextColor={Colors.grayColor}
                            selectionColor={Colors.primaryColor}
                            style={{
                                marginLeft: Sizes.fixPadding,
                                ...Fonts.blackColor15Bold, flex: 1
                            }}
                        />
                    </View>
                    <MaterialCommunityIcons
                        name={secureConfirmPassword ? "eye-off" : "eye"}
                        size={19}
                        color={Colors.grayColor}
                        onPress={() => updateState({ secureConfirmPassword: !secureConfirmPassword })}
                    />
                </View>
                <View style={{
                    backgroundColor: Colors.grayColor, height: 1.5,
                    marginVertical: Sizes.fixPadding - 5.0,
                }} />
            </View>
        )
    }

    function passwordTextField() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons name="lock" size={19} color={Colors.grayColor} />
                        <TextInput
                            secureTextEntry={securePassword}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Contraseña"
                            placeholderTextColor={Colors.grayColor}
                            selectionColor={Colors.primaryColor}
                            style={{
                                marginLeft: Sizes.fixPadding,
                                ...Fonts.blackColor15Bold, flex: 1
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

    function mobileNumberTextField() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="phone-android" size={19} color={Colors.grayColor} />
                    <TextInput
                        keyboardType="phone-pad"
                        value={mobileNumber}
                        onChangeText={(text) => updateState({ mobileNumber: text })}
                        placeholder="Mobile Number"
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

    function emailTextField() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="email" size={19} color={Colors.grayColor} />
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                        placeholderTextColor={Colors.grayColor}
                        selectionColor={Colors.primaryColor}
                        style={{
                            marginLeft: Sizes.fixPadding,
                            ...Fonts.blackColor15Bold, flex: 1
                        }}
                        keyboardType="email-address"
                    />
                </View>
                <View style={{
                    backgroundColor: Colors.grayColor,
                    height: 1.5,
                    marginVertical: Sizes.fixPadding - 5.0,
                }} />
            </View>
        )
    }

    function userNameTextField() {
        return (
            <View style={{ marginTop: Sizes.fixPadding + 5.0, marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome name="user" size={17} color={Colors.grayColor} />
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        placeholder="Usuario"
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
                <MaterialIcons
                    name="arrow-back-ios"
                    size={22}
                    color={Colors.blackColor}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor18Bold }}>
                    Signup to your account
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
    signupButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 3.0,
    },
    optionsShortWrapStyle: {
        width: 45.0,
        height: 45.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding - 5.0,
    },
    socialMediaOptionsWrapStyle: {
        marginTop: Sizes.fixPadding + 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    orSigninWithDividerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: Sizes.fixPadding * 2.0,
    }
});

export default SignupScreen;