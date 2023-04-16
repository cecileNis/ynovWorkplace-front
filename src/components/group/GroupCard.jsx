import { Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GroupCard = ({ group, img }) => {
  const navigate = useNavigate();

  return (
    <Paper
      onClick={() => navigate(`/groups/${group["@id"].split("/")[3]}`)}
      sx={{
        textAlign: "center",
        position: "relative",
        isolation: "isolate",
        p: 2,
        cursor: "pointer",
        borderRadius: "3px",

        "&::after": {
          content: "''",
          position: "absolute",
          inset: "0",
          background: `linear-gradient(rgb(255 255 255 / 0.6), #fff 70%), url(${img}) center center / cover`,
          filter: "grayscale(100%)",
          zIndex: "-1",
          borderRadius: "3px",
          transition: "filter ease-in 100ms, box-shadow ease-in 100ms",
        },

        "&:hover::after": {
          filter: "grayscale(0%)",
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
        {group.name || "Pas de nom"}
      </Typography>
      <Typography
        sx={{
          px: 2,
          fontSize: "14px",
          opacity: "0.9",
          minHeight: "80px",
        }}
      >
        {group.description || "Pas de description"}
      </Typography>
    </Paper>
  );
};

export default GroupCard;
