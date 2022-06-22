import React, { useEffect, useState, useRef } from "react";
import { Questions } from "./Questions";
import Rewards from "./Rewards";
import Timer from "./Timer";
import { moneyReward } from "./Rewards";
import useSound from "use-sound";
import Jokers from "./Jokers";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";



const GameUI = ({ setHome, name }) => {
  const [correctAns] = useSound("/sounds/correct.mp3");
  const [falseAns] = useSound("/sounds/wrong.mp3");
  const [wait, { stop }] = useSound("/sounds/wait.mp3");
  const [next, setNext] = useState(0); //move to next question
  const [trueAnswer, setTrueAnswer] = useState(""); //if true changing color to green
  const [falseAnswer, setFalseAnswer] = useState(""); //if false changing color to red
  const [selectedAns, setSelectedAns] = useState(false); //if true disables other buttons while checking the answer
  const [endGame, setEndGame] = useState(true); //if false gameover
  const [reward, setReward] = useState(0); //User's money price
  const [jokerFifty, setJokerFifty] = useState(true); //fifty fifty joker
  const [jokerViewer, setJokerViewer] = useState(true); //viewer joker
  const [jokerPhone, setJokerPhone] = useState(true); //phone joker

  const timerId = useRef(); //for stop interval

  //checking answer true or false
  const Check = (option) => {
    stopTimer();
    setSelectedAns(true);
    if (Questions[next].options[Questions[next].answer] === option) {
      setTimeout(() => {
        correctAns();
      }, 1750);
      setTrueAnswer(option);
      setTimeout(() => {
        setNext((prev) => prev + 1);
      }, 5000);
    } else {
      setFalseAnswer(option);
      setTimeout(() => {
        falseAns();
      }, 1750);
      setTimeout(() => {
        setEndGame(false);
      }, 5000);
    }
  };
  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
  };
  //resets selected ans so user can now interact with buttons when get the next question
  useEffect(() => {
    if(reward==14)return setEndGame(false)
    setReward((prev) => prev + 1);
    setSelectedAns(false);
  }, [next]);

  //resets the game
  useEffect(() => {
    setFalseAnswer("");
    setTrueAnswer("");
    setSelectedAns(false);
    setNext(0);
    setJokerFifty(true);
    setJokerPhone(true);
    setJokerViewer(true);
    endGame && setReward(0); //reward=0 if endgame is true only otherwise
    //the prize will be always $100
  }, [endGame]);

  //music plays/stops
  useEffect(() => {
    wait();
    if (endGame === false) {
      stop();
    } else {
      wait();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endGame, wait]);
  
  const Reward = () => {
    if (moneyReward[reward].amount == "₺ 100") return "₺ 0";
    else if (moneyReward[reward].amount == "₺ 200") return "₺ 100";
    else if (moneyReward[reward].amount == "₺ 500.000") return "₺ 500.000";
    else if (moneyReward[reward].amount == "₺ 1.000.000" ) return "₺ 1.000.000";
    else return moneyReward[reward - 2].amount;
  };
  return endGame ? (
    <div className=" col-span-6   text-black p-3 flex">
      <div>
        <Toaster />
      </div>
      <motion.div
        initial={{ x: -500 }}
        animate={{ x: 0 }}
        className="space-y-6 flex flex-col "
      >
        <div className="flex items-center space-x-10">
          <div className="text-xl font-bold rounded-full bg-[#061A48]  h-20 w-20 flex items-center justify-center text-white border-4 border-orange-400">
            <Timer
              timerId={timerId}
              next={next}
              setEndGame={setEndGame}
              falseAns={falseAns}
              stop={stop}
            />
          </div>
          <div className="text-white ">
            <Jokers
              correctAns={Questions[next].options[Questions[next].answer]}
              fifty={Questions[next].options.find(
                (option) =>
                  Questions[next].options[Questions[next].answer] !== option
              )}
              jokerFifty={jokerFifty}
              setJokerFifty={setJokerFifty}
              jokerViewer={jokerViewer}
              setJokerViewer={setJokerViewer}
              jokerPhone={jokerPhone}
              setJokerPhone={setJokerPhone}
            />
          </div>
        </div>
        <div className="p-6 bg-[#061A48]  text-white rounded-lg border-4 border-white">
          <h2 className="text-xl lg:text-2xl">{Questions[next].question}</h2>
        </div>
        <div className="space-y-3">
          {Questions[next].options.map((option, i) => (
            <div className="" key={i}>
              <button
                disabled={selectedAns}
                className={`${trueAnswer == option && "answer correct"} ${
                  falseAnswer == option && "answer wrong"
                } flex text-xl bg-[#061A48] text-white p-4 min-w-[350px] rounded-lg border-4 border-white button transition-all duration-200`}
                onClick={() => Check(option)}
              >
                <p>{Questions[next].choices[i]}.)&nbsp;</p>
                {option}
              </button>
            </div>
          ))}
        </div>
        <div className="sm:hidden text-white text-lg">
          <h2 className="font-semibold">
            Yarışmacımız:&nbsp;
            <span className="font-bold text-g">{name.slice(0, 13)}</span>
          </h2>
          <p className="font-semibold">
          Sorunun Değeri:<span>{moneyReward[reward].amount}</span>{" "}
          </p>
          <button
            className="mt-3 bg-red-500 p-1 rounded-lg"
            onClick={() => setEndGame(false)}
          >
            Çekilmek İstiyorum
          </button>
        </div>
      </motion.div>

      <Rewards reward={reward} setEndGame={setEndGame} name={name} />
    </div>
  ) : (
    <motion.div
      initial={{ y: -500 }}
      animate={{ y: 0 }}
      className=" col-span-6 flex flex-col space-y-3"
    >
      <div>
        <h2 className="text-2xl">
          TEBRİKLER{" "}
          <span className="text-green-400 font-bold">
            {" "}
            {name ? name : "HARİKASINIZ!"}
          </span>
        </h2>
        <h2 className="text-2xl">
          KAZANDINIZ :&nbsp;
          <span className="font-bold text-3xl">{Reward()}</span>
        </h2>
      </div>

      <div className="flex flex-col space-y-3">
        <button
          initial={{ x: -700 }}
          animate={{ x: 0 }}
          className="border-2 font-semibold text-2xl border-[#805AB9] bg-black px-10 py-4 hover:bg-green-600 transition-all duration-200"
          onClick={() => setEndGame(true)}
        >
          Tekrar Oyna
        </button>
        <button
          className="border-2 font-semibold text-2xl border-[#805AB9] bg-black px-10 py-4 hover:bg-green-600 transition-all duration-200"
          onClick={() => setHome(true)}
        >
          Anasayfa
        </button>
      </div>
    </motion.div>
  );
};

export default GameUI;
