import { MediaType } from "@/type/message";
import FileSaver from "file-saver";

export const saveFile = async (media: MediaType) => {
  const formatArray = media.secure_url.split(".");
  const format = formatArray[formatArray.length - 1];

  try {
    const response = await fetch(media.secure_url);

    const blob = await response.blob();
    const file = new Blob([blob], { type: blob.type });

    FileSaver.saveAs(file, `${media.asset_id}.${format}`);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};
