import { ITodo, TodoState, TodoAction } from "../redux/types";

const INITIAL_STATE: TodoState = {
  todos: JSON.parse(localStorage.getItem("todos")!) || [],
};

const todoSlice = (
  state: TodoState = INITIAL_STATE,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case "ADD_TODO":
      const newTodo: ITodo = {
        id: Date.now().toString(),
        todo: action.payload,
        done: false,
      };
      const addedTodos: ITodo[] = [...state.todos, newTodo];
      localStorage.setItem("todos", JSON.stringify(addedTodos));
      return {
        ...state,
        todos: addedTodos,
      };
    case "TOGGLE_TODO":
      const toggledTodoId: string = action.payload;
      const toggledTodoIndex: number = state.todos.findIndex(
        (todo) => todo.id === toggledTodoId
      );
      const toggledTodo: ITodo = {
        ...state.todos[toggledTodoIndex],
        done: !state.todos[toggledTodoIndex].done,
      };
      const toggledTodos: ITodo[] = [
        ...state.todos.slice(0, toggledTodoIndex),
        toggledTodo,
        ...state.todos.slice(toggledTodoIndex + 1),
      ];
      localStorage.setItem("todos", JSON.stringify(toggledTodos));
      return {
        ...state,
        todos: toggledTodos,
      };
    case "DELETE_TODO":
      const deletedTodoId: string = action.payload;
      const deletedTodoIndex: number = state.todos.findIndex(
        (todo) => todo.id === deletedTodoId
      );
      const deletedTodos: ITodo[] = [
        ...state.todos.slice(0, deletedTodoIndex),
        ...state.todos.slice(deletedTodoIndex + 1),
      ];
      localStorage.setItem("todos", JSON.stringify(deletedTodos));
      return {
        ...state,
        todos: deletedTodos,
      };
    case "EDIT_TODO":
      const editedTodoId: string = action.payload.id;
      const editedTodoIndex: number = state.todos.findIndex(
        (todo) => todo.id === editedTodoId
      );
      const editedTodo: ITodo = {
        ...state.todos[editedTodoIndex],
        todo: action.payload.todo,
      };
      const updatedTodos: ITodo[] = [
        ...state.todos.slice(0, editedTodoIndex),
        editedTodo,
        ...state.todos.slice(editedTodoIndex + 1),
      ];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return {
        ...state,
        todos: updatedTodos,
      };
    default:
      return state;
  }
};

export default todoSlice;
