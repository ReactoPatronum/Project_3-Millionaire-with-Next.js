import { useState } from "react";
import { motion } from "framer-motion";

export const moneyReward = [
  { id: 1, amount: "₺ 100" },
  { id: 2, amount: "₺ 200" },
  { id: 3, amount: "₺300" },
  { id: 4, amount: "₺ 500" },
  { id: 5, amount: "₺ 1.000" },
  { id: 6, amount: "₺ 2.000" },
  { id: 7, amount: "₺ 4.000" },
  { id: 8, amount: "₺ 8.000" },
  { id: 9, amount: "₺ 16.000" },
  { id: 10, amount: "₺ 32.000" },
  { id: 11, amount: "₺ 64.000" },
  { id: 12, amount: "₺ 125.000" },
  { id: 13, amount: "₺ 250.000" },
  { id: 14, amount: "₺ 500.000" },
  { id: 15, amount: "₺ 1.000.000" },
];

const Rewards = ({ reward, setEndGame,name}) => {
  const [leave, setLeave] = useState(false);

  return (
    <motion.div initial={{x:500}} animate={{x:0}} className="hidden sm:block  min-w-[300px] text-white  p-6 text-lg ">
      <div>
        <h2 className="font-semibold">Yarışmacımız:&nbsp;<span className="font-bold text-g">{name.slice(0,13)}</span></h2>
      </div>
     

      {leave ? (
        <motion.div initial={{scale:0.3,x:200}} animate={{scale:1.3,x:0} } className="absolute top-[40%] left-[40%] p-10 bg-gray-800 rounded-md border-4  font-semibold text-2xl border-[#805AB9]   space-y-4 flex flex-col items-center justify-center">
          <h1>Emin misiniz?</h1>
         <div className="space-x-3">
         <button className="bg-blue-700 px-3 py-1 hover:bg-red-500 transition-all duration-200" onClick={() => setEndGame(false)}>Evet</button>
          <button className="bg-blue-700 px-3 py-1 hover:bg-red-500 transition-all duration-200" onClick={() => setLeave(false)}>Hayır</button>
         </div>
        </motion.div>
      ) : (
        ""
      )}
      <ul className="space-y-1 min-w-[150px] ">
        {moneyReward.map(({ id, amount }) => (
          <div
            className={`${
              id == reward +1 && "bg-orange-500 h-10 rounded-md"
            } flex items-center justify-between`}
            key={id}
          >
            <p>{id}</p>
            <li>{amount}</li>
          </div>
        ))}
      </ul>
      <div className=" mt-3">
        <button
          className="transition-all duration-200 hover:text-red-400 text-xl font-semibold"
          onClick={() => setLeave(true)}
        >
          Çekilmek istiyorum
        </button>

       
      </div>
    </motion.div>
  );
};

export default Rewards;
