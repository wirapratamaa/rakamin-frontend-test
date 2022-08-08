import React, { useCallback, useContext, useEffect } from "react";
import { getData, postData, signIn } from "../api/api-data";
import { Button } from "../components/button/Button";
import { GroupCard } from "../components/card/GroupCard";
import { ModalTask } from "../components/popup/ModalTask";
import { GlobalState } from "../context/GlobalState";

const Home = () => {
  const {
    isOpen,
    setIsOpen,
    groupTask,
    setGroupTask,
    groupName,
    setGroupName,
    groupDesc,
    setGroupDesc,
  } = useContext(GlobalState);

  const openModal = () => {
    setIsOpen(!isOpen);
  };
  const handleGroupName = (e) => {
    const name_group = e.target.value;
    setGroupName(name_group);
  };
  const handleGroupDesc = (e) => {
    const description = e.target.value;
    setGroupDesc(description);
  };

  const submitNewGroup = () => {
    const url = "/todos";
    const payload = {
      title: groupName,
      description: groupDesc,
    };
    postData(url, payload)
      .then((resp) => {
        reset();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getGroupTask = useCallback(() => {
    const url = "/todos";
    getData(url)
      .then((resp) => {
        setGroupTask(resp);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = () => {
    setIsOpen(false);
    setGroupName("");
    setGroupDesc("");
    getGroupTask();
  };

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

  useEffect(() => {
    getGroupTask();
  }, [getGroupTask]);

  return (
    <>
      <div className="border border-[#E0E0E0] h-16 flex items-center space-x-3">
        <span className="text-[18-px] font-bold ml-5">Product Roadmap</span>
        <button
          className="bg-[#01959F] text-[12px] rounded-md text-white py-1 px-2 flex items-center space-x-2"
          onClick={() => openModal()}
        >
          <span className="plus"></span>
          <span>Add New Group</span>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {groupTask.map((item, i) => (
          <GroupCard
            key={item.id}
            taskName={item.title}
            desc={item.description}
            id={item.id}
            index={i}
            length={groupTask?.length}
            list={groupTask}
            refreshList={getGroupTask}
          />
        ))}
      </div>

      {/* Modal Add group task */}
      <ModalTask isActive={isOpen} close={openModal} title={"Add Group"}>
        <div className="flex flex-col px-6 pb-6 space-y-2">
          <div className="">
            <label htmlFor="task-name" className="text-[12px]">
              Group Name
            </label>
            <div className="">
              <input
                type="text"
                placeholder="Type your Group name"
                value={groupName}
                onChange={(e) => handleGroupName(e)}
                className="border rounded-lg w-full py-2 px-4 placeholder:text-[12px] placeholder:opacity-50 text-[12px]"
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="task-name" className="text-[12px]">
              Description
            </label>
            <div className="">
              <input
                type="text"
                value={groupDesc}
                onChange={(e) => handleGroupDesc(e)}
                placeholder="January - March"
                className="border rounded-lg w-full py-2 px-4 placeholder:text-[12px] text-[12px] placeholder:opacity-50"
              />
            </div>
          </div>
          <div className="mt-2">
            <Button
              color={"bg-[#01959F]"}
              text="Save"
              close={reset}
              confirm={() => submitNewGroup()}
            />
          </div>
        </div>
      </ModalTask>
    </>
  );
};

export default Home;
