import { createContext, useEffect, useState } from "react";
import { signIn } from "../api/api-data";

export const GlobalState = createContext();

const GlobalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [groupTask, setGroupTask] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const [task, setTask] = useState("");
  const [progress, setProgress] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    const payload = {
      email: "wirapratama758@gmail.com",
      password: "password",
    };
    signIn("/auth/login", payload)
      .then((resp) => {
        localStorage.setItem("token", resp.auth_token);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <GlobalState.Provider
      value={{
        isOpen,
        setIsOpen,
        groupTask,
        setGroupTask,
        groupName,
        setGroupName,
        groupDesc,
        setGroupDesc,
        loadingSubmit,
        setLoadingSubmit,
        task,
        setTask,
        progress,
        setProgress,
      }}
    >
      {children}
    </GlobalState.Provider>
  );
};

export default GlobalProvider;
