import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { QuestionType } from './App';
import Question from './Question';
import SpringModal from './components/Modal';

type QuizWeekProps = {
  isChecked: boolean;
  quiz: Record<string, QuestionType[]> | null;
};

const submitQuiz = (setReveal: React.Dispatch<React.SetStateAction<boolean>>, setIsOpen:React.Dispatch<React.SetStateAction<boolean>>) => {
  setReveal(false);
  setIsOpen(true);
}

const QuizWeek = ({ isChecked, quiz }: QuizWeekProps) => {
  const { id } = useParams(); // get the route param
  const [questions, setQuestions] = useState<QuestionType[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [count,setCount] = useState(0);
  const [score,setScore] = useState(0);
  const [reveal, setReveal] = useState(isChecked);
  useEffect(() => {
    if (!quiz || !id) return;
    if (id === '13') {
      const combined: QuestionType[] = Object.values(quiz).flat();
      setQuestions(combined);
    } else {
      const weekKey = `Week ${id}`;
      setQuestions(quiz[weekKey] || null);
    }
    setCount(0);
    setScore(0);
    setReveal(isChecked);
  }, [id]);

  return (
    !quiz  ? <div className="h-screen text-amber-50 flex flex-col items-center justify-center mx-auto w-max-4xl text-2xl">
      No Quiz Data Found Please Go Back to Home and Upload a File or Choose a Course
    </div>: 
    <div className="h-screen text-amber-50 flex flex-col items-center mx-auto pt-32 w-max-4xl">
      {questions?.map((item, index) => (
        <Question
          key={Number(id+String(index))}
          question={item.question}
          options={item.options}
          answer={item.answer}
          mode={isChecked}
          reveal={reveal}
          setIsOpen={setIsOpen}
          setScore={setScore}
          count={count}
          setCount={setCount}
          length={questions.length}
          score={score}
        />
      ))}
      {isChecked && <button
            type="button"
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 disabled:opacity-50 disabled:cursor-not-allowed z-30 cursor-pointer"
            onClick={() => submitQuiz(setReveal,setIsOpen)}>
            Submit Quiz
          </button>}
      <SpringModal 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        length={questions?.length}
        score={score}
        id={id}
      />
    </div>
  );
};

export default QuizWeek;
