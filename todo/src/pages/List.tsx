import { Link } from "react-router-dom";
import { useTodo } from "../hooks";
import { AddTodo } from "./AddTodo";
import { Grid, Card, CardContent, Typography } from "@mui/material";

export const List = () => {
  const { data, isLoading, error, isError } = useTodo();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <AddTodo />
      </Grid>
      {data.map((task: any) => {
        return (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: "black" }}>
                  <Link
                    to={`/update/${task.id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {task.content}
                  </Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
