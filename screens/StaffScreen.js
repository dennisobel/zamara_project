import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";
import axios from "axios";

import { Ionicons } from "@expo/vector-icons";
import DrawerMenu from "../components/DrawerMenu";
import { Card, Button as Btn, Text as Txt } from "react-native-paper";
import emailjs from "@emailjs/browser";

const sendEmail = (to_name,to_email,subject,message) => {
  console.log("inside send email")

  emailjs.send('dennis_obel_smtp', 'template_6hjipkr',{
    to_name,to_email,subject,message
  },'zHwlglQmC2EGqtfP5').then(response => console.log("email sent")).catch(err => console.error(err))

}

const StaffScreen = ({ navigation }) => {
  const [staffData, setStaffData] = useState([]);
  const [staffNumber, setStaffNumber] = useState("");
  const [staffName, setStaffName] = useState("");
  const [staffEmail, setStaffEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [showSideNav, setShowSideNav] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState(null);

  useEffect(() => {
    axios
      .get("https://crudcrud.com/api/e228407e233547a597b5ae22aafcb6e8/zamara")
      .then((response) => {
        setStaffData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEdit = (id) => {
    const staff = staffData.find((staff) => staff._id === id);
    if (staff) {
      setEditing(true);
      setEditingStaffId(id);
      setStaffNumber(staff.staffNumber);
      setStaffName(staff.staffName);
      setStaffEmail(staff.staffEmail);
      setDepartment(staff.department);
      setSalary(staff.salary);
    }
  };

  const handleEditSubmit = () => {
    const data = {
      staffNumber: staffNumber,
      staffName: staffName,
      staffEmail: staffEmail,
      department: department,
      salary: salary,
    };
  
    axios
      .put(
        `https://crudcrud.com/api/e228407e233547a597b5ae22aafcb6e8/zamara/${editingStaffId}`,
        data
      )
      .then((response) => {
        const updatedStaffData = staffData.map((staff) => {
          if (staff._id === editingStaffId) {
            return {
              ...staff,
              staffNumber: data.staffNumber,
              staffName: data.staffName,
              staffEmail: data.staffEmail,
              department: data.department,
              salary: data.salary,
            };
          } else {
            return staff;
          }
        });
        
        setStaffData(updatedStaffData);
        setEditing(false);
        setEditingStaffId(null);
        setStaffNumber("");
        setStaffName("");
        setStaffEmail("");
        setDepartment("");
        setSalary("");
        sendEmail(data.staffName,data.staffEmail,"Profile Notification #Edited","we are glad to inform you that your staff profile has been updated.")
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  const submitForm = () => {
    if (editing) {
      handleEditSubmit();
    } else {
      const data = {
        staffNumber: staffNumber,
        staffName: staffName,
        staffEmail: staffEmail,
        department: department,
        salary: salary,
      };

      axios
        .post(
          "https://crudcrud.com/api/e228407e233547a597b5ae22aafcb6e8/zamara",
          data
        )
        .then((response) => {
          setStaffData([...staffData, response.data]);
          setStaffNumber("");
          setStaffName("");
          setStaffEmail("");
          setDepartment("");
          setSalary("");
          sendEmail(data.staffName,data.staffEmail,"Profile Notification #Created","we are glad to inform you that your staff profile has been created.")
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }; 

  const deleteStaff = (id) => {
    axios
      .delete(
        `https://crudcrud.com/api/e228407e233547a597b5ae22aafcb6e8/zamara/${id}`
      )
      .then(() => {
        const updatedStaffData = staffData.filter((staff) => staff._id !== id);
        const updatedRecord = staffData.find(staff => staff._id == id)
        setStaffData(updatedStaffData);
        sendEmail(updatedRecord.staffName,updatedRecord.staffEmail,"Profile Notification #Deleted","we are sad to inform you that your staff profile has been deleted.")
      })
      .catch((error) => {
        console.log(error);
      });
  };

const renderStaffData = () => {
    return (
      <FlatList
        data={staffData}
        keyExtractor={(staff) => staff._id}
        style={{ width: '100%' }}
        renderItem={({ item: staff }) => (
          <View style={[!showSideNav ? styles.fullWidth : null]}>
            <Card key={staff._id}>
              <Card.Title
                title={staff.staffNumber}
                subtitle={staff.staffName}
              />
              <Card.Content>
                <Txt variant="bodyMedium">{staff.staffEmail}</Txt>
                <Txt variant="bodyMedium">Dept: {staff.department}</Txt>
                <Txt variant="bodyMedium">Salary: {staff.salary}</Txt>
              </Card.Content>
              <Card.Actions>
                <Btn onPress={() => handleEdit(staff._id)}>Edit</Btn>
                <Btn onPress={() => deleteStaff(staff._id)}>Delete</Btn>
              </Card.Actions>
            </Card>
            <br />
          </View>
        )}
      />
    );
  };
  
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
          <Text style={styles.welcomeText}>Staff</Text>
        </View>

        <br />
        <br />
        <br />
        <View style={styles.profileDetails}>
          <Text style={styles.profileText}>Add Staff</Text>
          <TextInput
            style={styles.input}
            placeholder="Staff Number"
            value={staffNumber}
            onChangeText={(text) => setStaffNumber(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Staff Name"
            value={staffName}
            onChangeText={(text) => setStaffName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Staff Email"
            value={staffEmail}
            onChangeText={(text) => setStaffEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Department"
            value={department}
            onChangeText={(text) => setDepartment(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Salary"
            value={salary}
            onChangeText={(text) => setSalary(text)}
          />
          <Button title="Submit" onPress={submitForm} />
          <br />
        </View>
        {renderStaffData()}
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
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    width: "80%",
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: "#2e64e5",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  staffContainer: {
    marginTop: 20,
  },
  staffItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  staffItemText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  fullWidth: {
    width: "100%",
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

export default StaffScreen;
