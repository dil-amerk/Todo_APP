import { useState } from "react";
import { useMutation } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { updateTodoItem } from "../hooks";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface UpdateTodoItemInput {
  id: string;
  content?: string;
}

export function UpdateTodo() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const updateMutation = useMutation(
    (updates: UpdateTodoItemInput) => updateTodoItem(updates),
    {
      onSuccess: () => {
        console.log("Item updated successfully");
        navigate("/");
      },
    }
  );

  const handleUpdate = () => {
    updateMutation.mutate({
      id,
      content,
    });
  };

  return (
    <div>
      <TextField
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <Button onClick={handleUpdate} variant="contained">
        Update
      </Button>
    </div>
  );
}
