import { saveFile } from "@/utils/saveFile";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { useGaleryContext } from "../../Context";

function DownloadButton() {
  const { currentMedia } = useGaleryContext();

  if (currentMedia) {
    return (
      <li>
        <button type="button" onClick={() => saveFile(currentMedia)}>
          <PiDownloadSimpleBold color="white" size={20} />
        </button>
      </li>
    );
  }
}

export default DownloadButton;
