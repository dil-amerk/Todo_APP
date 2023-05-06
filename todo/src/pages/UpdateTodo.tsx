import { useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { updateTodoItem } from "../hooks";

interface TodoItem {
  id: string;
  content: string;
}

interface UpdateTodoItemInput {
  id: string;
  content?: string;
}

export function UpdateTodo() {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState("");

  const updateMutation = useMutation(
    (updates: UpdateTodoItemInput) => updateTodoItem(updates),
    {
      onSuccess: () => {
        console.log("Item updated successfully");
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
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}
