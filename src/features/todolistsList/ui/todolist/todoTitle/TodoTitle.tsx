import React, {memo, useCallback} from "react";
import {EditableSpan} from "common/components";
import {useActions} from "common/hooks/useActions";
import {TodoAppType, todoThunk} from "features/todolistsList/model/todos/todoListsReducer";
import {Text, View} from "react-native";

type Props = {
  todolist: TodoAppType;
};
export const TodoTitle = memo((props: Props) => {
  const {id, title} = props.todolist;

  const {deleteTodo, changeTitleTodo} = useActions(todoThunk);

  const onClickHandlerDeleteTodolist = useCallback(() => {
    deleteTodo(props.todolist.id);
  }, [deleteTodo, props.todolist.id]);

  const onChangeHandlerTitleTodolist = useCallback(
    (newValue: string) => {
      changeTitleTodo({todoId: id, title: newValue});
    },
    [changeTitleTodo, id]
  );

  return (
    <>
      <View>
        <EditableSpan title={title} onChange={onChangeHandlerTitleTodolist}/>
      </View>
      <Text>Button delete</Text>
      {/*<IconButton onClick={onClickHandlerDeleteTodolist} color={"error"} disabled={props.todolist.entityStatus === "loading"}>*/}
      {/*  <Delete />*/}
      {/*</IconButton>*/}
    </>
  );
});
