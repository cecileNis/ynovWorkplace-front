import { Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user, img }) => {
  const navigate = useNavigate();

  return (
    <Paper
      onClick={() => navigate(`/users/${user.id}`)}
      sx={{
        textAlign: "center",
        p: 2,
        cursor: "pointer",
        borderRadius: "3px",

        "&:hover": {
          boxShadow: 4,
        },
      }}
    >
      <Box
        component="img"
        src={img}
        alt="picture"
        sx={{
          aspectRatio: "1 / 1",
          width: "140px",
          border: "4px solid #fff",
          borderRadius: "50%",
          my: "40px",
        }}
      />
      <Typography
        sx={{
          px: 2,
          fontSize: "20px",
          fontWeight: "700",
          opacity: "0.9",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
          mb: 1,
        }}
      >
        {user.email}
      </Typography>
    </Paper>
  );
};

export default UserCard;
