import React from "react";
import { Box } from "@mui/material";
type Prop = {
  text: string;
};
const NoItemMessage = ({ text }: Prop) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "10px",
      }}
    >
      {text}
    </Box>
  );
};

export default NoItemMessage;
