import {Provider} from "react-redux";
import AppRedux from "app/ui/AppRedux";
import {store} from "app/model/store";
import {SafeAreaProvider} from "react-native-safe-area-context";


export default function App() {

  return (
    <Provider store={store}>
      <SafeAreaProvider>
          <AppRedux/>
      </SafeAreaProvider>
    </Provider>
  );
}


