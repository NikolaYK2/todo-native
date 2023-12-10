import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import {Provider} from "react-redux";
import AppRedux from "app/ui/AppRedux";
import {store} from "app/model/store";

export default function App() {
  return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar style="auto"/>
          <AppRedux/>
        </View>
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
