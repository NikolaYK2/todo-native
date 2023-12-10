import React, {useEffect} from "react";
import {useAppSelector} from "app/model/store";
import {appSelector} from "app/model/appSelector";
import {useActions} from "common/hooks/useActions";
import {appThunk} from "app/model/appReducer";
import {Text, View} from "react-native";
import {TodolistsList} from "features/todolistsList/ui/TodolistsList";
import {HideKeyboard} from "common/components/hideKeyboard/HideKeyboard";

type AppReduxType = {
  demo?: boolean;
};

function AppRedux({demo = false}: AppReduxType) {
  const initialized = useAppSelector(appSelector);

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
      <View style={{flex: 1}}>
        {/*<ButtonAppBar />*/}
        <View style={{flex: 1}}>
          <TodolistsList/>
        </View>

        {/*<Login/>*/}

        {/*<Routes>*/}
        {/*  <Route path="/it-incubator-todolist-ts-01" element={<Navigate to={"/"} />} />*/}
        {/*  <Route path="/" element={<TodolistsList demo={demo} />} />*/}
        {/*  <Route path="/auth" element={<Login />} />*/}
        {/*  <Route path="/404" element={<h1 style={{ color: "brown", textAlign: "center" }}>404: PAGE NOT FOUND</h1>} />*/}
        {/*  <Route path="*" element={<Navigate to={"/404"} />} />*/}
        {/*</Routes>*/}
      </View>

    </HideKeyboard>
  );
}

export default AppRedux;
