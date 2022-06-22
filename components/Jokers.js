import React from "react";
import { PhoneIcon, UserGroupIcon } from "@heroicons/react/outline";
import toast from "react-hot-toast";

const Jokers = ({
 correctAns,
  fifty,
  jokerFifty,
  setJokerFifty,
  jokerViewer,
  setJokerViewer,
  jokerPhone,
  setJokerPhone,
}) => {
  const Phone = () => {
    jokerPhone &&
      toast(`Arkadaşın Doğru Cevabın - ${correctAns} - olduğunu düşünüyor.`);
    setJokerPhone(false);
  };
  const Viewers = () => {
    jokerViewer &&
      toast(`Seyirci Doğru Cevabın - ${ correctAns} - olduğunu düşünüyor.`);
    setJokerViewer(false);
  };

  const Fifty=()=>{
    jokerFifty &&
      toast(`Kalan şıklar; - ${fifty}- ve -${ correctAns}- `);
      setJokerFifty(false);
  }

  return (
    <div className="flex space-x-6 ">
      <button
        disabled={!jokerFifty}
        onClick={Fifty}
        className={`${
          !jokerFifty && "opacity-20"
        } font-bold text-3xl cursor-pointer`}
      >
        50:50
      </button>

      <button
        onClick={Phone}
        disabled={!jokerPhone}
        className={`${!jokerPhone && "opacity-20"}`}
      >
        <PhoneIcon className="w-10 cursor-pointer " />
      </button>

      <button
        onClick={Viewers}
        disabled={!jokerViewer}
        className={`${!jokerViewer && "opacity-20"}`}
      >
        <UserGroupIcon className="w-10 cursor-pointer" />
      </button>
    </div>
  );
};

export default Jokers;
