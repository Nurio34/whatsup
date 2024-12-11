import { MediaType } from "@/type/message";
import Image from "next/image";
import FileSaver from "file-saver";

function MediasPreviewList({ currentMedias }: { currentMedias: MediaType[] }) {
  console.log(currentMedias);

  const save = async (media: MediaType) => {
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

  return (
    <div className=" flex justify-center overflow-hidden ">
      <ul className=" flex gap-4 py-[1vh]">
        {currentMedias.map((media) => (
          <li
            onClick={() => save(media)}
            key={media.asset_id}
            className=" w-10 md:w-20 aspect-square relative grid place-content-center overflow-hidden "
          >
            {media.format === "jpg" && (
              <Image
                src={media.url}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                alt="image"
              />
            )}
            {media.format === "mp4" && <video src={media.url}></video>}
            {media.format === "mp3" && (
              <Image
                src={"/audio_placeholder.webp"}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                alt="image"
              />
            )}
            {media.resource_type === "raw" && (
              <Image
                src={"/application_placeholder.webp"}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                alt="image"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MediasPreviewList;
