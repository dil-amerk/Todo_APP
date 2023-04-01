import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadTodos,
  selectTodos,
  updateTodo,
  deleteTodo,
} from "../store/todoSlice";
import i18next from "i18next";
import { ITodo } from "../redux/types";
import { useTranslation } from "react-i18next";
import {
  Input,
  Checkbox,
  Button,
  Snackbar,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const TodoList = () => {
  const dispatch = useDispatch();

  const allTodos: ITodo[] = useSelector(selectTodos);
  const [editTodo, setEditTodo] = useState<{
    id: number;
    todo: string;
  } | null>(null);

  const [checkedTodos, setCheckedTodos] = useState<number[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const handleEditClick = (todo: ITodo) => {
    setEditTodo({ id: todo.id, todo: todo.todo });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodo({
      ...editTodo!,
      todo: e.target.value,
    });
  };

  const handleEditSave = () => {
    if (editTodo) {
      dispatch(
        updateTodo({
          ...editTodo,
          done: allTodos.find((todo) => todo.id === editTodo.id)?.done || false,
        })
      );
      setEditTodo(null);
    }
    showToast(`${t("Toast.update")}`);
  };

  const handleCheckboxChange = (todoId: number) => {
    if (checkedTodos.includes(todoId)) {
      setCheckedTodos(checkedTodos.filter((id) => id !== todoId));
      dispatch(
        updateTodo({
          id: todoId,
          done: false,
          todo: allTodos.find((todo) => todo.id === todoId)!.todo,
        })
      );
      showToast(`${t("Toast.notDone")}`);
    } else {
      setCheckedTodos([...checkedTodos, todoId]);
      dispatch(
        updateTodo({
          id: todoId,
          done: true,
          todo: allTodos.find((todo) => todo.id === todoId)!.todo,
        })
      );
      showToast(`${t("Toast.done")}`);
    }
  };

  const handleDeleteClick = (todoId: number) => {
    dispatch(deleteTodo(todoId));
    showToast(`${t("Toast.delete")}`);
  };

  const filteredTodos = allTodos.filter(
    (todo) =>
      typeof todo.todo === "string" &&
      todo.todo.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <Input
        placeholder={i18next.t("search")}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        margin="normal"
      />
      <Grid container spacing={2}>
        {filteredTodos.map((todo) => (
          <Grid item xs={12} sm={6} md={4} key={todo.id}>
            <Card sx={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)" }}>
              <CardContent>
                <Checkbox
                  checked={checkedTodos.includes(todo.id)}
                  onChange={() => handleCheckboxChange(todo.id)}
                />
                {editTodo?.id === todo.id ? (
                  <TextField
                    value={editTodo.todo}
                    onChange={handleEditChange}
                    fullWidth
                  />
                ) : (
                  <Typography>{todo.todo}</Typography>
                )}
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleDeleteClick(todo.id)}>
                  {i18next.t("Button.delete")}
                </Button>
                <Button size="small" onClick={() => handleEditClick(todo)}>
                  {i18next.t("Button.edit")}
                </Button>
                {editTodo?.id === todo.id && (
                  <Button size="small" onClick={handleEditSave}>
                    {i18next.t("Button.save")}
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={!!toastMessage}
        autoHideDuration={3000}
        onClose={() => setToastMessage(null)}
        message={toastMessage || ""}
      />
    </div>
  );
};

export default TodoList;
