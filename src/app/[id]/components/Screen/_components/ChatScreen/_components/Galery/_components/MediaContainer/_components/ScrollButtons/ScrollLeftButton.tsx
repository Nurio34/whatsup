import { LiaChevronLeftSolid } from "react-icons/lia";
import { useGaleryContext } from "../../../../Context";

function ScrollLeftButton() {
  const { previouseMedia } = useGaleryContext();

  const onClick = () => {
    previouseMedia();
  };

  return (
    <button
      type="button"
      className=" absolute top-1/2 left-[1vw] -translate-y-1/2 py-[4vh]"
      onClick={onClick}
    >
      <LiaChevronLeftSolid color="white" size={24} />
    </button>
  );
}

export default ScrollLeftButton;
