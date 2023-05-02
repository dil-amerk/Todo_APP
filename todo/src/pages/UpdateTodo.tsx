import React from "react";
import { useParams } from "react-router-dom";
import { useUpdateTodo } from "../hooks/useUpdateTodo";

export const UpdateTodo = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useUpdateTodo(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data?.content} - {data?.created_at}
    </div>
  );
};
