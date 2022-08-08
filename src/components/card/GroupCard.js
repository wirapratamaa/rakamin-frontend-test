import React, { useCallback, useContext, useEffect, useState } from "react";
import { ItemCard } from "./ItemCard";
import { changeColor, getPrevAndNext, isEmpty } from "../../common/helper";
import { deleteData, editData, getData, postData } from "../../api/api-data";
import { ModalTask } from "../popup/ModalTask";
import { Button } from "../button/Button";
import { GlobalState } from "../../context/GlobalState";

export const GroupCard = ({
  taskName,
  desc,
  id,
  index,
  length,
  refreshList,
}) => {
  const {
    loadingSubmit,
    setLoadingSubmit,
    task,
    setTask,
    progress,
    setProgress,
    groupTask,
  } = useContext(GlobalState);
  const [borderColor, setBorderColor] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [listItem, setListItem] = useState([]);
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [mode, setMode] = useState("");
  const [detail, setDetail] = useState({});

  const openModal = () => {
    setIsActiveModal(!isActiveModal);
  };

  const handleTask = (e) => {
    const value = e.target.value;
    setTask(value);
  };
  const handleProgress = (e) => {
    const value = e.target.value;
    if (value.length > 0) {
      setProgress(value);
    } else {
      setProgress("");
    }
  };

  const getListItem = useCallback(() => {
    const url = `/todos/${id}/items`;
    getData(url)
      .then((resp) => {
        setListItem(resp);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, groupTask]);

  const editTask = () => {
    const url = `/todos/${id}/items/${detail?.id}`;
    const payload = {
      target_todo_id: id,
      name: task,
      progress_percentage: progress?.replace(/[^a-zA-Z0-9_-]/g, ""),
    };
    editData(url, payload)
      .then((resp) => {
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const moveTask = useCallback(
    (direction, task_id) => {
      const url = `/todos/${id}/items/${task_id}`;
      const payload = {
        target_todo_id: getPrevAndNext(id, groupTask, direction),
      };
      editData(url, payload)
        .then((resp) => {
          getListItem(id);
          refreshList();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [getListItem, id, groupTask, refreshList]
  );

  const draggingTask = useCallback(
    (todo_id, target_id, task_id) => {
      const url = `/todos/${todo_id}/items/${task_id}`;
      const payload = {
        target_todo_id: groupTask[target_id]?.id,
      };
      editData(url, payload)
        .then((resp) => {
          refreshList();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [groupTask, refreshList]
  );

  const createNewTask = () => {
    const url = `/todos/${id}/items`;
    const payload = {
      name: task,
      progress_percentage: progress?.replace(/[^a-zA-Z0-9_-]/g, ""),
    };
    postData(url, payload)
      .then((resp) => {
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteTask = () => {
    const url = `/todos/${id}/items/${detail.id}`;
    deleteData(url)
      .then((resp) => {
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleMode = (value) => {
    setMode(value);
    openModal();
  };
  const reset = () => {
    setTask("");
    setProgress("");
    setLoadingSubmit(false);
    setIsActiveModal(false);
    getListItem(id);
    setMode("");
    setDetail({});
  };

  //   Drag And Drop Function
  const dragTask = (e, id) => {
    e.dataTransfer.setData("item_id", id.id);
    e.dataTransfer.setData("todo_id", id.todo_id);
  };

  const dropTask = (e, index) => {
    const item_id = e.dataTransfer.getData("item_id");
    const todo_id = e.dataTransfer.getData("todo_id");
    draggingTask(todo_id, index, item_id);
  };

  useEffect(() => {
    getListItem();
  }, [getListItem]);

  useEffect(() => {
    if (!isEmpty(detail)) {
      setTask(detail.name);
      setProgress(detail?.progress_percentage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detail]);

  useEffect(() => {
    setBgColor(changeColor(id)?.bg);
    setBorderColor(changeColor(id)?.border);
    setTextColor(changeColor(id)?.text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div className="p-4">
      <div
        className={`block py-4 px-4 w-full ${bgColor} rounded-lg border ${borderColor} shadow-md`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => dropTask(e, index)}
      >
        <div className="font-bold tracking-tight mb-3">
          <span
            className={`border ${borderColor} ${bgColor} ${textColor} px-4 py-1 rounded-md text-[12px]`}
          >
            {taskName}
          </span>
        </div>
        <div className="text-black my-2 text-[12px]">
          <span>{desc}</span>
        </div>
        <div className="flex flex-col space-y-2">
          {listItem.length > 0 ? (
            listItem?.map((item, i) => (
              <ItemCard
                item={item}
                key={item?.id}
                index={index + 1}
                length={length}
                setMode={handleMode}
                detail={setDetail}
                moveTask={moveTask}
                dragTask={dragTask}
                dropTask={dropTask}
              />
            ))
          ) : (
            <div className="block max-w-sm bg-neutral rounded-lg border border-neutral p-2">
              <h3 className="text-black font-bold text-[14px] leading-6 ">
                No Task
              </h3>
            </div>
          )}
        </div>
        <button
          className="mt-3"
          onClick={() => {
            openModal();
            setMode("Create Task");
          }}
        >
          <div className="flex flex-row space-x-2 items-center">
            <div className="circle"></div>
            <span className="text-[12px]">New Task</span>
          </div>
        </button>
      </div>

      {/* Modal Task */}
      <ModalTask isActive={isActiveModal} close={openModal} title={mode}>
        {mode === "Create Task" ? (
          <div className="flex flex-col px-6 pb-6 space-y-2">
            <div className="">
              <label htmlFor="task-name" className="text-[12px]">
                Task Name
              </label>
              <div className="">
                <input
                  type="text"
                  placeholder="Type your Task"
                  value={task}
                  onChange={(e) => handleTask(e)}
                  className="border rounded-lg w-full py-2 px-4 placeholder:text-[12px] placeholder:opacity-50 text-[12px]"
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="task-name" className="text-[12px]">
                Progress
              </label>
              <div className="">
                <input
                  type="text"
                  value={progress}
                  onChange={(e) => handleProgress(e)}
                  placeholder="70%"
                  className="border rounded-lg w-1/3 py-2 px-4 placeholder:text-[12px] text-[12px] placeholder:opacity-50"
                />
              </div>
            </div>
            <div className="mt-2">
              <Button
                color={"bg-[#01959F]"}
                text="Save Task"
                close={reset}
                confirm={() => createNewTask()}
                loading={loadingSubmit}
              />
            </div>
          </div>
        ) : mode === "Edit Task" ? (
          <div className="flex flex-col px-6 pb-6 space-y-2">
            <div className="">
              <label htmlFor="task-name" className="text-[12px]">
                Task Name
              </label>
              <div className="">
                <input
                  type="text"
                  placeholder="Type your Task"
                  value={task}
                  onChange={(e) => handleTask(e)}
                  className="border rounded-lg w-full py-2 px-4 placeholder:text-[12px] placeholder:opacity-50 text-[12px]"
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="task-name" className="text-[12px]">
                Progress
              </label>
              <div className="">
                <input
                  type="text"
                  value={progress}
                  onChange={(e) => handleProgress(e)}
                  placeholder="70%"
                  className="border rounded-lg w-1/3 py-2 px-4 placeholder:text-[12px] text-[12px] placeholder:opacity-50"
                />
              </div>
            </div>
            <div className="mt-2">
              <Button
                color={"bg-[#01959F]"}
                text="Save Change"
                close={reset}
                confirm={() => editTask()}
                loading={loadingSubmit}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col px-6 pb-6 space-y-2">
            <div className="">
              <span className="text-[14px] font-medium">
                Are you sure want to delete this task? your action can’t be
                reverted.
              </span>
            </div>
            <div className="mt-2">
              <Button
                color={"bg-[#E11428]"}
                text="Delete"
                close={reset}
                confirm={() => deleteTask()}
                loading={loadingSubmit}
              />
            </div>
          </div>
        )}
      </ModalTask>
    </div>
  );
};
