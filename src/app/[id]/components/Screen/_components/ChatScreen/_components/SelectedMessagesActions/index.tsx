import { useChatScreenContext } from "../../Context";
import CancelSelection from "./CancelSelection";
import DeleteMessages from "./DeleteMessages";

function SelectedMessagesActions({ width }: { width: number }) {
  const { isSelectCheckboxesVisible, selectedMessages } =
    useChatScreenContext();

  return (
    <>
      {isSelectCheckboxesVisible && (
        <div
          className=" fixed z-20 w-full bg-white shadow-md border py-[1vh] px-[2vw]
          flex justify-between items-center
        "
          style={{ width }}
        >
          <div className=" font-semibold">
            {selectedMessages.length} Selected
          </div>
          <div className=" flex items-center gap-4">
            <DeleteMessages />
            <CancelSelection />
          </div>
        </div>
      )}
    </>
  );
}

export default SelectedMessagesActions;
