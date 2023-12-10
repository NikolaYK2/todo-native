import React, {memo, useCallback} from "react";
import {tasksThunk} from "features/todolistsList/model/tasks/tasksReducer";
import {EditableSpan} from "common/components/editableSpan/EditableSpan";
import {TaskStatuses} from "common/api/todolistsApi";
import {TaskType} from "features/todolistsList/api/tasksApi";
import {useActions} from "common/hooks/useActions";
import {StyleSheet, View} from "react-native";
import {Checkbox} from "expo-checkbox";
import {globalStyle} from "assets/style/globalStyle";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Button} from "common/components";

type Props = {
  task: TaskType;
  idTodolist: string;
  disabled?: boolean;
};
export const Task = memo((props: Props) => {
  const {deleteTasksTC, updateTaskTC} = useActions(tasksThunk);

  const changeTaskStatusHandler = useCallback(() => {
    updateTaskTC({
      todoId: props.idTodolist,
      taskId: props.task.id,
      model: {
        status: props.task.status ? TaskStatuses.New : TaskStatuses.Completed,
      },
    });
  }, [updateTaskTC, props.idTodolist, props.task.id, props.task.status]);

  const deleteTaskHandler = useCallback(() => {
    deleteTasksTC({todoId: props.idTodolist, taskId: props.task.id});
  }, [deleteTasksTC, props.idTodolist, props.task.id]);

  const onChangeTitleHandler = useCallback(
    (newValue: string) => {
      updateTaskTC({todoId: props.idTodolist, taskId: props.task.id, model: {title: newValue}});
    },
    [updateTaskTC, props.idTodolist, props.task.id]
  );

  return (
    <View style={styles.tasks}>

      <Button callBack={deleteTaskHandler} disabled={props.task.entityStatus === "loading"}>
        <MaterialCommunityIcons name="delete-forever" size={24} color="brown"/>
      </Button>
      {/*<Button callBack={deleteTaskHandler} style={s.dellTask} disabled={props.task.entityStatus === "loading"} />*/}
      {/*<Checkbox*/}
      {/*  checked={props.task.status === TaskStatuses.Completed}*/}
      {/*  onChange={changeTaskStatusHandler}*/}
      {/*  icon={<BookmarkBorder />}*/}
      {/*  checkedIcon={<Bookmark />}*/}
      {/*  style={{ color: "darkred" }}*/}
      {/*  disabled={props.task.entityStatus === "loading"}*/}
      {/*/>*/}
      <Checkbox style={[globalStyle.checkBox, {marginHorizontal: 20}]}
                value={props.task.status === TaskStatuses.Completed}
                onValueChange={changeTaskStatusHandler}
                disabled={props.task.entityStatus === "loading"}
      />
      <EditableSpan
        title={props.task.title}
        status={props.task.status}
        onChange={onChangeTitleHandler}/>
    </View>
  );
});

const styles = StyleSheet.create({
  tasks: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10
  }
})