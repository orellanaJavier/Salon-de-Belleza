import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';
import BottomTabBarScreen from "./components/bottomTabBarScreen";
import LoadingScreen from "./components/loadingScreen";
import FilterScreen from "./screens/filterScreen";
import CategoryDetailScreen from "./screens/categoryDetailScreen";
import SalonDetailScreen from "./screens/salonDetailScreen";
import ScheduleAppointmentScreen from "./screens/scheduleAppointmentScreen";
import AppointmentDetailsScreen from "./screens/appointmentDetailsScreen";
import PaymentmethodScreen from "./screens/paymentmethodScreen";
import AddNewCardScreen from "./screens/addNewCardScreen";
import SpecialistDetailScreen from "./screens/specialistDetailScreen";
import EditProfileScreen from "./screens/editProfileScreen";
import FavoritesScreen from "./screens/favoritesScreen";
import NotificationsScreen from "./screens/notificationsScreen";
import VouchersScreen from "./screens/vouchersScreen";
import InviteFriendsScreen from "./screens/inviteFriendsScreen";
import SettingScreen from "./screens/setting/settingScreen";
import PrivacyPolicyScreen from "./screens/privacyPolicyScreen";
import OnboardingScreen from "./screens/onboardingScreen";
import SigninScreen from "./screens/auth/signinScreen";
import SignupScreen from "./screens/auth/signupScreen";
import SplashScreen from "./screens/splashScreen";
import ServiceDetailScreen from "./screens/serviceDetailScreen";
import ProfileScreen from './screens/profileScreen';
import NearByScreen from './screens/nearByScreen';
import HomeScreen from './screens/home/homeScreen';
import NailsDetailsScreen from './screens/NailsDetailsScreen';


LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="BottomTabBar" component={BottomTabBarScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="FilterScreen" component={FilterScreen} />
        <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
        <Stack.Screen name="SalonDetail" component={SalonDetailScreen} />
        <Stack.Screen name="ScheduleAppointment" component={ScheduleAppointmentScreen} />
        <Stack.Screen name="AppointmentDetail" component={AppointmentDetailsScreen} />
        <Stack.Screen name="PaymentMethod" component={PaymentmethodScreen} />
        <Stack.Screen name="AddNewCard" component={AddNewCardScreen} />
        <Stack.Screen name="SpecialistDetail" component={SpecialistDetailScreen} />
        <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Vouchers" component={VouchersScreen} />
        <Stack.Screen name="InviteFriends" component={InviteFriendsScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="NearByScreen" component={NearByScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="NailsDetailsScreen" component={NailsDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
