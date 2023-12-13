import React, {useCallback, useState} from "react";
import {UniversalInput} from "common/components/input/UniversalInput";
import {BaseResponsTodolistsType} from "common/api/todolistsApi";
import {View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Button} from "common/components/button/Button";

type FullInputType = {
  addItem: (addTitle: string) => Promise<unknown>;
  disabled?: boolean;
};

export const FullInput = React.memo(({disabled = false, ...props}: FullInputType) => {
  //=======State Добавление таски======================================================
  const [addTitle, setAddTitle] = useState<string>("");
  //=====State Ошибка в случаи попытка отправки пустого поля========================
  let [error, setError] = useState<string | null>(null);
  const errorStop = error ? 'error' : "";
  // const errorStop = error ? s.error : "";

  const handlerAddTask = useCallback(() => {
    if (addTitle.trim() !== "") {
      props.addItem(addTitle.trim())
        .then(() => {
          setAddTitle("");
        }).catch((e: BaseResponsTodolistsType) => {
        if (e?.resultCode) {
          setError(e.messages[0])
        }
      })
    } else {
      setError("Заполни полe Чувак!");
    }
  }, [addTitle, props]);
  //=====================================================================================


  return (
    <>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <UniversalInput
          setAddTitle={setAddTitle}
          addTitle={addTitle}
          callback={handlerAddTask}
          setError={setError}
          style={errorStop}
          error={error}
          disabled={disabled}
        />
        <View style={{marginHorizontal: 10}}>
            <Button callBack={handlerAddTask}>
              <Ionicons name="add-circle" size={30} color="black"/>
            </Button>
        </View>
        {/*<Button callBack={handlerAddTask} style={s.addTask} disabled={disabled} />*/}
      </View>
      {/*<div className={s.input__block}>*/}
      {/*  <UniversalInput*/}
      {/*    setAddTitle={setAddTitle}*/}
      {/*    addTitle={addTitle}*/}
      {/*    callback={handlerAddTask}*/}
      {/*    setError={setError}*/}
      {/*    style={errorStop}*/}
      {/*    error={error}*/}
      {/*    disabled={disabled}*/}
      {/*  />*/}
      {/*  <Button callBack={handlerAddTask} style={s.addTask} disabled={disabled} />*/}
      {/*</div>*/}
    </>
  );
});
