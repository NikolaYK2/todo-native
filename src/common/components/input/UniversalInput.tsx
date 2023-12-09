import React, { ChangeEvent, KeyboardEvent, useCallback } from "react";
import {Text, View} from "react-native";

type UniversalInputType = {
  setAddTitle: (addTitle: string) => void;
  addTitle: string;
  callback: () => void;
  setError: (value: null) => void;
  style: string;
  error?: string | null;
  disabled?: boolean;
};

export const UniversalInput = React.memo((props: UniversalInputType) => {
  //добавления значений в инпут============================
  const onChangeHandlerAddTask = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (props.error !== null) {
        props.setError(null); //Когда начинаем писать, ошибка пропадает / можно это прописать и в onKey
      }
      props.setAddTitle(event.currentTarget.value);
    },
    [props]
  );

  //Кнопка ввода ENter==================================================
  const onKeyDownHandler = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        props.callback(); // функция добавления таски
      }
    },
    [props]
  );

  return (
    <View>
      <Text>Input</Text>
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
