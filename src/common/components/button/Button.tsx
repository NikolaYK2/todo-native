import React, {memo, ReactNode, useCallback} from "react";
import {Pressable, TouchableOpacity} from "react-native";

type ButtonType = {
  name?: string;
  callBack: () => void;
  style?: string;
  disabled?: boolean;
  children: ReactNode
};
export const Button: React.FC<ButtonType> = memo(({name, ...props}) => {
  const onclickHandler = useCallback(() => {
    props.callBack();
  }, [props]);
  return (
    <Pressable>
      {/*<button*/}
      {/*  onClick={onclickHandler}*/}
      {/*  className={`${props.style} ${s.button} ${props.disabled && s.disabled}`}*/}
      {/*  disabled={props.disabled}*/}
      {/*>*/}
      {/*  {name}*/}
      {/*</button>*/}
      <TouchableOpacity onLongPress={onclickHandler} disabled={props.disabled}>
        {props.children}
      </TouchableOpacity>
    </Pressable>
  );
});
