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
    <Tab.Navigator tabBarOptions={{
      activeTintColor: '#fff',
      inactiveTintColor: 'lightgray',
      activeBackgroundColor: '#E20576',
      inactiveBackgroundColor: '#b0045c',
      style: {
        backgroundColor: '#CE4418',
        paddingBottom: 3
      }
    }}>
      <Tab.Screen name="Etkinlikler" options={{ headerShown: false }} component={EventStack} />
      <Tab.Screen name="Topluluklar" options={{ headerShown: false }} component={CommunityStack} />
      <Tab.Screen name="Profil" component={Profile} />
    </Tab.Navigator>
  )

}


const App = () => {
  return (



    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name="HomePage" options={{ headerShown: false }} component={HomePage} />
        <Stack.Screen name="Sign In" options={{ headerShown: false }} component={SignIn} />
        <Stack.Screen name="Sign Up" options={{ headerShown: false }} component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;