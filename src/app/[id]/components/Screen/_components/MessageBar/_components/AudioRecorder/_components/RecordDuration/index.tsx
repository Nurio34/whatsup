function RecordDuration({ recordDuration }: { recordDuration: number }) {
  const fixTime = () => {
    const seconds = recordDuration % 60;
    const minutes = Math.floor(recordDuration / 60);

    const secs = seconds >= 10 ? seconds : `0${seconds.toString()}`;
    const mins = minutes >= 10 ? minutes : `0${minutes}`;

    return `${mins}:${secs}`;
  };

  return <div className=" text-sm">{fixTime()}</div>;
}

export default RecordDuration;
