import React, {memo, useCallback} from "react";
import {Button, EditableSpan} from "common/components";
import {useActions} from "common/hooks/useActions";
import {TodoAppType, todoThunk} from "features/todolistsList/model/todos/todoListsReducer";
import {View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

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
    <View style={{flexDirection: 'row', justifyContent:'center', marginVertical:15}}>
      <View style={{marginHorizontal:20}}>
        <EditableSpan title={title} onChange={onChangeHandlerTitleTodolist}/>
      </View>
      <Button longPressCallBack={onClickHandlerDeleteTodolist} disabled={props.todolist.entityStatus === "loading"}>
        <MaterialCommunityIcons name="delete-forever" size={24} color="brown"/>
      </Button>
      {/*<IconButton onClick={onClickHandlerDeleteTodolist} color={"error"} disabled={props.todolist.entityStatus === "loading"}>*/}
      {/*  <Delete />*/}
      {/*</IconButton>*/}
    </View>
  );
});
