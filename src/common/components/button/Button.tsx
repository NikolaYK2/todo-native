import React, { memo, useCallback } from "react";
import {Text, View} from "react-native";

type ButtonType = {
  name?: string;
  callBack: () => void;
  style?: string;
  disabled?: boolean;
};
export const Button: React.FC<ButtonType> = memo(({ name, ...props }) => {
  const onclickHandler = useCallback(() => {
    props.callBack();
  }, [props]);
  return (
    <View>
      {/*<button*/}
      {/*  onClick={onclickHandler}*/}
      {/*  className={`${props.style} ${s.button} ${props.disabled && s.disabled}`}*/}
      {/*  disabled={props.disabled}*/}
      {/*>*/}
      {/*  {name}*/}
      {/*</button>*/}
      <Text>Button</Text>
    </View>
  );
});
