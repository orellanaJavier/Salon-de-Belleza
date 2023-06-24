import React, { useState, } from "react";
import { SafeAreaView, View, Dimensions, ScrollView, StatusBar, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { Colors, Fonts, Sizes, } from "../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";

const { width } = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => {

    const [state, setState] = useState({
        showLogoutDialog: false,
        backClickCount: 0
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        showLogoutDialog,
        backClickCount
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {profileInfo()}
                    {divider()}
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => navigation.push('Favorites')}
                    >
                        {profileOptions(
                            {
                                icon: require('../assets/images/icons/favorite.png'),
                                option: 'Favorites'
                            }
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => navigation.push('Chats')}
                    >
                        {profileOptions(
                            {
                                icon: require('../assets/images/icons/chat.png'),
                                option: 'Chats'
                            }
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => navigation.push('Notifications')}
                    >
                        {profileOptions(
                            {
                                icon: require('../assets/images/icons/notification.png'),
                                option: 'Notifications'
                            }
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => navigation.push('PaymentMethod')}
                    >
                        {profileOptions(
                            {
                                icon: require('../assets/images/icons/payment.png'),
                                option: 'Payment Method'
                            }
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => navigation.push('Vouchers')}
                    >
                        {profileOptions(
                            {
                                icon: require('../assets/images/icons/vouchers.png'),
                                option: 'Vouchers'
                            }
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => navigation.push('InviteFriends')}
                    >
                        {profileOptions(
                            {
                                icon: require('../assets/images/icons/invite.png'),
                                option: 'Invite Friends'
                            }
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => navigation.push('Setting')}
                    >
                        {profileOptions(
                            {
                                icon: require('../assets/images/icons/setting.png'),
                                option: 'Setting'
                            }
                        )}
                    </TouchableOpacity>
                    {signOutInfo()}
                </ScrollView>
                {logoutDialog()}
            </View>
        </SafeAreaView>
    )

    function logoutDialog() {
        return (
            <Dialog.Container
                visible={showLogoutDialog}
                contentStyle={styles.dialogContainerStyle}
                headerStyle={{ margin: 0.0 }}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <Text style={{ ...Fonts.blackColor16Bold, }}>
                        Sure you want to logout?
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => updateState({ showLogoutDialog: false })}
                            style={{
                                ...styles.cancelAndLogoutButtonStyle,
                                marginRight: Sizes.fixPadding,
                            }}>
                            <Text style={{ ...Fonts.primaryColor18SemiBold }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => {
                                updateState({ showLogoutDialog: false })
                                navigation.push('Signin')
                            }}
                            style={{
                                ...styles.cancelAndLogoutButtonStyle,
                                marginLeft: Sizes.fixPadding,
                                backgroundColor: Colors.primaryColor,
                            }}>
                            <Text style={{ ...Fonts.whiteColor18SemiBold }}>
                                Logout
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    function signOutInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => updateState({ showLogoutDialog: true })}
                style={styles.signOutInfoWrapStyle}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../assets/images/icons/logout.png')}
                        style={{ width: 16.0, height: 16.0, }}
                        resizeMode="contain"
                        tintColor={Colors.primaryColor}
                    />
                    <Text style={{
                        marginLeft: Sizes.fixPadding + 5.0,
                        ...Fonts.primaryColor14SemiBold
                    }}>
                        Sign Out
                    </Text>
                </View>
                <MaterialIcons
                    name="arrow-forward-ios"
                    size={16}
                    color={Colors.primaryColor}
                />
            </TouchableOpacity>
        )
    }

    function profileOptions({ icon, option }) {
        return (
            <View style={styles.profileOptionsWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={icon}
                        style={{ width: 16.0, height: 16.0, }}
                        resizeMode="contain"
                    />
                    <Text style={{
                        marginLeft: Sizes.fixPadding + 5.0,
                        ...Fonts.blackColor14SemiBold
                    }}>
                        {option}
                    </Text>
                </View>
                <MaterialIcons
                    name="arrow-forward-ios"
                    size={16}
                    color={Colors.blackColor}
                />
            </View>
        )
    }

    function divider() {
        return (
            <View style={styles.dividerStyle} />
        )
    }

    function profileInfo() {
        return (
            <View style={styles.profileInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../assets/images/users/user3.png')}
                        style={{ width: 70.0, height: 70.0, borderRadius: 35.0, }}
                    />
                    <View style={{ marginLeft: Sizes.fixPadding, }}>
                        <Text style={{ ...Fonts.grayColor13SemiBold }}>
                            Hello,
                        </Text>
                        <Text style={{ maxWidth: width - 190, lineHeight: 17.0, ...Fonts.blackColor15Bold }}>
                            Samantha Shah
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.push('EditProfile')}
                >
                    <Image
                        source={require('../assets/images/icons/edit.png')}
                        style={{ width: 20.0, height: 20.0, }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View >
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    Profile
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0
    },
    profileInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileOptionsWrapStyle: {
        marginBottom: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dividerStyle: {
        backgroundColor: Colors.grayColor,
        height: 1.5,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.5
    },
    signOutInfoWrapStyle: {
        marginBottom: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        width: width - 40,
        paddingTop: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    cancelAndLogoutButtonStyle: {
        flex: 1,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding - 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
    }
});

export default ProfileScreen;