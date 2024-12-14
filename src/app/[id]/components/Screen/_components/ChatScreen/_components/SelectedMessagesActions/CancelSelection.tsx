import { useChatScreenContext } from "../../Context";

function CancelSelection() {
  const { setIsSelectCheckboxesVisible, setSelectedMessages } =
    useChatScreenContext();

  const cancelSelect = () => {
    setIsSelectCheckboxesVisible(false);
    setSelectedMessages([]);
  };

  return (
    <button
      type="button"
      className=" c-btn bg-[blue] hover:bg-blue-500"
      onClick={cancelSelect}
    >
      Cancel
    </button>
  );
}

export default CancelSelection;
