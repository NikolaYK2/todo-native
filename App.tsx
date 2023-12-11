import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Provider} from "react-redux";
import AppRedux from "app/ui/AppRedux";
import {store} from "app/model/store";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


import React from "react";
import {SafeAreaProvider, useSafeAreaInsets} from "react-native-safe-area-context";
import {useSafeAreaStyles} from "common/hooks/useSafeAreaStyle";


function HomeScreen({navigation}: any) {
  const {safeArea} = useSafeAreaStyles();

  return (
    <View style={[safeArea,{flex: 1, justifyContent: 'center'}]}>
      <Button title={'Go to Profile'} color={'green'} onPress={() => navigation.navigate('Profile')}/>
      <View style={styles.container}>
        <StatusBar style="auto"/>
        <AppRedux/>
      </View>
    </View>
  );
}

function ProfileScreen({navigation}: any) {
  const {safeArea} = useSafeAreaStyles();

  return (
    <View style={[safeArea, {flex: 1, alignItems: 'center', justifyContent: 'space-between',}]}>
      <Text>Profile</Text>
      <Button title={'Go to Home'} color={'green'} onPress={() => navigation.navigate('Home')}/>
    </View>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'Home'}>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Profile" component={ProfileScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
