export interface ITodo {
  id: string;
  todo: string;
  done: boolean;
}

export interface TodoState {
  todos: ITodo[];
}

export type TodoAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: string }
  | { type: "EDIT_TODO"; payload: { id: string; todo: string } };
