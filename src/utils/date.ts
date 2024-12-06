export const date = (D: Date) => {
  return D.toString()
    .split("T")[0]
    .split("-")
    .reduce(
      (arr, item, index) => {
        if (index === 0) {
          arr[2] = item;
        } else if (index === 2) {
          arr[0] = item;
        } else {
          arr[1] = item;
        }
        return arr;
      },
      ["YYYY", "MM", "DD"]
    )
    .join("-");
};
