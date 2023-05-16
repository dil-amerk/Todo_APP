import { useState } from "react";
import { useAddTodo } from "../hooks";
import { TextField, Button, Alert } from "@mui/material";

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
    setTaskName("");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <TextField
        label="Task Name"
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
      />
      <Button type="submit" variant="contained" disabled={isLoading}>
        {isLoading ? "Loading..." : "Add Task"}
      </Button>
      {error && <Alert severity="error">{error.message}</Alert>}
    </form>
  );
};
