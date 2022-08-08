import React, { useState } from "react";
import { OptionButton } from "../dropdown/OptionButton";
import { ProgressBar } from "../progress-bar/ProgressBar";

export const ItemCard = ({
  item,
  index,
  length,
  setMode,
  detail,
  moveTask,
  dragTask,
  dropTask,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { progress_percentage, name, id } = item;

  return (
    <div
      className="block max-w-sm bg-neutral rounded-lg border border-neutral p-3"
      onDragStart={(e) => {
        dragTask(e, item);
      }}
      id={id}
      draggable={true}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => dropTask(e, index - 1)}
    >
      <h3 className="text-black font-bold text-[14px] leading-6 ">{name}</h3>
      <div className="border border-dashed border-neutral mt-2" />
      <div className="w-full flex flex-row items-center justify-between my-2 space-x-2">
        <div className="w-4/5">
          <ProgressBar progress={progress_percentage} />
        </div>
        {progress_percentage < 100 ? (
          <span className="w-[10%] text-[12px]">{progress_percentage}%</span>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_835_258)">
              <path
                d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
                fill="#43936C"
              />
              <path
                d="M5.6001 7.89098L7.2001 9.49098L10.2911 6.40002"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_835_258">
                <rect
                  width="16"
                  height="16"
                  fill="white"
                  transform="translate(0 16) rotate(-90)"
                />
              </clipPath>
            </defs>
          </svg>
        )}

        <OptionButton
          cardId={id}
          length={length}
          index={index}
          setShowDropdown={setShowDropdown}
          showDropdown={showDropdown}
          setMode={setMode}
          detail={detail}
          item={item}
          moveTask={moveTask}
        />
      </div>
    </div>
  );
};
