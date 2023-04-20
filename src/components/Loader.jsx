import { Box } from "@mui/material";
import img from "../assets/loading.webp";

const Loader = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: "0",
        display: "flex",
      }}
    >
      <Box
        component="img"
        src={img}
        m="auto"
        sx={{
          width: "300px",
        }}
      />
    </Box>
  );
};

export default Loader;
