export const videoDuration = (D: number) => {
  const duration = Math.round(D);

  const seconds = duration % 60;
  const secs = seconds < 10 ? `0${seconds}` : seconds.toString();

  const minutes = Math.floor(duration / 60);
  const mins = minutes < 10 ? `0${minutes}` : minutes.toString();

  return mins + ":" + secs;
};
