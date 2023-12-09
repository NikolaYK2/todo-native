import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusType } from "app/model/appReducer";
import { todoActions, todoThunk } from "features/todolistsList/model/todos/todoListsReducer";
import { createAppAsyncThunk } from "common/utils";
import { ResultCode } from "common/api/todolistsApi";
import {
  ArgUpdateTaskType,
  CreateTaskType,
  tasksApi,
  TaskType,
  UpdTaskType,
} from "features/todolistsList/api/tasksApi";

//extra --------------
const setTasksTC = createAppAsyncThunk<{ tasks: TaskType[]; todoId: string }, string>(
  "tasks/setTask",
  async (todoId) => {
    const res = await tasksApi.getTasks(todoId);
    return { tasks: res.data.items, todoId };
  }
);

//extra -----------------------------
const addTasksTC = createAppAsyncThunk<{ task: TaskType }, CreateTaskType>("tasks/addTasks", async (arg, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  const res = await tasksApi.createTask(arg);
  if (res.data.resultCode === ResultCode.Ok) {
    return { task: res.data.data.item };
  } else {
    return rejectWithValue(res.data);
  }
});

//extra --------
export const deleteTasksTC = createAppAsyncThunk(
  "tasks/deleteTask",
  async (arg: { todoId: string; taskId: string }, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(taskActions.changeEntStatusTask({ taskId: arg.taskId, todoId: arg.todoId, status: "loading" }));
    const res = await tasksApi.deleteTask(arg.todoId, arg.taskId);
    if (res.data.resultCode === ResultCode.Ok) {
      dispatch(taskActions.changeEntStatusTask({ taskId: arg.taskId, todoId: arg.todoId, status: "idle" }));
      return { todoId: arg.todoId, taskId: arg.taskId };
    }
  }
);

//UPD task ----------------------------------------------------------------
export type UpdTaskTCType = Partial<UpdTaskType>;
const updateTaskTC = createAppAsyncThunk<ArgUpdateTaskType, ArgUpdateTaskType>(
  "tasks/updateTas",
  async (arg, thunkAPI) => {
    const { getState, dispatch, rejectWithValue } = thunkAPI;

    const task = getState().tasks[arg.todoId].find((t) => t.id === arg.taskId); //Будет бежать по массиву только до первого совпадения
    dispatch(taskActions.changeEntStatusTask({ todoId: arg.todoId, taskId: arg.taskId, status: "loading" }));

    if (!task) {
      console.warn("task not found");
      return rejectWithValue(null);
    }

    const apiModel: UpdTaskType = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      // ...task - нельзя, отправим много чего лишнего
      ...arg.model,
    };
    // return thunkTryCatch(thunkAPI, async () => {
    const res = await tasksApi.updateTask(arg, apiModel);
    if (res.data.resultCode === ResultCode.Ok) {
      dispatch(taskActions.changeEntStatusTask({ todoId: arg.todoId, taskId: arg.taskId, status: "succeeded" }));
      // return { todoId: arg.todoId, taskId: arg.taskId, model: apiModel };
      return arg;
    } else {
      return rejectWithValue(res.data);
    }
    // }).finally(() => {
    //   dispatch(taskActions.changeEntStatusTask({ todoId: arg.todoId, taskId: arg.taskId, status: "idle" }));
    // });
  }
);

//reducer --------------------------------------------------------
export type EntStatusType = {
  entityStatus?: StatusType;
};
export type TaskStateType = Record<string, TaskType[]>;
//   [todolistID: string]: TaskType[];
// };

export const initialState: TaskStateType = {
  // ['todolistID_1']: [
  //     {id: '1', title: "HTML&CSS", isDone: true},
  //     {id: '2', title: "JS", isDone: true,},
  //     {id: '3', title: "ReactJS", isDone: true},
  //     {id: '4', title: "Next", isDone: false},
  // ],
  // ['todolistID_2']: [
  //     {id: '1', title: "Beer", isDone: true},
  //     {id: '2', title: "Meat", isDone: true},
  //     {id: '3', title: "Fish", isDone: true},
  //     {id: '4', title: "Drink", isDone: false},
  // ],
};

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    changeTaskTitle: (state, action: PayloadAction<{ taskId: string; newValue: string; todoId: string }>) => {
      return {
        ...state,
        [action.payload.todoId]: state[action.payload.todoId].map((task) =>
          task.id === action.payload.taskId ? { ...task, title: action.payload.newValue } : task
        ),
      };
    },

    changeEntStatusTask: (state, action: PayloadAction<{ todoId: string; taskId: string; status: StatusType }>) => {
      return {
        ...state,
        [action.payload.todoId]: state[action.payload.todoId].map((t) =>
          t.id === action.payload.taskId ? { ...t, entityStatus: action.payload.status } : t
        ),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setTasksTC.fulfilled, (state, action) => {
        state[action.payload.todoId] = action.payload.tasks;
      })
      .addCase(addTasksTC.fulfilled, (state, action) => {
        state[action.payload.task.todoListId].unshift(action.payload.task);
      })
      .addCase(deleteTasksTC.fulfilled, (state, action) => {
        if (action?.payload) {
          const tasks = state[action.payload.todoId];
          const index = tasks.findIndex((t) => t.id === action.payload?.taskId);
          if (index !== -1) tasks.splice(index, 1);
        }
      })
      .addCase(updateTaskTC.fulfilled, (state, action) => {
        const tasks = state[action.meta.arg.todoId];
        const index = tasks.findIndex((t) => t.id === action.meta.arg.taskId);
        if (index !== -1) tasks[index] = { ...tasks[index], ...action.meta.arg.model };
      })
      .addCase(todoThunk.addTodo.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todoThunk.deleteTodo.fulfilled, (state, action) => {
        delete state[action.payload.todolistID];
      })
      .addCase(todoThunk.setTodolists.fulfilled, (state, action) => {
        action.payload.todolist.forEach((tl) => {
          state[tl.id] = [];
        });
      })
      .addCase(todoActions.clearData, () => {
        return {};
      });

    //Или используем commonAction --------
    //   .addCase(clearTodoTask, ()=>{
    //     return {}
    //   })

    // [todoActions.addTodo.type]: (state, action: PayloadAction<{}>) => {},
    // [todoActions.deleteTodo.type]: (state, action: PayloadAction<{}>) => {},
    // [todoActions.setTodo.type]: (state, action: PayloadAction<{}>) => {},
    // [todoActions.clearData.type]: (state, action: PayloadAction<{}>) => {},
  },
});
// Создаем reducer с помощью slice
export const tasksReducer = slice.reducer;
export const taskActions = slice.actions;
export const tasksThunk = { setTasksTC, deleteTasksTC, addTasksTC, updateTaskTC };
