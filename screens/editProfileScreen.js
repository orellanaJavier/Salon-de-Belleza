import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, TextInput, ScrollView, TouchableOpacity, Text, Image } from "react-native";
import { Colors, Fonts, Sizes, } from "../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { BottomSheet } from '@rneui/themed';

const EditProfileScreen = ({ navigation }) => {

    const [state, setState] = useState({
        userName: 'Samantha John',
        email: 'shahsamantha@gmail.com',
        mobileNumber: '(+91) 1234567890',
        password: '1234567890435',
        showBottomSheet: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        userName,
        email,
        mobileNumber,
        password,
        showBottomSheet,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {profilePic()}
                    {userNameInfo()}
                    {emailInfo()}
                    {mobileNumberInfo()}
                    {passwordInfo()}
                    {updateProfileButton()}
                </ScrollView>
            </View>
            {changeProfilePicOptionsSheet()}
        </SafeAreaView>
    )

    function changeProfilePicOptionsSheet() {
        return (
            <BottomSheet
                isVisible={showBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                onBackdropPress={() => { updateState({ showBottomSheet: false }) }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateState({ showBottomSheet: false })}
                    style={{
                        backgroundColor: Colors.whiteColor,
                        paddingVertical: Sizes.fixPadding,
                    }}
                >
                    <Text style={{ ...Fonts.blackColor16Bold, textAlign: 'center' }}>
                        Choose Option
                    </Text>
                    <View style={{ marginVertical: Sizes.fixPadding, flexDirection: 'row', marginHorizontal: Sizes.fixPadding * 2.0 }}>
                        <MaterialIcons name="photo-camera" size={20} color={Colors.blackColor} />
                        <Text style={{ lineHeight: 20.0, ...Fonts.blackColor14SemiBold, marginLeft: Sizes.fixPadding }}>
                            Take picture
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginHorizontal: Sizes.fixPadding * 2.0 }}>
                        <MaterialIcons name="photo-library" size={20} color={Colors.blackColor} />
                        <Text style={{ lineHeight: 20.0, ...Fonts.blackColor14SemiBold, marginLeft: Sizes.fixPadding }}>
                            Select From Gallery
                        </Text>
                    </View>
                </TouchableOpacity>
            </BottomSheet>
        )
    }

    function updateProfileButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.pop()}
                style={styles.updateProfileButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18SemiBold }}>
                    Update Profile
                </Text>
            </TouchableOpacity>
        )
    }

    function passwordInfo() {
        return (
            <View style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginVertical: Sizes.fixPadding
            }}>
                <Text style={{ ...Fonts.grayColor13SemiBold }}>
                    Password
                </Text>
                <TextInput
                    placeholder="Enter Password"
                    value={password}
                    onChangeText={(text) => updateState({ password: text })}
                    placeholderTextColor={Colors.grayColor}
                    selectionColor={Colors.primaryColor}
                    secureTextEntry={true}
                    style={{
                        ...Fonts.blackColor14Medium,
                        borderBottomColor: Colors.grayColor,
                        borderBottomWidth: 1.5,
                        marginTop: Sizes.fixPadding - 16.0,
                    }}
                />
            </View>
        )
    }

    function mobileNumberInfo() {
        return (
            <View style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginVertical: Sizes.fixPadding
            }}>
                <Text style={{ ...Fonts.grayColor13SemiBold }}>
                    Mobile Number
                </Text>
                <TextInput
                    keyboardType="phone-pad"
                    placeholder="Enter Mobile Number"
                    value={mobileNumber}
                    onChangeText={(text) => updateState({ mobileNumber: text })}
                    placeholderTextColor={Colors.grayColor}
                    selectionColor={Colors.primaryColor}
                    style={{
                        ...Fonts.blackColor14Medium,
                        borderBottomColor: Colors.grayColor,
                        borderBottomWidth: 1.5,
                        marginTop: Sizes.fixPadding - 16.0,
                    }}
                />
            </View>
        )
    }

    function emailInfo() {
        return (
            <View style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginVertical: Sizes.fixPadding
            }}>
                <Text style={{ ...Fonts.grayColor13SemiBold }}>
                    Email
                </Text>
                <TextInput
                    keyboardType="email-address"
                    placeholder="Enter Email"
                    value={email}
                    onChangeText={(text) => updateState({ email: text })}
                    placeholderTextColor={Colors.grayColor}
                    selectionColor={Colors.primaryColor}
                    style={{
                        ...Fonts.blackColor14Medium,
                        borderBottomColor: Colors.grayColor,
                        borderBottomWidth: 1.5,
                        marginTop: Sizes.fixPadding - 16.0,
                    }}
                />
            </View>
        )
    }

    function userNameInfo() {
        return (
            <View style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginVertical: Sizes.fixPadding
            }}>
                <Text style={{ ...Fonts.grayColor13SemiBold }}>
                    User Name
                </Text>
                <TextInput
                    placeholder="Enter User Name"
                    value={userName}
                    onChangeText={(text) => updateState({ userName: text })}
                    placeholderTextColor={Colors.grayColor}
                    selectionColor={Colors.primaryColor}
                    style={{
                        ...Fonts.blackColor14Medium,
                        borderBottomColor: Colors.grayColor,
                        borderBottomWidth: 1.5,
                        marginTop: Sizes.fixPadding - 16.0,
                    }}
                />
            </View>
        )
    }

    function profilePic() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ showBottomSheet: true })}
                style={{ alignItems: 'center', alignSelf: 'center' }}
            >
                <Image
                    source={require('../assets/images/users/user3.png')}
                    style={{ width: 90.0, height: 90.0, borderRadius: 45.0 }}
                />
                <View style={styles.addIconWrapStyle}>
                    <MaterialIcons
                        name="add"
                        color={Colors.whiteColor}
                        size={14}
                    />
                </View>
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
                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor18Bold }}>
                    Edit Profile
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
    addIconWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        marginLeft: Sizes.fixPadding * 2.0,
        right: 5.0,
        backgroundColor: Colors.primaryColor,
        width: 18.0, height: 18.0,
        borderRadius: 9.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    updateProfileButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 3.0,
    },
});

export default EditProfileScreen;