import { useChatScreenContext } from "../../Context";

function SelectedMessagesActions() {
  const { isSelectCheckboxesVisible, selectedMessages } =
    useChatScreenContext();

  return (
    <>
      {isSelectCheckboxesVisible && (
        <div className=" fixed z-20 w-full bg-white shadow-md border py-[1vh] px-[2vw]">
          <div className=" font-semibold">
            {" "}
            {selectedMessages.length} Selected
          </div>
        </div>
      )}
    </>
  );
}

export default SelectedMessagesActions;
