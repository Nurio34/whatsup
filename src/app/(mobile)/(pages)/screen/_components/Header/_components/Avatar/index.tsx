import Image from "next/image";

function Avatar({ avatar }: { avatar: string }) {
  return (
    <figure className=" relative w-10 aspect-square">
      <Image
        src={avatar}
        fill
        alt="avatar"
        sizes="(max-width: 768px) 50vw, 25vw"
      />
    </figure>
  );
}

export default Avatar;
