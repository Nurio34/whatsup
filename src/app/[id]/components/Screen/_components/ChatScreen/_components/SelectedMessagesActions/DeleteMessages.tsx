import { RiDeleteBinFill } from "react-icons/ri";
import { useChatScreenContext } from "../../Context";
import axiosInstance from "@/axios";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/user";
import toast from "react-hot-toast";
import { selectSelectedConnection } from "@/store/slices/chat";

function DeleteMessages() {
  const user = useAppSelector(selectUser);
  const userId = user?.id;

  const selectedConnection = useAppSelector(selectSelectedConnection);
  const connectionId = selectedConnection?._id;

  const {
    selectedMessages,
    socketState,
    setIsDeleteLoading,
    isDeleteLoading,
    setIsSelectCheckboxesVisible,
    setSelectedMessages,
  } = useChatScreenContext();

  const deleteMessages = async () => {
    if (selectedMessages.length > 0) {
      if (!selectedMessages.every((msg) => msg.senderId === userId)) {
        return toast.error("You can delete only your messages");
      }

      setIsDeleteLoading(true);

      try {
        const response = await axiosInstance.delete(`/chat/delete-messages`, {
          data: selectedMessages,
        });

        if (response.data.status === "success") {
          if (socketState && userId && connectionId) {
            socketState.emit("delete-messages", {
              userId,
              connectionId,
              messages: selectedMessages,
            });
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsDeleteLoading(false);
        setIsSelectCheckboxesVisible(false);
        setSelectedMessages([]);
      }
    }
  };

  return (
    <button
      type="button"
      className="transition-all rounded-md hover:bg-gray-200 p-2"
      onClick={deleteMessages}
    >
      {isDeleteLoading ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        <RiDeleteBinFill size={24} />
      )}
    </button>
  );
}

export default DeleteMessages;
