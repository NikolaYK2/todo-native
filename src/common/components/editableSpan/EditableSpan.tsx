import React, {memo, useCallback, useState} from "react";
import {Text, TextInput, View,} from "react-native";
import {globalStyle} from "assets/style/globalStyle";
import {TaskStatuses} from "common/api/todolistsApi";

type EditableSpanType = {
  title: string;
  onChange: (newValue: string) => void;
  disabled?: boolean;
  status?: number
};
//Делаем спан инпутом когданужно=========================================================
export const EditableSpan = /*React.*/ memo((props: EditableSpanType) => {
  //==Делаем управление не из вне, а state управление самой компонентой
  //=====CONTROL EDITSPAN TASK=====================================================================
  let [editMode, setEditMode] = useState(false);
  //=====CONTROL VALUE=====================================================================
  let [title, setTitle] = useState(props.title); //props.title cо старта будет то значение котрое приходит в пропсах

  const switching = useCallback(() => {
    if (title !== "") {
      setEditMode(!editMode);
    }
    props.onChange(title);
  }, [props, title, editMode]);

  const onChangeHandlerValue = useCallback((e: string) => {
    // const onChangeHandlerValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e);
  }, []);

  // const onKeyDownHandlerValue = useCallback(
  //   (e: KeyboardEvent<HTMLInputElement>) => {
  //     if (e.key === "Enter") {
  //       switching();
  //     }
  //   },
  //   [switching]
  // );

  // ============================================================================
  return editMode ? (
    <View>
      <TextInput
        style={globalStyle.input}
        onChangeText={onChangeHandlerValue}
        onBlur={switching}
        value={props.title}
        autoFocus
      />
    </View>
  ) : (
    <Text onLongPress={switching}
          style={[{
            fontSize: 20,
            fontWeight: 'bold',
            textDecorationLine: `${props.status === TaskStatuses.Completed ? 'line-through' : 'none'}`
          }]}>
      {title}
    </Text>
  );
});
