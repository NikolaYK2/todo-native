import {Keyboard, TouchableWithoutFeedback} from "react-native";
import {ReactElement, ReactNode} from "react";

export const HideKeyboard = ({children}: { children: ReactNode }): ReactElement => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)
