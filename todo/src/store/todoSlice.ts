import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ITodo, TodoState } from "../redux/types";

const initialState: TodoState = {
  todos: [],
};

const loadTodosFromLocalStorage = (): ITodo[] => {
  const todosJson = localStorage.getItem("todos");
  if (todosJson) {
    return JSON.parse(todosJson);
  }
  return [];
};

const saveTodosToLocalStorage = (todos: ITodo[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const loadTodos = createAsyncThunk("todos/load", async () => {
  return loadTodosFromLocalStorage();
});

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: ITodo = {
        id: state.todos.length + 1,
        todo: action.payload,
        done: false,
      };
      state.todos.push(newTodo);
      saveTodosToLocalStorage(state.todos);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const index = state.todos.findIndex(
        (todo: { id: number }) => todo.id === action.payload
      );
      if (index !== -1) {
        state.todos.splice(index, 1);
        saveTodosToLocalStorage(state.todos);
      }
    },
    updateTodo: (state, action: PayloadAction<ITodo>) => {
      const todo = state.todos.find(
        (todo: { id: number }) => todo.id === action.payload.id
      );
      if (todo) {
        todo.todo = action.payload.todo;
        saveTodosToLocalStorage(state.todos);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      saveTodosToLocalStorage(state.todos);
    });
  },
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todos;

export default todoSlice.reducer;
