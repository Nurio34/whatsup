import { useAppSelector } from "@/store/hooks";
import { selectCurrentMedias } from "@/store/slices/chat";
import { useGaleryContext } from "../../Context";

function Status() {
  const currentMedias = useAppSelector(selectCurrentMedias);
  const { currentMediaIndex } = useGaleryContext();

  if (currentMedias) {
    const length = currentMedias.length;
    const index = currentMediaIndex + 1;
    return (
      <div className=" text-white text-sm">
        {index}
        <span className=" text-lg"> / </span>
        {length}
      </div>
    );
  }
}

export default Status;
