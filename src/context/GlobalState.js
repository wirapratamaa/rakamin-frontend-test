import { createContext, useState } from "react";

export const GlobalState = createContext();

const GlobalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [groupTask, setGroupTask] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");

  const [loadingSubmit, setLoadingSubmit] = useState(false);
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
      }}
    >
      {children}
    </GlobalState.Provider>
  );
};

export default GlobalProvider;
