import React from "react";
import { Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../store/reducers/toast";

const Toast = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.toast.data);

  React.useEffect(() => {
    setTimeout(() => dispatch(setToast(null)), 5000);
  }, [data]);

  return (
    data && (
      <Alert
        sx={{
          position: "fixed",
          top: 2,
          right: 2,
        }}
        severity={data?.severity}
      >
        {data?.message}
      </Alert>
    )
  );
};

export default Toast;
