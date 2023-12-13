import React, {useCallback} from "react";
import {Button} from "common/components";
import {FilterValueType, todoActions, TodoAppType} from "features/todolistsList/model/todos/todoListsReducer";
import {useActions} from "common/hooks/useActions";
import {Text, View, StyleSheet} from "react-native";

type Props = {
  todo: TodoAppType;
};
export const FilterTasksBut = (props: Props) => {

  const {taskFilterTodo} = useActions(todoActions);

  const changeTasksFilterHandler = useCallback(
    (filter: FilterValueType) => {
      taskFilterTodo({todoListsID: props.todo.id, filter});
    },
    [taskFilterTodo, props.todo.id]
  );

  //=================Focus button filter===================================
  const buttonStyle = (stateName: FilterValueType) => {
    return props.todo.filter === stateName ? 'green' : 'transparent';
  };

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
      <Button style={buttonStyle('All')} callBack={useCallback(() => changeTasksFilterHandler("All"), [changeTasksFilterHandler])}>
        {/*name="All"*/}
        <Text style={[styles.text]}>All</Text>
        {/*// style={buttonStyle("All")}*/}

      </Button>
      <Button style={buttonStyle('Active')} callBack={useCallback(() => changeTasksFilterHandler("Active"), [changeTasksFilterHandler])}>
        {/*name="All"*/}
        <Text style={[styles.text,]}>Active</Text>
        {/*// style={buttonStyle("All")}*/}

      </Button>
      <Button style={buttonStyle('Completed')} callBack={useCallback(() => changeTasksFilterHandler("Completed"), [changeTasksFilterHandler])}>
        {/*name="All"*/}
        <Text style={[styles.text,]}>Completed</Text>
        {/*// style={buttonStyle("All")}*/}

      </Button>


      {/*<Button></Button>*/}
      {/*  name="Active"*/}
      {/*  callBack={useCallback(() => changeTasksFilterHandler("Active"), [changeTasksFilterHandler])}*/}
      {/*  // style={buttonStyle("Active")}*/}
      {/*<Button*/}
      {/*  name="Completed"*/}
      {/*  callBack={useCallback(() => changeTasksFilterHandler("Completed"), [changeTasksFilterHandler])}*/}
      {/*  // style={buttonStyle("Completed")}*/}
      {/*/>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  }
})