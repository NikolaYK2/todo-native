import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Provider} from "react-redux";
import AppRedux from "app/ui/AppRedux";
import {store} from "app/model/store";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {useSafeAreaStyles} from "common/hooks/useSafeAreaStyle";
import {HomeProps, ProfileProps, RootStackParamList} from "common/type/Navigation";
import {AntDesign, Entypo, Ionicons} from "@expo/vector-icons";


function HomeScreen({navigation}: HomeProps) {
  const {safeArea} = useSafeAreaStyles();

  return (
    <View style={[safeArea, {flex: 1, justifyContent: 'center'}]}>
      <Button title={'Go to Profile'} color={'green'} onPress={() => navigation.navigate('Profile', {
        itemId: 86,
        otherParam: 'anything you want here',
      })}/>
      <View style={styles.container}>
        <StatusBar style="auto"/>
        <AppRedux/>
      </View>
    </View>
  );
}

function ProfileScreen({navigation}: ProfileProps) {
  const {safeArea} = useSafeAreaStyles();

  return (
    <View style={[safeArea, {flex: 1, alignItems: 'center', justifyContent: 'space-between',}]}>
      <Text>Profile</Text>
      <Button title={'Go to Home'} color={'green'} onPress={() => navigation.navigate('Home')}/>
    </View>
  );
}

// const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();


export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {

                if (route.name === 'Home') {
                  return <Entypo name="home" size={size} color={color}/>
                } else if (route.name === 'Profile') {
                  return <AntDesign name="profile" size={size} color={color}/>
                }

              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} options={{tabBarBadge: 2}}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
    // <Provider store={store}>
    //   <SafeAreaProvider>
    //     <NavigationContainer>
    //       <Stack.Navigator initialRouteName={'Home'}>
    //         <Stack.Screen name="Home" component={HomeScreen}/>
    //         <Stack.Screen name="Profile" component={ProfileScreen}/>
    //       </Stack.Navigator>
    //     </NavigationContainer>
    //   </SafeAreaProvider>
    // </Provider>
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
