import React, { useCallback, useEffect } from "react";
import { FullInput } from "common/components/fullInputButton/FullInput";
import { TodoAppType } from "features/todolistsList/model/todos/todoListsReducer";
import { useAppSelector } from "app/model/store";
import { tasksThunk } from "features/todolistsList/model/tasks/tasksReducer";
import { statusSelector } from "features/todolistsList/model/todos/todolistSelector";
import { useActions } from "common/hooks/useActions";
import { FilterTasksBut } from "features/todolistsList/ui/todolist/filterTasksBut/FilterTasksBut";
import { Tasks } from "features/todolistsList/ui/todolist/tasks/Tasks";
import { TodoTitle } from "features/todolistsList/ui/todolist/todoTitle/TodoTitle";
import {View} from "react-native";

type TodolistProps = {
  todolist: TodoAppType;
  demo?: boolean;
};

export const Todolist = React.memo(({ demo = false, ...props }: TodolistProps) => {

  const {id} = props.todolist;

  const status = useAppSelector(statusSelector);

  const { addTasksTC, setTasksTC } = useActions(tasksThunk);

  useEffect(() => {
    setTasksTC(id)
  }, []);

  const addTask = useCallback(
    (title: string) => {
      return addTasksTC({ todoId: id, title: title });
    },
    [addTasksTC, id]
  );


  return (
    <>
      <TodoTitle todolist={props.todolist}/>
      <View >
        <FullInput addItem={addTask} disabled={status === "loading"} />
      </View>
      <View>
        <Tasks todolist={props.todolist}/>
      </View>
      <FilterTasksBut todo={props.todolist} />
    </>
  );
});
