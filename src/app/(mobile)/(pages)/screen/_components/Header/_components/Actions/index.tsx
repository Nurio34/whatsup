import { PiPhoneCall, PiVideoCamera } from "react-icons/pi";
import { TbSearch } from "react-icons/tb";

function Actions() {
  return (
    <ul className=" flex items-center gap-[0.5vw]">
      <li>
        <button
          type="button"
          className=" transition-all p-[0.5vw] hover:bg-gray-200 rounded-md"
        >
          <PiVideoCamera size={24} />
        </button>
      </li>
      <li>
        <button
          type="button"
          className=" transition-all p-[0.5vw] hover:bg-gray-200 rounded-md"
        >
          <PiPhoneCall size={24} />
        </button>
      </li>
      <li>
        <button
          type="button"
          className=" transition-all p-[0.5vw] hover:bg-gray-200 rounded-md"
        >
          <TbSearch size={24} />
        </button>
      </li>
    </ul>
  );
}

export default Actions;
