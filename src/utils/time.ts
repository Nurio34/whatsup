export const time = (T: Date) => {
  return T.toString()
    .split("T")[1]
    .split(":")
    .filter((item, index) => index <= 1)
    .join(":");
};
