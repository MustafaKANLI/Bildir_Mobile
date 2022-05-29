import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import First from "./pages/First";
import Communities from "./pages/Communities";
import Profile from "./pages/Profile";
import EventDetail from "./pages/EventDetail";
import CommunityDetail from "./pages/CommunityDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreateEvent from "./pages/CreateEvent";
import { navigationRef } from './RootNavigation';
import ParticipatedEvents from "./pages/ParticipatedEvents/ParticipatedEvents";
import FollowedCommunities from "./pages/FollowedCommunities/FollowedCommunities";
import OrganizedEvents from "./pages/OrganizedEvents";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const EventStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Etkinlikler " component={First} />
      <Stack.Screen name="Etkinlik" component={EventDetail} />
      <Stack.Screen name="Etkinlik Oluştur" component={CreateEvent} />
    </Stack.Navigator>
  )
}

const CommunityStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Topluluklar" component={Communities} />
      <Stack.Screen name="Topluluk Sayfası" component={CommunityDetail} />
    </Stack.Navigator>
  )
}



const HomePage = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: '#fff',
      tabBarInactiveTintColor: 'lightgray',
      tabBarActiveBackgroundColor: '#E20576',
      tabBarInactiveBackgroundColor: '#b0045c',
      tabBarStyle: {
        backgroundColor: '#CE4418',
        paddingBottom: 3
      }
    }}>
      <Tab.Screen name="EtkinliklerTab" options={{ headerShown: false, title: "Etkinlikler" }} component={EventStack} />
      <Tab.Screen name="TopluluklarTab" options={{ headerShown: false, title: "Topluluklar" }} component={CommunityStack} />
      <Tab.Screen name="Profil" component={Profile} />
    </Tab.Navigator>
  )

}


const App = () => {
  return (
    <NavigationContainer ref={navigationRef} >
      <Stack.Navigator>
        <Stack.Screen name="HomePage" options={{ headerShown: false }} component={HomePage} />
        <Stack.Screen name="Sign In" options={{ headerShown: false }} component={SignIn} />
        <Stack.Screen name="Sign Up" options={{ headerShown: false }} component={SignUp} />
        <Stack.Screen name="Katıldığım Etkinlikler" component={ParticipatedEvents} />
        <Stack.Screen name="Takip Ettiğim Topluluklar" component={FollowedCommunities} />
        <Stack.Screen name="Topluluk Sayfası" component={CommunityDetail} />
        <Stack.Screen name="Etkinlik" component={EventDetail} />
        <Stack.Screen name="Etkinlikler" component={First} />
        <Stack.Screen name="Organized Events" component={OrganizedEvents} />



      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;