import CloseGaleryButton from "./CloseGaleryButton";
import DownloadButton from "./DownloadButton";
import Status from "./Status";

function ActionButtons() {
  return (
    <div
      className="py-[1vh] px-[2vw]
    flex justify-between items-center
    "
    >
      <CloseGaleryButton />
      <Status />
      <div>
        <DownloadButton />
      </div>
    </div>
  );
}

export default ActionButtons;
