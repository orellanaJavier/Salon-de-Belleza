import React, { useEffect } from "react";
import { View } from "react-native";
import * as Font from "expo-font";
import { Colors } from "../constants/styles";

const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                Fahkwang_Light: require("../assets/fonts/Fahkwang-Light.ttf"),
                Fahkwang_Medium: require("../assets/fonts/Fahkwang-Medium.ttf"),
                Fahkwang_Regular: require("../assets/fonts/Fahkwang-Regular.ttf"),
                Fahkwang_SemiBold: require("../assets/fonts/Fahkwang-SemiBold.ttf"),
                Fahkwang_Bold: require("../assets/fonts/Fahkwang-Bold.ttf"),
            });
            navigation.navigate('Splash');
        }
        loadFont();
    })

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }} />
    )
}

export default LoadingScreen;

