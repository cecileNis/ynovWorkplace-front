import { Container, Typography, Paper } from "@mui/material";

const ThreadDetails = () => {
  const title = "azeazeaze";
  const messages = [];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4">{title}</Typography>
      {messages.map((message) => (
        <Paper key={message["@id"]}>
          <Typography variant="h6">{message.owner}</Typography>
          <Typography>{message.content}</Typography>
        </Paper>
      ))}
    </Container>
  );
};

export default ThreadDetails;
