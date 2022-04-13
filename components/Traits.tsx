import Image from "next/image";
import React from "react";
import rewardBadge from "../public/user images/reward-badge.png";

type TraitProps = {
  trait: string;
  description: string;
};

type Props = {
  type: boolean;
  traits: TraitProps[];
};

const Positive = ({ traits }: { traits: TraitProps[] }) => {
  return (
    <div className="flex flex-col drop-shadow-xl items-start w-full px-9 py-8 top-0 border-2 border-white rounded-3xl bg-white/70 backdrop-blur-[63px] p-12">
      <div className="relative self-center mb-4 w-[76px] h-[89px]">
        <Image
          src={rewardBadge}
          alt="reward badge"
          layout="fill"
          objectFit="contain"
        />
      </div>

      {traits.map((trait, index) => (
        <p key={index} className="text-gray-500 mb-4">
          <span className="font-bold text-gray-600">{trait.trait} -</span>{" "}
          {trait.description}
        </p>
      ))}
    </div>
  );
};

const Negative = () => {
  return <div>negative</div>;
};

const Traits = ({ type, traits }: Props) => {
  if (type) return <Positive traits={traits} />;

  return <Negative />;
};

export default Traits;
