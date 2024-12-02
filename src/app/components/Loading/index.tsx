import { Hourglass } from "react-loader-spinner";

function Loading({ message }: { message: string }) {
  return (
    <div className="w-full min-h-96 grid place-content-center justify-items-center gap-y-[1vh]">
      <Hourglass ariaLabel="hourglass-loading" />
      <p>Please wait ...</p>
      <p>Getting your {message}.</p>
    </div>
  );
}

export default Loading;
