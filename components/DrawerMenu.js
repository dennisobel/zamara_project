import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DrawerMenu = ({ navigation }) => {
  const handleSignOut = async () => {
    // Remove token from AsyncStorage
    try {
      await AsyncStorage.removeItem("token");
      // Redirect to login page
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <View style={styles.container}>
      <DrawerContentScrollView>
        <DrawerItem
          label="Home"
          onPress={() => navigation.navigate("Dashboard")}
          style={styles.drawerItem}
          labelStyle={styles.drawerLabel}
          icon={() => (
            <Ionicons name="home-outline" style={styles.drawerIcon} />
          )}
        />
        <DrawerItem
          label="Staff"
          onPress={() => navigation.navigate("Staff")}
          style={styles.drawerItem}
          labelStyle={styles.drawerLabel}
          icon={() => (
            <Ionicons name="people-outline" style={styles.drawerIcon} />
          )}
        />
        <DrawerItem
          label="Continents"
          onPress={() => navigation.navigate("Continents")}
          style={styles.drawerItem}
          labelStyle={styles.drawerLabel}
          icon={() => (
            <Ionicons name="earth-outline" style={styles.drawerIcon} />
          )}
        />
        <DrawerItem
          label="Sign Out"
          onPress={handleSignOut}
          style={styles.drawerItem}
          labelStyle={styles.drawerLabel}
          icon={() => (
            <Ionicons name="exit-outline" style={styles.drawerIcon} />
          )}
        />
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  drawerItem: {
    marginBottom: 15,
  },
  drawerLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: -16,
  },
  drawerIcon: {
    fontSize: 22,
    marginRight: 5,
    marginLeft: -5,
    color: "#999",
  },
});

export default DrawerMenu;
