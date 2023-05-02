import axios from "axios";
import { useQuery } from "react-query";

const API_URL = "https://api.todoist.com/rest/v2/tasks";
const API_KEY = "8de74ef3faa85fdc44a701e82ad7f556cb4bd2e3";

const fetchTodos = async () => {
  const { data } = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  return data;
};

export const useTodo = () => {
  return useQuery(["todos"], () => fetchTodos());
};
