import { Button, Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../conf/api.conf";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../store/reducers/toast";
import { deleteFromGroups, setCurrentGroup } from "../store/reducers/group";
import GroupRequestList from "../components/group/GroupRequestList";
import GroupMemberList from "../components/group/GroupMemberList";
import GroupThreadList from "../components/group/GroupThreadList";
import { setRequests, addRequest } from "../store/reducers/request";
import { setThreads } from "../store/reducers/thread";

const retrieveGroup = async (groupId) => {
  try {
    const response = await axios.get(`${API_URL}/api/groups/${groupId}`);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

const retrieveGroupRequests = async (groupId) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/groups/${groupId}/requests`
    );
    return response.data["hydra:member"].filter(({ status }) => status === 0);
  } catch (e) {
    console.error(e);
  }
};

const retrieveGroupThreads = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/threads`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
    });
    return response.data["hydra:member"];
  } catch (e) {
    console.error(e);
  }
};

const GroupDetails = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = `Bearer ${localStorage.getItem("TOKEN")}`;

  const [isFiltered, setIsFiltered] = useState(false);

  const loadGroupThreads = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/threads`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      });
      const data = response.data["hydra:member"];
      const filteredData = data.filter(
        ({ relatedGroup }) => relatedGroup === `/api/groups/${groupId}`
      );
      dispatch(setThreads(filteredData));
    } catch (e) {
      console.error(e);
    }
  };
  
  const searchThreads = async (title, content) => {
    if (!title && !content) {
      setIsFiltered(false);
      return;
    }
  
    try {
      const response = await axios.get(`${API_URL}/api/search?title=${title}&content=${content}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      });
      const data = response.data["hydra:member"];
      dispatch(setThreads(data));
      setIsFiltered(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleReset = () => {
    if (isFiltered) {
      loadGroupThreads();
      setIsFiltered(false);
    }
  };

  React.useEffect(() => {
    retrieveGroup(groupId).then((group) => dispatch(setCurrentGroup(group)));
    retrieveGroupRequests(groupId).then((group) =>
      dispatch(setRequests(group))
    );
    retrieveGroupThreads().then((thread) =>
      dispatch(
        setThreads(
          thread.filter(
            ({ relatedGroup }) => relatedGroup === `/api/groups/${groupId}`
          )
        )
      )
    );
  }, [groupId, dispatch]);

  const group = useSelector((state) => state.group.current);
  const requests = useSelector((state) => state.request.requests);
  const threads = useSelector((state) => state.thread.threads);

  const loggedUser = useSelector((state) => state.auth.loggedUser);
  const loggedUserIsOwner =
    loggedUser?.id !== undefined &&
    group?.owner !== undefined &&
    group?.owner === `/api/users/${loggedUser.id}`;

  const loggedUserIsMember =
    loggedUser?.id !== undefined &&
    group?.members !== undefined &&
    group?.members.includes(`/api/users/${loggedUser.id}`);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${API_URL}/api/groups/${groupId}`, {
        headers: { Authorization: token },
      });
      if (response.status !== 204) throw new Error(response.statusText);
      dispatch(deleteFromGroups(group));
      dispatch(
        setToast({
          severity: "success",
          message: "Le groupe a bien été supprimé",
        })
      );
      navigate("/groups");
    } catch (e) {
      dispatch(setToast({ severity: "error", message: e.message }));
      console.error(e);
    }
  };

  const handleClick = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/group_requests`,
        { targetGroup: group["@id"] },
        { headers: { Authorization: token } }
      );
      console.log(response);
      if (response.status !== 201) throw new Error(response.statusText);
      dispatch(addRequest(response.data));
      dispatch(
        setToast({ severity: "success", message: "Une demande a été envoyée" })
      );
    } catch (e) {
      dispatch(setToast({ severity: "error", message: e.message }));
      console.error(e);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ my: 5 }}>
      <Button
        variant="contained"
        size="small"
        onClick={handleClick}
        sx={{ mr: 2 }}
      >
        Faire une requête
      </Button>
      {loggedUserIsOwner && (
        <>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={handleDelete}
          >
            Supprimer le groupe
          </Button>
          <GroupRequestList requests={requests} />
        </>
      )}

      <GroupMemberList members={group.members} />
      {loggedUserIsMember && <GroupThreadList threads={threads} onSearch={searchThreads} onReset={handleReset}/>}
    </Container>
  );
};

export default GroupDetails;
