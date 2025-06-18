import { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import AnimatedContent from './AnimatedContent';

type FAQProps = {
  question: string;
  answer: string;
};

const FAQ = ({ question, answer }: FAQProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState('0px');

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight('0px');
    }
  }, [isOpen]);

  return (
    <div className='w-72 md:w-128 lg:w-5xl border-b border-purple-600/40 flex flex-col justify-start pt-8 pb-4'>
      <div className='flex flex-row justify-between items-center w-72 md:w-128 lg:w-5xl'>
        <p className='font-small text-xs md:text-md lg:text-lg lg:font-semibold mr-6'>
          {question}
        </p>
        {isOpen ? (
          <FaChevronUp className='cursor-pointer not-md: text-2xl fill-purple-600' onClick={() => setIsOpen(prev => !prev)} />
        ) : (
          <FaChevronDown className='cursor-pointer not-md: text-2xl' onClick={() => setIsOpen(prev => !prev)} />
        )}
      </div>
      <div
        className="transition-all duration-500 ease-in-out overflow-hidden"
        style={{ maxHeight }}
      >
        <div ref={contentRef}>
          <AnimatedContent
            distance={25}
            direction="vertical"
            reverse={false}
            duration={1}
            ease="power4.out"
            initialOpacity={0.0}
            animateOpacity
            scale={1.0}
            threshold={0.0}
            delay={0}
          >
            <p className='font-small text-xs md:text-md lg:text-lg lg:font-semibold mr-6 pt-8'>
              {answer}
            </p>
          </AnimatedContent>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
