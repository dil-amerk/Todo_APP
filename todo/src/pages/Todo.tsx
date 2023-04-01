import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todoSlice";
import { AppDispatch } from "../store/store";
import "../Translation/config";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";
import TodoList from "./TodoList";
import {
  Box,
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

const Todo = () => {
  const [todo, setTodo] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const { t } = useTranslation();

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const handleAddTodo = () => {
    if (todo.trim() === "") {
      return;
    }
    dispatch(addTodo(todo));
    setTodo("");
    showToast(t("Toast.add"));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h1" textAlign="center">
            {t("title")}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <LanguageSwitcher />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            label="Todo"
            variant="outlined"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Button variant="contained" onClick={handleAddTodo} fullWidth>
            {t("Button.add")}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TodoList />
        </Grid>
      </Grid>
      <Snackbar
        open={!!toastMessage}
        autoHideDuration={3000}
        onClose={() => setToastMessage(null)}
        message={toastMessage || ""}
      />
    </Box>
  );
};

export default Todo;
