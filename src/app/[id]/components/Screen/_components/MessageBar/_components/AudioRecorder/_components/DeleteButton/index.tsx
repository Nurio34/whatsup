import { RiDeleteBinLine } from "react-icons/ri";

function DeleteButton({ onDelete }: { onDelete: () => void }) {
  return (
    <button type="button" className=" py-1 px-2" onClick={onDelete}>
      <RiDeleteBinLine size={24} />
    </button>
  );
}

export default DeleteButton;
