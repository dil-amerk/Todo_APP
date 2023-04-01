export interface ITodo {
  id: number;
  todo: string;
  done: boolean;
}

export interface TodoState {
  todos: ITodo[];
}
