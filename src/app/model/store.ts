import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { todoListsReducer } from "features/todolistsList/model/todos/todoListsReducer";
import { tasksReducer } from "features/todolistsList/model/tasks/tasksReducer";
import { appReducer } from "app/model/appReducer";
import { authReducer } from "features/auth/model/authReducer";
// import thunkMiddleware from "redux-thunk";



export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  todoLists: todoListsReducer,
  tasks: tasksReducer
})
export const store = configureStore({
  reducer: rootReducer
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
});
// export const store = configureStore({
//   reducer: {
//     app: appReducer,
//     auth: authReducer,
//     todoLists: todoListsReducer,
//     tasks: tasksReducer
//   },
//   // middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
// });

export type AppDispatch = typeof store.dispatch;

export type AppRootStateType = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, Action<string>>;//больше не нужна

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
