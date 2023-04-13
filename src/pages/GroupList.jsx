import { Box, Container, Paper, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

const GroupList = () => {
  const groups = useSelector((state) => state.group.groups);

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 5,
      }}
    >
      <Typography component="h1" variant="h3" gutterBottom>
        Groupes
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          "& > *": {
            flex: "1 1 320px",
          },
        }}
      >
        {groups.map((group) => (
          <Paper sx={{ p: 2 }}>
            <Typography gutterBottom component="p" variant="h6">
              {group.name}
            </Typography>
            <Typography gutterBottom>{group.description}</Typography>
            <Link
              component={RouterLink}
              to={`/groups/${group["@id"].split("/")[3]}`}
            >
              Détails
            </Link>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default GroupList;
