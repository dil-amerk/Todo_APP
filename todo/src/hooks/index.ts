import { useQuery } from "react-query";
import { API_KEY, API_URL, fetchTodos } from "../common";
import React from "react";
import axios from "axios";

// ## LIST TODOS ##
export const useTodo = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: () => fetchTodos(),
    refetchInterval: 5000,
  });
};

// ## ADD TODO ##
export const useAddTodo = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const postTodo = async (task: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("Failed to post todo to Todoist API");
      }

      const data = await response.json();
      setIsLoading(false);
      return data.id;
    } catch (error: any | null) {
      setIsLoading(false);
      setError(error);
    }
  };

  return { postTodo, isLoading, error };
};

// ## UPDATE TODO ##

interface TodoItem {
  id: string;
  content: string;
}

interface UpdateTodoItemInput {
  id: string;
  content?: string;
}

export async function updateTodoItem(
  updates: UpdateTodoItemInput
): Promise<TodoItem> {
  const response = await axios.post<TodoItem>(
    `${API_URL}/${updates.id}`,
    {
      content: updates.content,
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  return response.data;
}

// ## DELET TODO ##
