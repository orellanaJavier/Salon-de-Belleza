import React, { useState, useCallback } from "react";
import { Text, BackHandler, StyleSheet, Image, View } from "react-native";
import { Colors, Fonts, Sizes } from '../constants/styles';
import HomeScreen from "../screens/home/homeScreen";
import ProfileScreen from "../screens/profileScreen";
import NearByScreen from "../screens/nearByScreen";
import AppointmentScreen from "../screens/appointmentScreen";
import { useFocusEffect } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {

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
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0)
        }, 1000)
    }

    const [backClickCount, setBackClickCount] = useState(0);

    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: Colors.primaryColor,
                    tabBarInactiveTintColor: Colors.grayColor,
                    tabBarLabelStyle: {
                        lineHeight: 20.0,
                        fontSize: 13.0,
                        fontFamily: 'Fahkwang_Bold',
                        marginBottom: Sizes.fixPadding - 5.0,
                    },
                    tabBarHideOnKeyboard: true,
                    tabBarStyle: { backgroundColor: Colors.whiteColor, height: 60.0, paddingTop: Sizes.fixPadding, },
                }}
            >
                <Tab.Screen
                    name={'Home'}
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color }) => <Image
                            source={require('../assets/images/icons/home.png')}
                            style={{ width: 22.0, height: 22.0, tintColor: color, resizeMode: 'contain' }}
                            resizeMode="contain"
                        />
                    }}
                />
                <Tab.Screen
                    name={'NearBy'}
                    component={NearByScreen}
                    options={{
                        tabBarIcon: ({ color }) => <Image
                            source={require('../assets/images/icons/nearby.png')}
                            style={{ width: 22.0, height: 22.0, tintColor: color, resizeMode: 'contain' }}
                            resizeMode="contain"
                        />
                    }}
                />
                <Tab.Screen
                    name={'Appointment'}
                    component={AppointmentScreen}
                    options={{
                        tabBarIcon: ({ color }) => <Image
                            source={require('../assets/images/icons/appointment.png')}
                            style={{ width: 22.0, height: 22.0, tintColor: color, resizeMode: 'contain' }}
                            resizeMode="contain"
                        />
                    }}
                />
                <Tab.Screen
                    name={'Profile'}
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ color }) => <Image
                            source={require('../assets/images/icons/profile.png')}
                            style={{ width: 22.0, height: 22.0, tintColor: color, resizeMode: 'contain' }}
                            resizeMode="contain"
                        />
                    }}
                />
            </Tab.Navigator>
            {exitInfo()}
        </>
    )

    function exitInfo() {
        return (
            backClickCount == 1
                ?
                <View style={[styles.animatedView]}>
                    <Text style={{ ...Fonts.whiteColor12Medium }}>
                        Press back once again to exit
                    </Text>
                </View>
                :
                null
        )
    }
}

export default TabNavigator;

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
})





