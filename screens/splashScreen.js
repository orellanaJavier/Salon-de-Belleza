import React, { useCallback } from "react";
import { SafeAreaView, View, StatusBar, Image, BackHandler } from "react-native";
import { Colors } from "../constants/styles";
import { useFocusEffect } from "@react-navigation/native";

const SplashScreen = ({ navigation }) => {

    const backAction = () => {
        BackHandler.exitApp();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    setTimeout(() => {
        navigation.push('Onboarding');
    }, 2000);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{
                flex: 1, backgroundColor: Colors.primaryColor,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image
                    source={require('../assets/images/logo.png')}
                    style={{ height: 100.0, width: 230 }}
                />
            </View>
        </SafeAreaView>
    )
}

export default SplashScreen;