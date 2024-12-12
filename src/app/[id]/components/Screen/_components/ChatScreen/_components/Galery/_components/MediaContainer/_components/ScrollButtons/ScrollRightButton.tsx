import { LiaChevronRightSolid } from "react-icons/lia";
import { useGaleryContext } from "../../../../Context";

function ScrollRightButton() {
  const { nextMedia } = useGaleryContext();
  const onClick = () => {
    nextMedia();
  };

  return (
    <button
      type="button"
      className=" absolute top-1/2 right-[1vw] -translate-y-1/2 py-[4vh]"
      onClick={onClick}
    >
      <LiaChevronRightSolid color="white" size={24} />
    </button>
  );
}

export default ScrollRightButton;
