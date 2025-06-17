import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { QuestionType } from './App';
import Question from './Question';

type QuizWeekProps = {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  quiz: Record<string, QuestionType[]> | null;
};

const QuizWeek = ({ isChecked, setIsChecked, quiz }: QuizWeekProps) => {
  const { id } = useParams(); // get the route param
  const [questions, setQuestions] = useState<QuestionType[] | null>(null);

  useEffect(() => {
    if (!quiz || !id) return;

    if (id === 'all') {
      // Special route param for "All Weeks"
      const combined: QuestionType[] = Object.values(quiz).flat();
      setQuestions(combined);
    } else {
      const weekKey = `Week ${id}`;
      setQuestions(quiz[weekKey] || null);
    }
  }, [quiz, id]);

  return (
    <div className="h-screen text-amber-50 flex flex-col items-center mx-auto pt-48 w-max-4xl">
      {questions?.map((item, index) => (
        <Question
          key={index}
          question={item.question}
          options={item.options}
          answer={item.answer}
        />
      ))}
    </div>
  );
};

export default QuizWeek;
