export const copyMessage = (message: string) => {
  navigator.clipboard.writeText(message);
};
