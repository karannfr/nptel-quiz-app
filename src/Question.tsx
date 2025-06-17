import { useState } from 'react'

type QuestionProps = {
  question: string;
  options: string[];
  answer: string;
  key: number
}

const Question = ({question,answer,options} : QuestionProps) => {
  const [answered,setAnswered] = useState <string | null>(null);
  return (
    <div>
      <div>{question}</div>
      <div className='flex flex-row wrap'>
        {options.map((item) => (
          <div className='w-1/2'>{item}</div>
        ))}
      </div>
    </div>
  )
}

export default Question