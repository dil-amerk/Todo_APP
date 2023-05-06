import { Link } from "react-router-dom";
import { useTodo } from "../hooks";
import { AddTodo } from "./AddTodo";

export const List = () => {
  const { data, isLoading, error, isError } = useTodo();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <AddTodo />
      <ul>
        {data.map((task: any) => {
          return (
            <div key={task.id}>
              <Link to={`/update/${task.id}`}>{task.content}</Link>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
