import React, {KeyboardEvent, useCallback} from "react";
import {TextInput, View} from "react-native";
import {globalStyle} from "assets/style/globalStyle";

type UniversalInputType = {
  setAddTitle: (addTitle: string) => void;
  addTitle: string;
  callback: () => void;
  setError: (value: null) => void;
  style: string;
  error?: string | null;
  disabled?: boolean;
};

export const UniversalInput = React.memo(({
                                            error,
                                            setError,
                                            setAddTitle,
                                            addTitle,
                                            style,
                                            disabled,
                                            callback
                                          }: UniversalInputType) => {
  //добавления значений в инпут============================
  const onChangeHandlerAddTask = useCallback(
    (event: string) => {
      // (event: ChangeEvent<HTMLInputElement>) => {
      if (error !== null) {
        setError(null);
      }
      setAddTitle(event);
    },
    []
  );

  //Кнопка ввода ENter==================================================
  const onKeyDownHandler = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        callback(); // функция добавления таски
      }
    },
    []
  );

  return (
    <View>
      <TextInput
        style={globalStyle.input}
        onChangeText={onChangeHandlerAddTask}
        value={addTitle}
      />
      {/*<TextField*/}
      {/*  disabled={props.disabled}*/}
      {/*  size="small"*/}
      {/*  variant="filled"*/}
      {/*  color="success"*/}
      {/*  label={props.error ? "Delete or fill" : "add title"}*/}
      {/*  error={!!props.error}*/}
      {/*  value={props.addTitle}*/}
      {/*  onChange={onChangeHandlerAddTask}*/}
      {/*  onKeyDown={onKeyDownHandler}*/}
      {/*  style={{ maxWidth: "180px" }}*/}
      {/*  className={`${props.style} ${s.modified}`}*/}
      {/*  sx={{*/}
      {/*    input: { color: "#e0e0e0", backgroundColor: "rgba(110,106,106,0.6)" },*/}
      {/*  }}*/}
      {/*/>*/}
    </View>
  );
});

