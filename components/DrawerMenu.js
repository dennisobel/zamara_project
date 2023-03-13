import React from "react";
import { StyleSheet, View } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from '@expo/vector-icons';


const DrawerMenu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView>
        <DrawerItem
          label="Home"
          onPress={() => navigation.navigate("Home")}
          style={styles.drawerItem}
          labelStyle={styles.drawerLabel}
          icon={() => <Ionicons name="home-outline" style={styles.drawerIcon} />}
        />
        <DrawerItem
          label="Staff"
          onPress={() => navigation.navigate("Staff")}
          style={styles.drawerItem}
          labelStyle={styles.drawerLabel}
          icon={() => <Ionicons name="people-outline" style={styles.drawerIcon} />}
        />
        <DrawerItem
          label="Continents"
          onPress={() => navigation.navigate("Continents")}
          style={styles.drawerItem}
          labelStyle={styles.drawerLabel}
          icon={() => <Ionicons name="earth-outline" style={styles.drawerIcon} />}
        />
        <DrawerItem
          label="Sign Out"
          onPress={() => console.log("Sign Out")}
          style={styles.drawerItem}
          labelStyle={styles.drawerLabel}
          icon={() => <Ionicons name="exit-outline" style={styles.drawerIcon} />}
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
