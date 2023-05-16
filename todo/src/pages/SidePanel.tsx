import React, { useState } from "react";
import { UpdateTodo } from "./UpdateTodo";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { deleteTodoItem } from "../hooks";
import { useTodo } from "../hooks/index";

export const SidePanel = () => {
  const queryClient = useQueryClient();
  const { data: todos } = useTodo();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  async function handleDelete(id: string) {
    await queryClient.cancelQueries("todo");
    try {
      await deleteTodoItem(id);
      await queryClient.invalidateQueries("todo");
    } catch (err) {
      queryClient.setQueryData("todo", (old) => old);
    }
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          position: "fixed",
          right: 0,
          top: 0,
          height: "100%",
          width: "300px",
          backgroundColor: "#f0f0f0",
          overflowX: "hidden",
          transition: "0.5s",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <UpdateTodo />
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Grid container spacing={4} sx={{ marginRight: "300px" }}>
        {todos?.map((task: any) => {
          return (
            <Grid key={task.id} item xs={12} sm={12} md={4}>
              <Card
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    <Link
                      to={`/update/${task.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {task.content}
                    </Link>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => handleDelete(task.id)}>Delete</Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
