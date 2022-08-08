const color = [
  {
    value: 0,
    bg: "bg-primary",
    border: "border-primary",
    text: "text-primary",
  },
  {
    value: 1,
    bg: "bg-secondary",
    border: "border-secondary",
    text: "text-[#FA9810]",
  },
  {
    value: 2,
    bg: "bg-danger",
    border: "border-danger",
    text: "text-[#E11428]",
  },
  {
    value: 3,
    bg: "bg-success",
    border: "border-success",
    text: "text-[#43936C]",
  },
];

export const changeColor = (id) => {
  const diff = id % 4;
  return color.find((item) => item.value === diff);
};

export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const getPrevAndNext = (activeID, arr, direction) => {
  for (let i = 0; i < arr?.length; i++) {
    if (arr[i]?.id === activeID) {
      return direction === "right" ? arr[i + 1]?.id : arr[i - 1]?.id;
    }
  }
};
