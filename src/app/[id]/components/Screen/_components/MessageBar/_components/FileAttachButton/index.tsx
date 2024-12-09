import { ChangeEvent, useState } from "react";
import { RiAttachment2 } from "react-icons/ri";
import MediaMessagePreviewModal from "./_components/MediaMessagePreviewModal";

export type TypeOfMediaType = "image" | "video" | "audio" | "application";
export type MediaPreviewType = { type: string; url: string };

export const typeOfMedia = (file: File): TypeOfMediaType =>
  file.type.split("/")[0] as TypeOfMediaType;

function FileAttachButton() {
  const [mediaPreview, setMediaPreview] = useState<MediaPreviewType[]>([]);
  const [message, setMessage] = useState("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([] as File[]);

  const handleMediaSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setMediaPreview([]);
    const files = e.target.files;

    if (files) {
      const isSingleFile = files.length === 1;

      if (isSingleFile) {
        const file = files[0];

        const type = typeOfMedia(file);
        const url = URL.createObjectURL(file);

        setMediaPreview((prev) => [...prev, { type, url }]);
        setMediaFiles((prev) => [...prev, file]);
      } else {
        const FilesArray = Object.values(files);
        FilesArray.forEach((file) => {
          const type = typeOfMedia(file);
          const url = URL.createObjectURL(file);

          setMediaPreview((prev) => [...prev, { type, url }]);
          setMediaFiles((prev) => [...prev, file]);
        });
      }
    }
  };

  return (
    <div className=" relative">
      <label htmlFor="file" className="cursor-pointer">
        <RiAttachment2 size={20} />
        <input
          type="file"
          hidden
          name="file"
          id="file"
          multiple
          onChange={handleMediaSelect}
        />
      </label>
      {mediaPreview.length > 0 && (
        <MediaMessagePreviewModal
          mediaPreview={mediaPreview}
          message={message}
          setMessage={setMessage}
          setMediaPreview={setMediaPreview}
          mediaFiles={mediaFiles}
          setMediaFiles={setMediaFiles}
        />
      )}
    </div>
  );
}

export default FileAttachButton;
