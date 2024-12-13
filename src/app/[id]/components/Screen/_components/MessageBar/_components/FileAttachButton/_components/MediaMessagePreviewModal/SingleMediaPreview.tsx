import Image from "next/image";
import React from "react";
import { MediaPreviewType } from "../..";

function SingleMediaPreview({
  mediaPreview,
}: {
  mediaPreview: MediaPreviewType;
}) {
  return (
    <div
      className=" min-w-80 md:min-w-96 relative aspect-square rounded-lg overflow-hidden
      flex justify-center items-center
    "
    >
      {mediaPreview.type === "image" && (
        <Image
          src={mediaPreview.url}
          fill
          alt="image"
          className="object-contain"
        />
      )}
      {mediaPreview.type === "video" && (
        <video src={mediaPreview.url} className=" max-h-full" controls></video>
      )}
      {mediaPreview.type === "audio" && (
        <audio src={mediaPreview.url} controls></audio>
      )}
      {mediaPreview.type === "application" && (
        <Image src={"/application_placeholder.webp"} fill alt="image" />
      )}
    </div>
  );
}

export default SingleMediaPreview;
