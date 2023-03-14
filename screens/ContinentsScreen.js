import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DrawerMenu from "../components/DrawerMenu";

const ContinentsScreen = ({ navigation }) => {
  const [continents, setContinents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSideNav, setShowSideNav] = useState(false);

  const toggleDrawer = () => {
    setShowSideNav(!showSideNav);
  };

  useEffect(() => {
    fetch(
      "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL",
      {
        method: "POST",
        headers: {
          "Content-Type": "text/xml;charset=UTF-8",
          SOAPAction:
            "http://www.oorsprong.org/websamples.countryinfo/CountryInfoService.wso/ListOfContinentsByName",
        },
        body: `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                  <soap:Body>
                    <ListOfContinentsByName xmlns="http://www.oorsprong.org/websamples.countryinfo">
                    </ListOfContinentsByName>
                  </soap:Body>
              </soap:Envelope>`,
        mode: "no-cors",
      }
    )
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "text/xml");
        const continentList = xml.getElementsByTagName("tContinent");
        const result = [];
        for (let i = 0; i < continentList.length; i++) {
          const code =
            continentList[i].getElementsByTagName("sCode")[0].textContent;
          const name =
            continentList[i].getElementsByTagName("sName")[0].textContent;
          result.push({ code, name });
        }
        setContinents(result);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      {showSideNav && (
        <View style={styles.drawerContainer}>
          <DrawerMenu navigation={navigation} />
        </View>
      )}
      <View
        style={[
          styles.contentContainer,
          !showSideNav ? styles.fullWidth : null,
        ]}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={toggleDrawer}>
            <Ionicons name="menu" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.welcomeText}>Continents</Text>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="#008080" />
        ) : (
          <FlatList
            data={continents}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.code}>{item.code}</Text>
                <Text style={styles.name}>{item.name}</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    flex: 1,
    alignSelf: "stretch",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
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
    color: "#FFFFFF",
  },
  continentItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  continentName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  continentCode: {
    fontSize: 16,
    color: "#666666",
  },
  fullWidth: {
    width: "100%",
  },
  drawerContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "80%",
  },
});

export default ContinentsScreen;
