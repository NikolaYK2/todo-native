import React, {useEffect} from "react";
import {useAppSelector} from "app/model/store";
import {appSelector} from "app/model/appSelector";
import {useActions} from "common/hooks/useActions";
import {appThunk} from "app/model/appReducer";
import {Text} from "react-native";
import {TodolistsList} from "features/todolistsList/ui/TodolistsList";
import {HideKeyboard} from "common/components/hideKeyboard/HideKeyboard";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from "common/type/Navigation";
import {authSelect} from "features/auth/model/authSelector";
import {Login} from "features/auth/ui/Login";


const Stack = createNativeStackNavigator<RootStackParamList>();
// const Stack = createStackNavigator<RootStackParamList>()

type AppReduxType = {
  demo?: boolean;
};

function AppRedux({demo = false}: AppReduxType) {
  const initialized = useAppSelector(appSelector);
  const isLoggedIn = useAppSelector(authSelect);
  const {initializedApp} = useActions(appThunk)

  useEffect(() => {
    if (!initialized) {
      initializedApp()
    }
  }, [])

  if (!initialized) {
    return (
      <Text>Loading...</Text>
      // <CircularProgress
      //   style={{
      //     position: "absolute",
      //     left: "50%",
      //     top: "40%",
      //     color: "brown",
      //   }}
      // />
    );
  }

  return (
        <HideKeyboard>
          <NavigationContainer>
            <Stack.Navigator>
              {isLoggedIn ?
                <Stack.Group>
                  <Stack.Screen name="Todolist" component={TodolistsList}/>
                </Stack.Group>
                :
                <Stack.Group>
                  <Stack.Screen name="Login" component={Login}/>
                </Stack.Group>
              }
            </Stack.Navigator>
          </NavigationContainer>

          {/*<View style={{flex: 1}}>*/}
          {/*  /!*<ButtonAppBar />*!/*/}
          {/*  <View style={{flex: 1}}>*/}
          {/*    <TodolistsList navigation={navigation} route={route}/>*/}
          {/*  </View>*/}

          {/*  /!*<Login/>*!/*/}

          {/*  /!*<Routes>*!/*/}
          {/*  /!*  <Route path="/it-incubator-todolist-ts-01" element={<Navigate to={"/"} />} />*!/*/}
          {/*  /!*  <Route path="/" element={<TodolistsList demo={demo} />} />*!/*/}
          {/*  /!*  <Route path="/auth" element={<Login />} />*!/*/}
          {/*  /!*  <Route path="/404" element={<h1 style={{ color: "brown", textAlign: "center" }}>404: PAGE NOT FOUND</h1>} />*!/*/}
          {/*  /!*  <Route path="*" element={<Navigate to={"/404"} />} />*!/*/}
          {/*  /!*</Routes>*!/*/}
          {/*</View>*/}

        </HideKeyboard>

  );
}

export default AppRedux;
