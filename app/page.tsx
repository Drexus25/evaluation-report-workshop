import { Icon } from "@iconify/react";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col gap-6 justify-center items-center font-sans">
      <h1 className="text-black text-center text-7xl font-sans">Report<br />Evaluation<br />Website</h1>
      <p className="text-black text-center text-md font-sans w-[30%]">A centralized platform that enables organization members to easily access and review their report evaluations, including performance scores, feedback, and evaluation results.</p>
      <button className="flex flex-row gap-2 justify-center items-center bg-[#FFEFB3] text-[#10704b] border-2 border-[#10704b] px-10 py-2 rounded-full font-sans font-semibold hover:bg-[#e7e0bc] hover:scale-105 cursor-pointer transition-all duration-300">See My Report <Icon width={20} height={20} icon="ri:arrow-right-line" className="-rotate-45"/></button>
    </div>
  );
}
