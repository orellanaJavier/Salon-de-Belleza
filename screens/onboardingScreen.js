import React, { useState, useRef, useCallback } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, Dimensions, StyleSheet, Text, Image } from "react-native";
import { Colors, Fonts, Sizes, } from "../constants/styles";
import Carousel, { Pagination } from 'react-native-snap-carousel-v4';
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

const onboardingScreenList = [
    {
        id: '1',
        onboardingImage: require('../assets/images/image1.png'),
        title: 'Find and Book Services',
        description: `Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit, sed do\neiusmod tempor incididunt ut labore\net dolore magna aliqua.`,
    },
    {
        id: '2',
        onboardingImage: require('../assets/images/image2.png'),
        title: 'Style that fit our Lifestyle',
        description: `Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit, sed do\neiusmod tempor incididunt ut labore\net dolore magna aliqua.`,
    },
    {
        id: '3',
        onboardingImage: require('../assets/images/image3.png'),
        title: 'The Professional Specialists',
        description: `Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit, sed do\neiusmod tempor incididunt ut labore\net dolore magna aliqua.`,
    },
];

const OnboardingScreen = ({ navigation }) => {

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
    const [onboardingScreens, setOnboardingScreen] = useState(onboardingScreenList);
    const [activeSlide, setActiveSlide] = useState(0);

    const flatListRef = useRef();

    const renderItem = ({ item, }) => {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ flex: 0.85, }}>
                    <Image
                        source={item.onboardingImage}
                        style={{
                            resizeMode: 'contain',
                            flex: 1.0,
                            width: width + 250,
                            left: width / 10.0,
                            bottom: -height / 2.4,
                        }}
                    />
                </View>
                <View style={styles.titleAndDescriptionWrapStyle}>
                    <Text style={{ textAlign: 'center', ...Fonts.primaryColor15Bold }}>
                        {item.title}
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding, textAlign: 'center', ...Fonts.blackColor13Medium }}>
                        {item.description}
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <Carousel
                ref={flatListRef}
                data={onboardingScreens}
                sliderWidth={width}
                itemWidth={width}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                onSnapToItem={(index) => setActiveSlide(index)}
                autoplay={true}
                loop={true}
                autoplayInterval={3500}
                slideStyle={{ width: width }}
            />
            {pagination()}
            {skipNextAndDone()}
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor11Medium }}>
                            Press Back Once Again to Exit
                        </Text>
                    </View>
                    :
                    null
            }
        </SafeAreaView>
    )

    function skipNextAndDone() {
        return (
            <View style={styles.skipAndDoneWrapStyle}>
                {activeSlide != 2
                    ?
                    <Text
                        onPress={() => { navigation.push('Signin') }}
                        style={{ ...Fonts.blackColor14Bold, }}
                    >
                        Skip
                    </Text>
                    :
                    <Text>
                    </Text>
                }
                {
                    activeSlide == 2
                        ?
                        <Text
                            onPress={() => { navigation.push('Signin') }}
                            style={{ position: 'absolute', right: 0.0, bottom: 0.0, ...Fonts.blackColor14Bold, }}
                        >
                            Done
                        </Text>
                        :
                        <Text
                            onPress={() => {
                                if (activeSlide == 0) {
                                    flatListRef.current.snapToItem(1);
                                }
                                else if (activeSlide == 1) {
                                    flatListRef.current.snapToItem(2);
                                }
                            }}
                            style={{
                                ...Fonts.blackColor14Bold,
                            }}
                        >
                            Next
                        </Text>
                }
            </View>
        )
    }

    function pagination() {
        return (
            <Pagination
                dotsLength={onboardingScreens.length}
                activeDotIndex={activeSlide}
                containerStyle={{
                    position: 'absolute',
                    bottom: height / 2.06,
                    alignSelf: 'center'
                }}
                dotStyle={styles.activeDotStyle}
                inactiveDotStyle={styles.dotStyle}
                inactiveDotScale={0.8}
            />
        );
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
    dotStyle: {
        backgroundColor: Colors.grayColor,
        borderRadius: Sizes.fixPadding + 5.0,
        height: 9.0,
        width: 9.0,
        borderRadius: 4.5,
        marginHorizontal: Sizes.fixPadding - 15.0,
    },
    activeDotStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding + 5.0,
        height: 7.0,
        width: 20.0,
        marginHorizontal: Sizes.fixPadding - 15.0,
    },
    titleAndDescriptionWrapStyle: {
        position: 'absolute',
        bottom: height / 1.4,
        left: 0.0,
        right: 0.0,
        flex: 1,
        justifyContent: 'space-between'
    },
    skipAndDoneWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: height / 1.95,
        left: 20.0,
        right: 20.0,
    }
});

export default OnboardingScreen;