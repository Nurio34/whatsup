import { useAppDispatch } from "@/store/hooks";
import { setCurrenMedias } from "@/store/slices/chat";
import { setIsGaleryOpen } from "@/store/slices/components";
import { TbArrowBack } from "react-icons/tb";

function CloseGaleryButton() {
  const dispatch = useAppDispatch();

  const closeGalery = () => {
    dispatch(setIsGaleryOpen(false));
    dispatch(setCurrenMedias(null));
  };

  return (
    <button
      type="button"
      className="p-[1px] m-[1vw] shadow-md "
      onClick={closeGalery}
    >
      <TbArrowBack color="white" size={24} />
    </button>
  );
}

export default CloseGaleryButton;
