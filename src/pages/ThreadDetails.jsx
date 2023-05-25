import { Button, Container, Typography, TextField, Paper, Box, Link } from "@mui/material";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link as RouterLink } from "react-router-dom";
import { API_URL } from "../conf/api.conf";
import { setCurrentThread } from "../store/reducers/thread";
import { addMessage, setMessages } from "../store/reducers/message";
import { setToast } from "../store/reducers/toast";
import socketIOClient from "socket.io-client";

const ThreadDetails = () => {
  const dispatch = useDispatch();
  const { threadId, groupId } = useParams();
  const thread = useSelector((state) => state.thread.current);
  const messages = useSelector((state) => state.message.messages);
  const loggedUser = useSelector((state) => state.auth.loggedUser);

  const ENDPOINT = "http://127.0.0.1:4001";
  const socket = socketIOClient(ENDPOINT);

  const messageRef = useRef("");

  const send = async (e) => {
    e.preventDefault();
    try {
      const data = { content: messageRef.current.value, owner: loggedUser["@id"], thread: thread["@id"] };

      const response = await axios.post(`${API_URL}/api/messages`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
      socket.emit("message add", data);
      dispatch(addMessage(response.data));
    } catch (err) {
      dispatch(setToast({ severity: "error", message: err.message }));
    }
  };

  useEffect(() => {
    socket.on("new message", (data) => {
      dispatch(setMessages(data));
    });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const threadResponse = await axios.get(`${API_URL}/api/threads/${threadId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          },
        });

        if (threadResponse.status !== 200) throw new Error(threadResponse.statusText);

        dispatch(setCurrentThread(threadResponse.data));

        const messagesResponse = await axios.get(`${API_URL}/api/threads/${threadId}/messages`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          },
        });

        if (messagesResponse.status !== 200) throw new Error(messagesResponse.statusText);

        dispatch(setMessages(messagesResponse.data["hydra:member"]));
        socket.emit("messages init", messagesResponse.data["hydra:member"]);
      } catch (err) {
        dispatch(setToast({ severity: "error", message: err.message }));
      }
    })();
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4">{thread?.title}</Typography>
      <Link component={RouterLink} to={`/groups/${groupId}`}>
        Retourner à la page du groupe
      </Link>
      <Paper
        sx={{
          p: 1,
          overflowY: "scroll",
          minHeight: "100%",
        }}
      >
        {messages.map((message) => (
          <Box
            sx={{
              overflow: "hidden",
            }}
            key={message["@id"]}
          >
            <Box
              sx={{
                p: 1,
                mb: 2,
                border: "1px solid rgba(0, 0, 0, 0.2)",
              }}
            >
              <Typography variant="body2" gutterBottom>
                {message.owner} a dit :{" "}
              </Typography>
              <Typography sx={{ mb: 2 }}>{message.content}</Typography>
            </Box>
          </Box>
        ))}
      </Paper>
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
