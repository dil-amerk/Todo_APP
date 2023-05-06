import { useState } from "react";
import { useAddTodo } from "../hooks";

export const AddTodo = () => {
  const [taskName, setTaskName] = useState("");
  const { postTodo, isLoading, error } = useAddTodo();

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const task = {
      content: taskName,
    };
    const taskId = await postTodo(task);
    console.log(`Task posted to API with ID ${taskId}`);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Add Task"}
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};
