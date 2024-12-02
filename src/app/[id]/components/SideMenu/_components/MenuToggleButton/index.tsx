import { useAppDispatch } from "@/store/hooks";
import { setIsSideMenuOpen } from "@/store/slices/components";
import { TbMenuDeep } from "react-icons/tb";

function MenuToggleButton({ isSideMenuOpen }: { isSideMenuOpen: boolean }) {
  const dispatch = useAppDispatch();

  return (
    <>
      <button
        id="MenuToggleButton"
        type="button"
        className={`absolute top-0 right-0 translate-x-full bg-[rgba(7,230,118)] rounded-br-md
          md:hidden 
          ${isSideMenuOpen && "hidden"}  
        `}
        onClick={() => dispatch(setIsSideMenuOpen(true))}
      >
        {<TbMenuDeep size={28} color="white" />}
      </button>
    </>
  );
}

export default MenuToggleButton;
