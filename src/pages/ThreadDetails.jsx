import { Button, Container, Typography, TextField, Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { API_URL } from "../conf/api.conf";
import { setCurrentThread } from "../store/reducers/thread";
import { addMessage, setMessages } from "../store/reducers/message";

const ThreadDetails = () => {
  const dispatch = useDispatch();
  const { threadId } = useParams();
  const thread = useSelector((state) => state.thread.current);
  const messages = useSelector((state) => state.message.messages);

  const messageRef = useRef("");

  const send = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/api/messages`,
        { content: messageRef.current.value, thread: thread["@id"] },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          },
        }
      );
      dispatch(addMessage(response.data));
    } catch (err) {}
  };

  useEffect(() => {
    (async () => {
      try {
        const threadResponse = await axios.get(
          `${API_URL}/api/threads/${threadId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
            },
          }
        );

        if (threadResponse.status !== 200)
          throw new Error(threadResponse.statusText);

        dispatch(setCurrentThread(threadResponse.data));

        const messagesResponse = await axios.get(
          `${API_URL}/api/threads/${threadId}/messages`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
            },
          }
        );

        if (messagesResponse.status !== 200)
          throw new Error(messagesResponse.statusText);
        dispatch(setMessages(messagesResponse.data["hydra:member"]));
      } catch (e) {}
    })();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4">{thread?.title}</Typography>
      {messages.map((message) => (
        <Paper key={message["@id"]}>
          <Typography variant="h6">{message.owner}</Typography>
          <Typography>{message.content}</Typography>
        </Paper>
      ))}
      <Paper
        sx={{
          p: 2,
          display: "flex",
          gap: 2,
        }}
        component="form"
        onSubmit={send}
      >
        <TextField
          inputRef={messageRef}
          sx={{
            width: "100%",
          }}
        />
        <Button type="submit" variant="contained">
          Envoyer
        </Button>
      </Paper>
    </Container>
  );
};

export default ThreadDetails;
