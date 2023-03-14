import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import ContinentsScreen from "./screens/ContinentsScreen";
import DrawerMenu from "./components/DrawerMenu";
import { StyleSheet } from "react-native";
import StaffScreen from "./screens/StaffScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerMenu {...props} toggleDrawer={props.navigation.toggleDrawer} />}>
        <Drawer.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
            // title: "Zamara",
            // headerTitleStyle: {
            //   fontWeight: "bold",
            //   fontSize: 24,
            //   color: "#66FF66", 
            //   alignSelf: "center", 
            //   textAlignVertical: "center", 
            // },
          }}
        />
        <Drawer.Screen name="Dashboard" component={DashboardStackNavigator} options={{ headerShown: false }}/>
        <Drawer.Screen name="Continents" component={ContinentsStackNavigator} options={{ headerShown: false }}/>
        <Drawer.Screen name="Staff" component={StaffStackNavigator} options={{ headerShown: false }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const DashboardStackNavigator = ({route,navigation}) => {
  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ headerShown: false }}
        initialParams={{...route.params}}
      />
    </Stack.Navigator>
  );
};

const ContinentsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Continents"
        component={ContinentsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const StaffStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Staff"
        component={StaffScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
