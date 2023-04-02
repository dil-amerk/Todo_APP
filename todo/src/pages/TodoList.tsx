import React, { useReducer, useState } from "react";
import todoReducer from "../store/todoSlice";
import { ITodo } from "../redux/types";
import MuiAlert from "@mui/material/Alert";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Checkbox,
  Grid,
  CardActions,
  FormControlLabel,
  Snackbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoList = () => {
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

  const handleToggleTodo = (id: string) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
    const todo = state.todos.find((todo) => todo.id === id);
    const message = todo?.done
      ? `Checked "${todo.todo}" off the list`
      : `Unchecked "${todo.todo}" from the list`;
    setNotificationMessage(message);
    setShowNotification(true);
  };

  const handleDeleteTodo = (id: string) => {
    const todo = state.todos.find((todo) => todo.id === id);
    dispatch({ type: "DELETE_TODO", payload: id });
    setNotificationMessage(`Deleted "${todo?.todo}" from the list`);
    setShowNotification(true);
  };

  const handleEditTodo = () => {
    dispatch({
      type: "EDIT_TODO",
      payload: { id: editTodo.id, todo: editTodo.todo },
    });
    setEditTodo({ id: null, todo: "" });
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
      <Grid container spacing={2}>
        {state.todos.map((todo: ITodo) => (
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
                      Save
                    </Button>
                    <Button variant="outlined" onClick={handleCancelEditTodo}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => handleStartEditTodo(todo.id, todo.todo)}
                    sx={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
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

export default TodoList;
