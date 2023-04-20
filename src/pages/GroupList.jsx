import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import GroupCard from "../components/group/GroupCard";

const GroupList = () => {
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.auth.loggedUser);
  const groups = useSelector((state) => state.group.groups);

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 5,
      }}
    >
      <Typography component="h1" variant="h4" sx={{ my: 5 }}>
        Échangez avec votre communauté
      </Typography>
      {loggedUser && (
        <Button onClick={() => navigate("/groups/create")} sx={{ mb: 5 }} variant="contained" size="small">
          Je crée un groupe de discussion
        </Button>
      )}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          justifyContent: "space-between",
          gap: 5,
        }}
      >
        {groups.map((group, i) => (
          <GroupCard key={group["@id"]} group={group} img={`https://source.unsplash.com/collection/${i}/200x200`} />
        ))}
      </Box>
    </Container>
  );
};

export default GroupList;
