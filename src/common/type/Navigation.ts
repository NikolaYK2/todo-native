import {NativeStackScreenProps} from "@react-navigation/native-stack";

export type RootStackParamList = {
  Todolist: undefined;
  Login:undefined;
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Todolist'>;
export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
