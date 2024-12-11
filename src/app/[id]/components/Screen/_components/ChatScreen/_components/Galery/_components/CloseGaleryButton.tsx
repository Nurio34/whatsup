import { useAppDispatch } from "@/store/hooks";
import { setCurrenMedias } from "@/store/slices/chat";
import { setIsGaleryOpen } from "@/store/slices/components";
import { GrFormClose } from "react-icons/gr";

function CloseGaleryButton() {
  const dispatch = useAppDispatch();

  const closeGalery = () => {
    dispatch(setIsGaleryOpen(false));
    dispatch(setCurrenMedias(null));
  };

  return (
    <button
      type="button"
      className=" justify-self-end self-start p-1 m-[1vw] border-[1px] border-[red] shadow-md shadow-[red] rounded-full"
      onClick={closeGalery}
    >
      <GrFormClose />
    </button>
  );
}

export default CloseGaleryButton;
