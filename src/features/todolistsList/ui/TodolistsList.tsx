import React, { useCallback, useEffect } from "react";
import { todoThunk } from "features/todolistsList/model/todos/todoListsReducer";
import { Todolist } from "features/todolistsList/ui/todolist/Todolist";
import { FullInput } from "common/components/fullInputButton/FullInput";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "app/model/store";
import { optimizedTodolistSelector, statusSelector } from "features/todolistsList/model/todos/todolistSelector";
import { authSelect } from "features/auth/model/authSelector";
import { useActions } from "common/hooks/useActions";
import {View} from "react-native";

type TodolistsListType = {
  demo?: boolean;
};
export const TodolistsList: React.FC<TodolistsListType> = ({ demo = false }) => {
  const todoLists = useAppSelector(optimizedTodolistSelector);
  const isLoggedIn = useAppSelector(authSelect);
  const status = useAppSelector(statusSelector);

  const {setTodolists, addTodo} = useActions(todoThunk)

  //Достаем тудулисты ========================================
  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
   setTodolists();
  }, [setTodolists, demo, isLoggedIn]);

  const addTodolist = useCallback((title: string) => {
      return addTodo(title).unwrap();
    }, [addTodo]);


  // if (!isLoggedIn) {
  //   return <Navigate to={"/auth"} />;
  // }
  //
  return (
    <View >
      <View >
        {todoLists.map((tl) => {
          return (
            <View key={tl.id}>
              <View style={{backgroundColor: "rgba(0, 0, 0, 0.7)", padding: 10,}}>
                <Todolist
                  todolist={tl}
                  demo={demo}
                />
              </View>
            </View>
          )
        })}
      </View>
      <View  style={{ padding: 20, height: 70 }}>
        <FullInput addItem={addTodolist} disabled={status === 'loading'}/>
      </View>

    </View>
  );
};
