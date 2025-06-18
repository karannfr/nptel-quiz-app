import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { QuestionType } from '../App';
import Question from '../components/Question';
import SpringModal from '../components/Modal';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

type QuizWeekProps = {
  isChecked: boolean;
  quiz: Record<string, QuestionType[]> | null;
  setQuiz: React.Dispatch<React.SetStateAction<Record<string, QuestionType[]> | null>>
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  name: string|null
  setName : React.Dispatch<React.SetStateAction<string | null>>
  weekList: string[]
};

const submitQuiz = (setReveal: React.Dispatch<React.SetStateAction<boolean>>, setIsOpen:React.Dispatch<React.SetStateAction<boolean>>) => {
  setReveal(false);
  setIsOpen(true);
}

const QuizWeek = ({ isChecked, quiz, setQuiz, setName, name, weekList }: QuizWeekProps) => {
  const { id } = useParams();
  const [questions, setQuestions] = useState<QuestionType[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [count,setCount] = useState(0);
  const [score,setScore] = useState(0);
  const [reveal, setReveal] = useState(isChecked);
  useEffect(() => {
    if (!quiz) {
      const storedQuiz = sessionStorage.getItem("quiz");
      if (storedQuiz) {
        const parsed = JSON.parse(storedQuiz);
        setQuiz(parsed);
        setName(sessionStorage.getItem("name"));
        return;
      }
      return;
    }

    if (!id) return;

    if (id === 'all') {
      const combined: QuestionType[] = Object.values(quiz).flat();
      setQuestions(combined);
    } else {
      const weekKey = `Week ${id}`;
      setQuestions(quiz[weekKey] || null);
    }
    setCount(0);
    setScore(0);
    setReveal(isChecked);
    window.scrollTo(0, 0)
  }, [id, quiz]);

  return (
    !quiz  ? <div className="h-screen text-amber-50 flex flex-col items-center justify-center mx-auto w-max-4xl text-2xl">
      No Quiz Data Found Please Go Back to Home and Upload a File or Choose a Course
    </div>: 
    <div className="min-h-screen flex flex-col items-center mx-auto pt-16 w-max-4xl pb-16 text-white">
      <div className='flex flex-row items-center gap-8 mb-16'>
        <Link to={id === '1' ? '/quiz/all' : id === 'all' ? `/quiz/${weekList?.length}`: `/quiz/${Number(id)-1}`}><FaChevronLeft className='fill-purple-500 mt-1'/></Link>
        <div className='text-[11px] md:text-lg lg:text-2xl font-semibold text-purple-500 '>{name} - {id == 'all' ? 'All Weeks' :  `Week ${id}`}</div>
        <Link to={id === 'all' ? '/quiz/1' : id === String(weekList?.length) ? '/quiz/all' : `/quiz/${Number(id)+1}`}><FaChevronRight className='fill-purple-500 mt-1'/></Link>
      </div>
      {questions?.map((item, index) => (
        <Question
          key={`${id}-${index}`}
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
        weeklist={weekList}
      />
    </div>
  );
};

export default QuizWeek;
