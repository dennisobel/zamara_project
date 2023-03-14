import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DrawerMenu from "../components/DrawerMenu";
import { useNavigation } from "@react-navigation/native";

const DashboardScreen = ({ route }) => {
  const {
    name,
    age,
    gender,
    email,
    phone,
    birthDate,
    bloodGroup,
    height,
    weight,
    eyeColor,
    avatar,
  } = route.params;

  const navigation = useNavigation();
  const [showSideNav, setShowSideNav] = useState(false);

  const toggleDrawer = () => {
    setShowSideNav(!showSideNav);
  };

  return (
    <View style={styles.container}>
      {showSideNav && (
        <View style={styles.drawerContainer}>
          <DrawerMenu navigation={navigation} />
        </View>
      )}
      <View style={[styles.contentContainer, !showSideNav ? styles.fullWidth : null]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={toggleDrawer}>
            <Ionicons name="menu" size={30} color="white" />
          </TouchableOpacity>
          {avatar && <Image style={styles.avatar} source={{ uri: avatar }} />}
          <Text style={styles.welcomeText}>Welcome {name},</Text>
        </View>

        <Text style={styles.profileText}>
          Your profile details are as below:
        </Text>

        <View style={styles.profileDetails}>
          <Text style={styles.detailText}>Age: {age}</Text>
          <Text style={styles.detailText}>Gender: {gender}</Text>
          <Text style={styles.detailText}>Email: {email}</Text>
          <Text style={styles.detailText}>Phone: {phone}</Text>
          <Text style={styles.detailText}>Birth Date: {birthDate}</Text>
          <Text style={styles.detailText}>Blood Group: {bloodGroup}</Text>
          <Text style={styles.detailText}>Height: {height}</Text>
          <Text style={styles.detailText}>Weight: {weight}</Text>
          <Text style={styles.detailText}>Eye Color: {eyeColor}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
  },
  contentContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: "20%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  fullWidth: {
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "#008080",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  menuButton: {
    marginRight: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
  },
  profileText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  profileDetails: {
    alignSelf: "stretch",
    paddingHorizontal: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
  },
  drawerContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "80%",
  },
});

export default DashboardScreen;
