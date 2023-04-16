import { Button, Container } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../conf/api.conf";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../store/reducers/toast";
import { deleteFromGroups } from "../store/reducers/group";
import GroupMembers from "../components/group/GroupMembers";
import GroupRequestList from "../components/group/GroupRequestList";

const GroupDetails = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = `Bearer ${localStorage.getItem("TOKEN")}`;

  const group = useSelector((state) => state.group.groups).find((group) => group["@id"] === `/api/groups/${groupId}`);
  const loggedUser = useSelector((state) => state.auth.loggedUser);
  const loggedUserIsOwner =
    loggedUser?.id !== undefined && group?.owner !== undefined && group?.owner === `/api/users/${loggedUser.id}`;

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${API_URL}/api/groups/${groupId}`, { headers: { Authorization: token } });
      if (response.status !== 204) throw new Error(response.statusText);
      dispatch(deleteFromGroups(group));
      dispatch(setToast({ severity: "success", message: "Le groupe a bien été supprimé" }));
      navigate("/groups");
    } catch (e) {
      dispatch(setToast({ severity: "error", message: e.message }));
      console.error(e);
    }
  };

  return (
    <Container maxWidth="xl">
      {loggedUserIsOwner && (
        <>
          <Button variant="contained" color="error" size="small" onClick={handleDelete}>
            Supprimer le groupe
          </Button>
          <GroupRequestList />
        </>
      )}
      <GroupMembers />
    </Container>
  );
};

export default GroupDetails;
