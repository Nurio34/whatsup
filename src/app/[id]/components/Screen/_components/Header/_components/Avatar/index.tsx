import Image from "next/image";

function Avatar({ avatar }: { avatar: string }) {
  return (
    <figure className=" relative w-10 aspect-square">
      <Image src={avatar} fill alt="avatar" />
    </figure>
  );
}

export default Avatar;
