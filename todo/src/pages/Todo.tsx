import React, { useReducer, useState } from "react";
import todoReducer from "../store/todoSlice";
import { ITodo } from "../redux/types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";
import NoItemMessage from "../components/NoItemMessage";

const Todo = () => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: JSON.parse(localStorage.getItem("todos")!) || [],
  });

  const [editTodo, setEditTodo] = useState<{ id: string | null; todo: string }>(
    {
      id: null,
      todo: "",
    }
  );

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { t } = useTranslation();

  const handleAddTodo = (todo: string) => {
    dispatch({ type: "ADD_TODO", payload: todo });
    setNotificationMessage(t("Toast.add"));
    setShowNotification(true);
  };

  const handleToggleTodo = (id: string) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
    const todo = state.todos.find((todo) => todo.id === id);
    const message = todo?.done ? t("Toast.notDone") : t("Toast.done");
    setNotificationMessage(message);
    setShowNotification(true);
  };

  const handleDeleteTodo = (id: string) => {
    dispatch({ type: "DELETE_TODO", payload: id });
    setNotificationMessage(t("Toast.delete"));
    setShowNotification(true);
  };

  const handleEditTodo = () => {
    dispatch({
      type: "EDIT_TODO",
      payload: { id: editTodo.id, todo: editTodo.todo },
    });
    setNotificationMessage(t("Toast.update"));
    setShowNotification(true);
    setEditTodo({ id: null, todo: "" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todo = (e.target as HTMLFormElement).elements[0].value.trim();
    if (todo) {
      handleAddTodo(todo);
      setSearchQuery("");
      (e.target as HTMLFormElement).reset();
    }
  };

  const handleStartEditTodo = (id: string, todo: string) => {
    setEditTodo({ id, todo: todo });
  };

  const handleCancelEditTodo = () => {
    setEditTodo({ id: null, todo: "" });
  };

  const handleChangeEditingText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodo({ ...editTodo, todo: e.target.value });
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <div>
      <LanguageSwitcher />
      <TextField
        label={t("search")}
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: "10px" }}
      />
      <h1>{t("title")}</h1>
      <form onSubmit={handleSubmit}>
        <TextField label={t("label")} variant="outlined" fullWidth />
        <Button type="submit" variant="contained" sx={{ marginTop: "10px" }}>
          {t("Button.add")}
        </Button>
      </form>
    {state.todos.length > 0 ? ( <Grid container spacing={2}>
        {state.todos
          .filter((todo: ITodo) =>
            todo.todo.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((todo: ITodo) => (
            <Grid item xs={6} md={4} lg={3} key={todo.id}>
              <Card sx={{ marginBottom: "10px" }}>
                <CardContent>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={todo.done}
                        onChange={() => handleToggleTodo(todo.id)}
                      />
                    }
                    label={
                      editTodo.id === todo.id ? (
                        <TextField
                          value={editTodo.todo}
                          onChange={handleChangeEditingText}
                          fullWidth
                        />
                      ) : (
                        <span>{todo.todo}</span>
                      )
                    }
                  />
                </CardContent>
                <CardActions>
                  {editTodo.id === todo.id ? (
                    <>
                      <Button
                        variant="contained"
                        onClick={handleEditTodo}
                        sx={{ marginRight: "10px" }}
                      >
                        {t("Button.save")}
                      </Button>
                      <Button variant="outlined" onClick={handleCancelEditTodo}>
                        {t("Button.cancel")}
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      startIcon={<EditIcon />}
                      onClick={() => handleStartEditTodo(todo.id, todo.todo)}
                      sx={{ marginRight: "10px" }}
                    >
                      {t("Button.edit")}
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    {t("Button.delete")}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>) : (<NoItemMessage text={t('noItem')} />)}
     

      <Snackbar
        open={showNotification}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
      >
        <MuiAlert
          onClose={handleCloseNotification}
          severity="success"
          sx={{ width: "100%" }}
        >
          {notificationMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Todo;
