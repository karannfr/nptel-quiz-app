import { useState } from 'react'

type QuestionProps = {
  question: string;
  options: string[];
  answer: string;
  mode: boolean;
  key: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  score: number;
  count: number;
  length: number;
  reveal: boolean;
}

const Question = ({ question, answer, options, mode, setIsOpen, setCount, count, length, setScore, reveal}: QuestionProps) => {
  const [answered, setAnswered] = useState<string | null>(null);
  const handleClick = (item: string) => {
    if (mode) {
    const prev = answered;
      if (prev === item) {
        setAnswered(null);
        if (item === answer) {
          setScore(score => score - 1);
        }
      } else {
        setAnswered(item);
        if (prev === answer) {
          setScore(score => score - 1);
        }
        if (item === answer) {
          setScore(score => score + 1);
        }
      }
    }
    else{
      setAnswered(item);
      setCount(prev => prev + 1);
      if(item == answer)
        setScore(prev => prev + 1)
      if (!mode && count + 1 === length) {
        setIsOpen(true);
      }
    }
  }
  return (
    <div className="flex flex-col items-center max-w-2xl mb-16">
      <div className="mb-4 text-2xl font-semibold text-center w-auto">{question}</div>
      <div className="flex flex-wrap justify-center gap-6 max-w-2xl">
        {options.map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => handleClick(item)}
              className={`flex items-center justify-center min-w-[200px] min-h-[100px] flex-[1_0_calc(50%-24px)] px-6 py-4 border border-black/10 rounded-lg shadow-lg text-center  cursor-pointer transition-all duration-200 ease-in-out text-black
                hover:scale-105
                ${!reveal ? answered ? answered==answer ? answer==item ? 'bg-green-500' : 'bg-white' : answered == item ? 'bg-red-500' : answer==item ?  'bg-green-500' : 'bg-white' : 'bg-white' : answered ? answered==item ? ' bg-purple-400' : 'bg-white' : 'bg-white'}
                disabled:cursor-not-allowed 
                disabled:pointer-events-none
                text-lg
                font-medium
              `}
              disabled={!!answered && !mode}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
