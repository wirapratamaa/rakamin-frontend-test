import React from "react";

export const ModalTask = ({ isActive, close, children, title }) => {
  return (
    <div className={isActive ? "block" : "hidden"}>
      <div
        tabIndex="-1"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center flex bg-black/50"
        aria-modal="true"
        role="dialog"
        onClick={() => close()}
      >
        <div
          className="relative p-4 w-full max-w-md h-full md:h-auto"
          onClick={(e) => {
            e.preventDefault(e);
            e.stopPropagation(e);
          }}
        >
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex flex-row justify-between items-center p-6">
              <div className="text-[18px] leading-7 font-bold flex items-center space-x-3">
                {title === "Delete Task" && (
                  <span>
                    <svg
                      width="20"
                      height="18"
                      viewBox="0 0 20 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 7V9M10 13H10.01M3.07183 17H16.9282C18.4678 17 19.4301 15.3333 18.6603 14L11.7321 2C10.9623 0.666667 9.03778 0.666667 8.26798 2L1.33978 14C0.56998 15.3333 1.53223 17 3.07183 17Z"
                        stroke="#E11428"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
                <span>{title}</span>
              </div>
              <div className="relative">
                <button
                  type="button"
                  className=" text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                  data-modal-toggle="popup-modal"
                  onClick={() => close()}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
