import React, { useState } from "react";
import { SafeAreaView, View, Dimensions, FlatList, TouchableOpacity, TextInput, ScrollView, ImageBackground, StatusBar, StyleSheet, Image, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../constants/styles";
import { MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import CollapsingToolbar from "../components/sliverAppBar";
import MapView from 'react-native-maps';
import { Snackbar } from 'react-native-paper';
import { source } from "deprecated-react-native-prop-types/DeprecatedImagePropType";

const { width } = Dimensions.get('window');

const packageAndOffersList = [
    {
        id: '1',
        salonImage: require('../assets/images/offer/offer2.png'),
        packageName: 'Haircut and Hairstyle',
        packageAvailable: 'Nov 26,2021',
        packageAmount: 160.50,
        offer: 25
    },
    {
        id: '2',
        salonImage: require('../assets/images/offer/offer3.png'),
        packageName: 'Bridal Beauty Makeup',
        packageAvailable: 'Nov 26,2021',
        packageAmount: 850.50,
        offer: 25
    }
];

const aboutList = [
    'Con esfuerzo y amor Gemelas Salon nace para cumplir satisfactoriamente las espectativas de belleza',
    'a nuestros clientes utilizando productos de calidad e implementando tecnicas de vanguardia en cada uno de los procesos',
];

const specialists = [
    {
        id: '1',
        specialistImage: require('../assets/images/specialists/specialist1.png'),
        specialistName: 'Caudia Margoth',
        speciality: 'Dueña',
    },
    {
        id: '2',
        specialistImage: require('../assets/images/specialists/specialist2.png'),
        specialistName: 'Claudia Vanessa',
        speciality: 'Nails Bar',
    },
    {
        id: '3',
        specialistImage: require('../assets/images/salon/salon4.png'),
        specialistName: 'Rosario Elizabeth',
        speciality: 'Cabina Area',
    },
    
    
   
];



const galleryImagesList = [
    {
        id: '1',
        image: require('../assets/images/gallery/img1.png'),
        aspectRatio: 1
    },
    {
        id: '2',
        image: require('../assets/images/gallery/img2.png'),
        aspectRatio: 200 / 145,
    },
    {
        id: '3',
        image: require('../assets/images/gallery/img3.png'),
        aspectRatio: 180 / 145,
    },
    {
        id: '4',
        image: require('../assets/images/gallery/img4.png'),
        aspectRatio: 180 / 145,
    },
    {
        id: '5',
        image: require('../assets/images/gallery/img5.png'),
        aspectRatio: 1,
    },
    {
        id: '6',
        image: require('../assets/images/gallery/img6.png'),
        aspectRatio: 120 / 145,
    },
    {
        id: '7',
        image: require('../assets/images/gallery/img7.png'),
        aspectRatio: 210 / 145,
    },
    {
        id: '8',
        image: require('../assets/images/gallery/img8.png'),
        aspectRatio: 160 / 145,
    },
    {
        id: '9',
        image: require('../assets/images/gallery/img9.png'),
        aspectRatio: 130 / 145,
    }
];

const reviewsList = [
    {
        id: '1',
        userImage: require('../assets/images/users/user1.png'),
        userName: 'Mitali John',
        rating: 4.0,
        reviewTime: '2 min ago',
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        id: '2',
        userImage: require('../assets/images/users/user2.png'),
        userName: 'Raj Mehta',
        rating: 3.0,
        reviewTime: '2 days ago',
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
];

const SalonDetailScreen = ({ navigation, route }) => {

    const item = route.params.item;

    const [state, setState] = useState({
        currentSelectedIndex: 1,
        readMore: false,
        review: null,
        isFavorite: false,
        showSnackBar: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        currentSelectedIndex,
        readMore,
        review,
        isFavorite,
        showSnackBar,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                <CollapsingToolbar
                    leftItem={
                        <MaterialIcons
                            name="arrow-back-ios"
                            color={Colors.whiteColor}
                            size={24}
                            onPress={() => navigation.pop()}
                        />
                    }
                    rightItem={
                        <MaterialIcons
                            name={isFavorite ? "favorite" : "favorite-border"}
                            color={Colors.whiteColor}
                            size={24}
                            onPress={() => updateState({ isFavorite: !isFavorite, showSnackBar: true, })}
                        />
                    }
                    element={salonInfo()}
                    imageBlurOpacity='rgba(0,0,0,0.2)'
                    isImageBlur={true}
                    toolbarMinHeight={80}
                    toolbarMaxHeight={230}
                    src={item.salonImage}
                >
                    <View style={{ marginBottom: Sizes.fixPadding * 8.0, }}>
                        {options()}
                        {divider()}
                        {salonSpecialists()}
                        {tabBarOptions()}
                        {
                            currentSelectedIndex == 1
                                ?
                                salonAboutInfo()
                                :
                                currentSelectedIndex == 2
                                    ?
                                    salonServicesInfo()
                                    :
                                    currentSelectedIndex == 3
                                        ?
                                        galleryInfo()
                                        :
                                        reviewInfo()
                        }
                    </View>
                </CollapsingToolbar>
                {bookAppintmentButton()}
                <Snackbar
                    style={styles.snackBarStyle}
                    visible={showSnackBar}
                    elevation={0}
                    onDismiss={() => updateState({ showSnackBar: false })}
                >
                    {isFavorite ? 'Item added to favorite' : 'Item remove from favorite'}
                </Snackbar>
            </View >
        </SafeAreaView >
    )

    function reviewInfo() {
        return (
            <View>
                {userReviewInfo()}
                {divider()}
                {allReviewsInfo()}
            </View>
        )
    }

    function allReviewsInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Bold }}>
                    All Review(110)
                </Text>
                {
                    reviewsList.map((item) => (
                        <View key={`${item.id}`}>
                            <View style={{ marginBottom: Sizes.fixPadding }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        source={item.userImage}
                                        style={{ width: 40.0, height: 40.0, borderRadius: 20.0, }}
                                    />
                                    <View style={{ marginLeft: Sizes.fixPadding, }}>
                                        <Text style={{ ...Fonts.blackColor14Bold }}>
                                            {item.userName}
                                        </Text>
                                        <View style={{ marginTop: Sizes.fixPadding - 13.0, flexDirection: 'row' }}>
                                            {showRating({ rate: item.rating })}
                                            <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.grayColor12SemiBold }}>
                                                {item.reviewTime}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <Text style={{ ...Fonts.grayColor13SemiBold }}>
                                    {item.review}
                                </Text>
                            </View>
                        </View>
                    ))
                }
            </View>
        )
    }

    function userReviewInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>
                        Write Your review
                    </Text>
                    {showRating({ rate: 4 })}
                </View>
                <View style={{ marginTop: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../assets/images/users/user3.png')}
                        style={{ width: 40.0, height: 40.0, borderRadius: 20.0, }}
                    />
                    <TextInput
                        value={review}
                        onChangeText={(text) => updateState({ review: text })}
                        selectionColor={Colors.primaryColor}
                        placeholder="Write review here"
                        placeholderTextColor={Colors.grayColor}
                        style={styles.reviewTextFieldWrapStyle}
                    />
                </View>
                <View style={styles.postButtonStyle}>
                    <Text style={{ ...Fonts.whiteColor11Bold }}>
                        Post
                    </Text>
                </View>
            </View>
        )
    }

    function galleryInfo() {
        return (
            <ScrollView contentContainerStyle={styles.galleryInfoWrapStyle}>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        {galleryImagesList
                            .filter((_, i) => i % 2 !== 0)
                            .map((item,) =>
                            (
                                <Image
                                    key={`${item.id}`}
                                    source={item.image}
                                    style={{
                                        marginRight: Sizes.fixPadding + 5.0,
                                        ...styles.galleryImagesStyle,
                                        width: (width - 60) / 2.0,
                                        height: ((width - 40) / 2.0) * item.aspectRatio
                                    }}
                                    resizeMode="cover"
                                />
                            ))}
                    </View>
                    <View>
                        {galleryImagesList
                            .filter((_, i) => i % 2 === 0)
                            .map((item,) =>
                            (
                                <Image
                                    key={`${item.id}`}
                                    source={item.image}
                                    style={{
                                        ...styles.galleryImagesStyle,
                                        width: (width - 40) / 2.0,
                                        height: ((width - 40) / 2.0) * item.aspectRatio
                                    }}
                                    resizeMode="cover"
                                />
                            ))}
                    </View>
                </View>
            </ScrollView >
        )
    }

    function salonServicesInfo() {
        return (
            <View style={{left:20,flex:1,}}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Bold }}>
                    Servicios
                </Text>
                <Image 
                 source={require('../assets/images/icons/hairstyle.png')}
                 style={{ width: 50, height: 50,top:40,left:10,backgroundColor:'aqua',borderRadius:30}}
                 resizeMode="contain"
                />
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Bold,top:10,left:65 }}>
                    Hair style</Text>   
                <Text
                     onPress={() => navigation.push('ServiceDetail')}
                     style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.primaryColor14Bold,top:-20,left:240 }}>
                        Ver Mas
                 </Text>
                
            </View>
        )
    }

    function salonAboutInfo() {
        return (
            <View>
                {aboutInfo()}
                {divider()}
                {openingHoursInfo()}
                {divider()}
                {locationInfo()}
                {divider()}
                {currentPackageAndOffersInfo()}
            </View>
        )
    }

    function bookAppintmentButton() {
        return (
            <View style={styles.bookAppintmentButtonWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('ScheduleAppointment')}
                    style={styles.bookAppointmentButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor18SemiBold }}>
                        Book Appointment
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function currentPackageAndOffersInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Bold }}>
                    Current Package & Offers
                </Text>
                {
                    packageAndOffersList.map((item) => (
                        <View key={`${item.id}`}>
                            <ImageBackground
                                source={item.salonImage}
                                style={styles.packageAndOffersImageStyle}
                                borderRadius={Sizes.fixPadding}
                            >
                                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                                    <Text
                                        numberOfLines={1}
                                        style={{ marginRight: Sizes.fixPadding, ...Fonts.blackColor18Bold }}
                                    >
                                        {item.packageName}
                                    </Text>
                                    <View style={{ marginTop: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={styles.offerPercentageWrapStyle}>
                                            <Text style={{ ...Fonts.whiteColor14Medium }}>
                                                {item.offer}% off
                                            </Text>
                                        </View>
                                        <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.primaryColor12Bold }}>
                                            {`$`}{item.packageAmount.toFixed(2)}
                                        </Text>
                                    </View>
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            lineHeight: 22.0,
                                            ...Fonts.blackColor12Medium
                                        }}
                                    >
                                        Complete package offer till {item.packageAvailable}
                                    </Text>
                                    <Text style={{ ...Fonts.primaryColor14Bold }}>
                                        Book Now
                                    </Text>
                                </View>
                            </ImageBackground>
                        </View>
                    ))
                }
            </View>
        )
    }

    function locationInfo() {
        return (
            <View style={{
                marginVertical: Sizes.fixPadding - 5.0,
                marginHorizontal: Sizes.fixPadding * 2.0,
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <View>
                        <Text style={{
                            marginBottom: Sizes.fixPadding,
                            lineHeight: 18.0, ...Fonts.blackColor16Bold
                        }}>
                            Location
                        </Text>
                        <Text style={{ maxWidth: width - 160.0, ...Fonts.grayColor12SemiBold }}>
                            {item.salonAddress}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome
                                name="location-arrow"
                                size={15}
                                color={Colors.primaryColor}
                            />
                            <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.primaryColor12Bold }}>
                                Get directions - 5.2km
                            </Text>
                        </View>
                    </View>
                    <View style={styles.mapViewWrapStyle}>
                        <MapView
                            style={{
                                width: 110.0,
                                height: 90.0,
                            }}
                            initialRegion={{
                                latitude: 13.794185,
                                longitude: -88.89653,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }

    function openingHoursInfo() {
        return (
            <View style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginBottom: Sizes.fixPadding - 5.0,
            }}>
                <Text style={{ ...Fonts.blackColor16Bold }}>
                    Horario de Atencion
                </Text>
                <View style={styles.openingHoursWrapStyle}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ ...Fonts.grayColor13Bold }}>
                            Lunes-Sabado
                        </Text>
                        <Text style={{ lineHeight: 17.0, ...Fonts.primaryColor14Bold }}>
                            9:00 am - 5:00 pm
                        </Text>
                        <Text style={{ ...Fonts.blackColor16Bold ,top:15}}>
                          Domingos: Eventos especiales
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ ...Fonts.grayColor13Bold }}>
                            Monday-Friday
                        </Text>
                        <Text style={{ lineHeight: 17.0, ...Fonts.primaryColor14Bold }}>
                            8:00 am - 9:00 pm
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function aboutInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor16Bold }}>
                    About
                </Text>
                <View>
                    {
                        aboutList.map((item, index) => (
                            <View key={`${index}`} >
                                {readMore ?
                                    <View style={{}}>
                                        <Text style={{ ...Fonts.grayColor13Bold }}>
                                            {`        `}{item}
                                        </Text>
                                        {index == aboutList.length - 1 ?
                                            <Text
                                                onPress={() => updateState({ readMore: false })}
                                                style={{ marginTop: Sizes.fixPadding - 17.0, alignSelf: 'flex-end', ...Fonts.primaryColor14Bold }}
                                            >
                                                Show Less
                                            </Text>
                                            : null
                                        }
                                    </View>
                                    :
                                    index < 2
                                        ?
                                        <View style={{}}>
                                            <Text style={{ ...Fonts.grayColor13Bold }}>
                                                {`        `}{item}
                                            </Text>
                                            {index == 1 ?
                                                <Text
                                                    onPress={() => updateState({ readMore: true })}
                                                    style={{ marginTop: Sizes.fixPadding - 17.0, alignSelf: 'flex-end', ...Fonts.primaryColor14Bold }}
                                                >
                                                    ReadMore
                                                </Text>
                                                : null}
                                        </View>
                                        :
                                        null
                                }
                            </View>
                        ))
                    }
                </View>
            </View >
        )
    }

    function tabBarOptions() {
        return (
            <View style={styles.tabBarWrapStyle}>
                <Text
                    onPress={() => updateState({ currentSelectedIndex: 1 })}
                    style={currentSelectedIndex == 1 ? { ...Fonts.primaryColor15Bold } : { ...Fonts.grayColor15Bold }}
                >
                    Filosofia
                </Text>
                <Text
                    onPress={() => updateState({ currentSelectedIndex: 2 })}
                    style={currentSelectedIndex == 2 ? { ...Fonts.primaryColor15Bold } : { ...Fonts.grayColor15Bold }}
                >
                    Servicios
                </Text>
                <Text
                    onPress={() => updateState({ currentSelectedIndex: 3 })}
                    style={currentSelectedIndex == 3 ? { ...Fonts.primaryColor15Bold } : { ...Fonts.grayColor15Bold }}
                >
                    Galleria
                </Text>
                <Text
                    onPress={() => updateState({ currentSelectedIndex: 4 })}
                    style={currentSelectedIndex == 4 ? { ...Fonts.primaryColor15Bold } : { ...Fonts.grayColor15Bold }}
                >
                    Review
                </Text>
            </View>
        )
    }

    function salonSpecialists() {

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('SpecialistDetail', { item: item, salonInfo: route.params.item })}
                style={{
                    alignItems: 'center',
                    marginRight: Sizes.fixPadding + 5.0,
                }}
            >
                <Image
                    source={item.specialistImage}
                    style={{ width: 45.0, height: 45.0, borderRadius: Sizes.fixPadding - 5.0, }}
                />
                <Text style={{ ...Fonts.blackColor12Bold }}>
                    {item.specialistName}
                </Text>
                <Text style={{ lineHeight: 11.0, ...Fonts.grayColor11SemiBold }}>
                    {item.speciality}
                </Text>
            </TouchableOpacity>
        )
        return (
            <View>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16Bold }}>
                    Our Salon Specialists
                </Text>
                <FlatList
                    data={specialists}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingLeft: Sizes.fixPadding * 2.0,
                        paddingTop: Sizes.fixPadding,
                    }}
                />
            </View>
        )
    }

    function divider() {
        return (
            <View style={{
                backgroundColor: Colors.grayColor,
                height: 2.0,
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginVertical: Sizes.fixPadding,
            }} />
        )
    }

    function options() {
        return (
            <View style={styles.tabBarOptionsWrapStyle}>
                {optionsShort({ optionImage: require('../assets/images/icons/website.png'), option: 'Website' })}
                {optionsShort({ optionImage: require('../assets/images/icons/call.png'), option: 'Call' })}
                {optionsShort({ optionImage: require('../assets/images/icons/map_view.png'), option: 'Direction' })}
                {optionsShort({ optionImage: require('../assets/images/icons/share.png'), option: 'Share' })}
            </View>
        )
    }

    function optionsShort({ optionImage, option }) {
        return (
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={optionImage}
                    style={{ width: 17.0, height: 17.0, }}
                    resizeMode="contain"
                    tintColor={Colors.primaryColor}
                />
                <Text style={{ ...Fonts.primaryColor13Bold }}>
                    {option}
                </Text>
            </View>
        )
    }

    function salonInfo() {
        return (
            <View style={styles.salonInfoWrapStyle}>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                            numberOfLines={1}
                            style={{ maxWidth: width - 150.0, ...Fonts.whiteColor16Bold }}
                        >
                            {item.salonName}
                        </Text>
                        <Text style={{ marginLeft: Sizes.fixPadding - 6.0, ...Fonts.primaryColor10Bold }}>
                            WOMEN ONLY
                        </Text>
                    </View>
                    <Text
                        numberOfLines={1}
                        style={{
                            width: width - 120.0,
                            lineHeight: 17.0,
                            ...Fonts.whiteColor13Medium
                        }}
                    >
                        {item.salonAddress}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {showRating({ rate: item.rating })}
                        <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.whiteColor12Medium }}>
                            ({item.reviews} Reviews)
                        </Text>
                    </View>
                </View>
                <View style={styles.openButtonWrapStyle}>
                    <Text style={{ ...Fonts.whiteColor11Bold }}>
                        Open
                    </Text>
                </View>
            </View>
        )
    }

    function showRating({ rate }) {
        const rating = Math.ceil(rate);
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {
                    rating == 1 || rating == 2 || rating == 3 || rating == 4 || rating == 5
                        ?
                        <AntDesign
                            name="star"
                            color={Colors.yellowColor}
                            size={14}
                            style={{ marginHorizontal: Sizes.fixPadding - 8.0, }}
                        />
                        :
                        <AntDesign
                            name="star"
                            color={Colors.lightGrayColor}
                            size={14}
                            style={{ marginHorizontal: Sizes.fixPadding - 8.0, }}
                        />
                }
                {
                    rating == 2 || rating == 3 || rating == 4 || rating == 5
                        ?
                        <AntDesign
                            name="star"
                            color={Colors.yellowColor}
                            size={14}
                            style={{ marginHorizontal: Sizes.fixPadding - 8.0, }}
                        />
                        :
                        <AntDesign
                            name="star"
                            color={Colors.lightGrayColor}
                            size={14}
                            style={{ marginHorizontal: Sizes.fixPadding - 8.0, }}
                        />
                }
                {
                    rating == 3 || rating == 4 || rating == 5
                        ?
                        <AntDesign
                            name="star"
                            color={Colors.yellowColor}
                            size={14}
                            style={{ marginHorizontal: Sizes.fixPadding - 8.0, }}
                        />
                        :
                        <AntDesign
                            name="star"
                            color={Colors.lightGrayColor}
                            size={14}
                            style={{ marginHorizontal: Sizes.fixPadding - 8.0, }}
                        />
                }
                {
                    rating == 4 || rating == 5
                        ?
                        <AntDesign
                            name="star"
                            color={Colors.yellowColor}
                            size={14}
                            style={{ marginHorizontal: Sizes.fixPadding - 8.0, }}
                        />
                        :
                        <AntDesign
                            name="star"
                            color={Colors.lightGrayColor}
                            size={14}
                            style={{ marginHorizontal: Sizes.fixPadding - 8.0, }}
                        />
                }
                {
                    rating == 5
                        ?
                        <AntDesign
                            name="star"
                            color={Colors.yellowColor}
                            size={14}
                            style={{ marginHorizontal: Sizes.fixPadding - 8.0, }}
                        />
                        :
                        <AntDesign
                            name="star"
                            color={Colors.lightGrayColor}
                            size={14}
                            style={{ marginHorizontal: Sizes.fixPadding - 8.0, }}
                        />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    salonInfoWrapStyle: {
        marginBottom: Sizes.fixPadding - 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 1,
    },
    openButtonWrapStyle: {
        borderColor: Colors.whiteColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 2.0,
        alignSelf: 'flex-end',
        paddingHorizontal: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding - 9.0,
    },
    offerPercentageWrapStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: Sizes.fixPadding,
    },
    packageAndOffersImageStyle: {
        width: width - 40,
        height: 135.0,
        borderColor: 'rgba(197, 197, 197, 0.3)',
        borderWidth: 2.0,
        borderRadius: Sizes.fixPadding,
        justifyContent: 'space-between',
        paddingLeft: Sizes.fixPadding,
        paddingTop: Sizes.fixPadding - 5.0,
        paddingBottom: Sizes.fixPadding - 4.0,
        marginRight: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        overflow: 'hidden'
    },
    mapViewWrapStyle: {
        width: 110.0,
        height: 90.0,
        backgroundColor: Colors.grayColor,
        borderRadius: Sizes.fixPadding,
        overflow: 'hidden'
    },
    bookAppointmentButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    tabBarWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        borderColor: '#fafafa',
        borderWidth: 1.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding - 5.0,
        paddingBottom: Sizes.fixPadding - 3.0,
        marginTop: Sizes.fixPadding + 10.0,
        marginBottom: Sizes.fixPadding + 5.0,
    },
    tabBarOptionsWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 2.0,
    },
    openingHoursWrapStyle: {
        marginTop: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bookAppintmentButtonWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        backgroundColor: Colors.whiteColor
    },
    galleryImagesStyle: {
        marginBottom: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
    },
    galleryInfoWrapStyle: {
        marginLeft: Sizes.fixPadding * 2.0,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    postButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 2,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        paddingHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding - 5.0,
    },
    salonServicesWrapStyle: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        borderColor: '#f1f1f1',
        borderWidth: 0.40,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    salonServiceImageWrapStyle: {
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        height: 47.0,
        width: 47.0,
    },
    reviewTextFieldWrapStyle: {
        ...Fonts.blackColor14Bold,
        backgroundColor: '#F0F0F0',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 7.0,
        marginLeft: Sizes.fixPadding + 5.0,
        flex: 1,
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: 63.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
        elevation: 0.0,
    }
});

export default SalonDetailScreen;