import React from "react";

export const Button = ({ text, color, confirm, close, loading }) => {
  return (
    <div className="flex justify-end space-x-2">
      <button
        className="border border-[#E0E0E0] rounded-lg bg-white text-black py-1 px-3 text-[14px]"
        onClick={() => close()}
      >
        Cancel
      </button>
      <button
        className={"text-white text-[14px] rounded-lg py-1 px-3 " + color}
        onClick={() => confirm()}
        disabled={loading}
      >
        {!loading ? text : "Process..."}
      </button>
    </div>
  );
};
