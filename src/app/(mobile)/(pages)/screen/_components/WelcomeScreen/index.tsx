import Image from "next/image";

function WelcomeScreen() {
  return (
    <div className=" w-full h-full grid place-content-center justify-items-center gap-y-[1vh] ">
      <figure className=" relative w-28 aspect-square rounded-full overflow-hidden">
        <Image
          src={"/whatsapp.gif"}
          fill
          alt="whatsapp logo"
          sizes="(max-width: 768px) 50vw, 25vw"
          priority
        />
      </figure>
      <h1
        className=" text-2xl font-bold font-serif"
        style={{ fontVariant: "small-caps" }}
      >
        Welcome to Whatsup
      </h1>
      <p className=" text-xl font-semibold text-gray-800">
        Your messages are just a tap away.
      </p>
      <ul className=" list-disc list-inside text-gray-600">
        <li>Send and receive messages instantly.</li>
        <li>Stay connected with friends and family.</li>
        <li>Your chats are private and secure.</li>
      </ul>
    </div>
  );
}

export default WelcomeScreen;
