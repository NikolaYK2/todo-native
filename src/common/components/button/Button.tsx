import React, {memo, ReactNode, useCallback} from "react";
import {Pressable, TouchableOpacity} from "react-native";

type ButtonType = {
  name?: string;
  callBack?: () => void;
  longPressCallBack?: () => void;
  style?: string;
  disabled?: boolean;
  children: ReactNode
};
export const Button: React.FC<ButtonType> = memo(({name, ...props}) => {
  const onClickHandler = useCallback(() => {
    props?.callBack && props.callBack();
  }, [props]);

  const onLongClickHandler = useCallback(() => {
    props?.longPressCallBack && props.longPressCallBack();
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
      <TouchableOpacity onPress={onClickHandler} onLongPress={onLongClickHandler} disabled={props.disabled}>
        {props.children}
      </TouchableOpacity>
    </Pressable>
  );
});
