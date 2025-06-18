import React, { useEffect, useState } from 'react'
import LoadingThreeDotsPulse from '../components/Loader'
import { GoogleGenAI } from "@google/genai";
import { Dropdown, DropdownItem, ThemeProvider} from "flowbite-react";
import { BackgroundLines } from '../components/BackgroundLines';
import { Link } from 'react-router-dom';
import Switcher11 from '../components/Switcher';
import type { QuestionType } from '../App';
import SplashCursor from '../components/SplashCursor';

type QuizProps = {
  isChecked: boolean;
  setIsChecked : React.Dispatch<React.SetStateAction<boolean>>;
  file: File | null;
  quiz: Record<string, QuestionType[]> | null;
  setQuiz : React.Dispatch<React.SetStateAction<Record<string, QuestionType[]> | null>>
  name: string|null
  setName : React.Dispatch<React.SetStateAction<string | null>>
  weekList: string[];
}

const Quiz = ({ file, quiz, setQuiz, isChecked, setIsChecked, setName, name, weekList}: QuizProps) => {
  const firstHalfPrompt = `
  You are given a course quiz PDF document that contains multiple-choice quiz questions organized week-wise. Each section starts with a heading such as “Week 1”, “Week 2”, and so on.

  Your task is to:
  - Detect the total number of weeks present in the document.
  - Extract only the **first half** of the weeks (e.g., if there are 12 weeks, extract Week 1 to Week 6).
  - Under each detected week, extract all quiz questions that meet the following criteria:

  Each question must have:
  - A question string
  - Exactly **4 options**
  - One option clearly marked as the correct answer using **bold formatting** in the PDF

  Return your output strictly in the following JSON format:

  {
    "Week 1": [
      {
        "question": "Example question?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "answer": "Option B"
      }
    ],
    "Week 2": [...],
    ...
  }

  Instructions:
  - Only include valid weeks (do not fabricate or assume week labels).
  - Only include questions with a clearly bolded correct answer and exactly four options.
  - The "answer" value must exactly match the bolded option.
  - Do not include any explanation, extra text, or notes outside of the JSON.
  - Only return valid JSON as described above.
  - If you feel the pdf content is not correct return a respsone with a message saying "Please upload a valid document".
  `.trim();
  const secondHalfPrompt = `
  You are given a course quiz PDF document that contains multiple-choice quiz questions organized week-wise. Each section begins with a heading such as “Week 1”, “Week 2”, and so on.

  Your task is to:
  - Detect the total number of weeks present in the document.
  - Extract only the **second half** of the weeks (e.g., if there are 12 weeks, extract Week 7 to Week 12).
  - Under each detected week, extract all quiz questions that meet the following criteria:

  Each question must have:
  - A question string
  - Exactly **4 options**
  - One option clearly marked as the correct answer using **bold formatting** in the PDF

  Return your output strictly in the following JSON format:

  {
    "Week 7": [
      {
        "question": "Example question?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "answer": "Option D"
      }
    ],
    "Week 8": [...],
    ...
  }

  Instructions:
  - Only include valid weeks (do not fabricate or assume week labels).
  - Only include questions with a clearly bolded correct answer and exactly four options.
  - The "answer" value must exactly match the bolded option.
  - Do not include any explanation, extra text, or notes outside of the JSON.
  - Only return valid JSON as described above.
  - If you feel the pdf content is not correct return a respsone with a message saying "Please upload a valid document".
  `.trim();
  const [week,setWeek] = useState <string|null> (null);
  const [isLoading, setIsLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const customTheme = {
    dropdown: {
      arrowIcon: "ml-2 h-4 w-4",
      content: "py-1 focus:outline-none h-50 overflow-y-auto",
      floating: {
        animation: "transition-opacity",
        arrow: {
          base: "absolute z-10 h-2 w-2 rotate-45",
          style: {
            dark: "bg-gray-900 dark:bg-gray-700",
            light: "bg-white",
            auto: "bg-white dark:bg-gray-700"
          },
          placement: "-4px"
        },
        base: "z-10 w-fit divide-y divide-gray-100 rounded shadow focus:outline-none",
        content: "py-1 text-sm text-gray-700 dark:text-gray-200",
        divider: "my-1 h-px bg-gray-100 dark:bg-gray-600",
        header: "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200",
        hidden: "invisible opacity-0",
        item: {
          container: "",
          base: "flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white",
          icon: "mr-2 h-4 w-4"
        },
        style: {
          dark: "bg-gray-900 text-white dark:bg-gray-700",
          light: "border border-gray-200 bg-white text-gray-900",
          auto: "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white"
        },
        target: "w-38 flex justify-between"
      },
      inlineWrapper: "flex"
    }
  };
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
  useEffect(() => {
    const generateQuiz = async () => {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async () => {
        setIsLoading(true);
        const base64Data = (reader.result as string).split(',')[1];
        const contents = [
          { text: firstHalfPrompt },
          {
            inlineData: {
              mimeType: file.type,
              data: base64Data,
            },
          },
        ];
        let first: string = "";
        try {
          const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents,
          });
          const result = await response.text;
          const trimmedResult = (result as string).trim();
          if (trimmedResult.includes("Please upload a valid document")) {
            setInvalid(true);
            setIsLoading(false);
            return;
          } else {
            setInvalid(false);
          }
          first = first + trimmedResult.substring(7, trimmedResult.length - 6) + ',';
        } catch (err) {
          console.error("Error calling Gemini:", err);
        }
        contents[0].text=secondHalfPrompt;
        try {
          const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents,
          });
          const result = await response.text;
          const trimmedResult = (result as string).trim();
          if (trimmedResult.includes("Please upload a valid document")) {
            setInvalid(true);
            setIsLoading(false);
            return;
          } else {
            setInvalid(false);
          }
          first = first + trimmedResult.substring(9, trimmedResult.length - 3);
          setQuiz(JSON.parse(first));
          sessionStorage.setItem("quiz", first);
          sessionStorage.setItem("name" , name as string);
        } catch (err) {
          console.error("Error calling Gemini:", err);
        } finally{
          setIsLoading(false);
        }
      };
      reader.readAsDataURL(file);
    };
    generateQuiz();
    if(!file && !quiz){
      setQuiz(JSON.parse((sessionStorage.getItem("quiz")) as string));
      setName(sessionStorage.getItem("name"));
    }
    if(!file && quiz){
      sessionStorage.setItem("quiz", JSON.stringify(quiz));
      sessionStorage.setItem("name" , name as string);
    }
  }, [file, setQuiz]);

  const handleDropdown = (week: string) => {
        if(week!=='all')
          setWeek(week.substring(5));
        else
          setWeek(week);
  }
  
  return (
    isLoading ? 
    <div className='flex h-[800px] flex-col justify-center'>
      <div  className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-md md:text-xl    lg:text-2xl font-sans py-2 md:py-10 relative z-9999 font-bold tracking-tight">Generating your quiz... 
        <br />Just a moment while we prepare your questions.
      </div>
      <LoadingThreeDotsPulse/>
      <SplashCursor/>
    </div> 
    :
    invalid ? 
    <div className='flex h-[800px] flex-col justify-center items-center'>
      <div  className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-md md:text-xl    lg:text-2xl font-sans py-2 md:py-10 relative z-9999 font-bold tracking-tight">Invalid Document 
        <br />Please Try Again
      </div>
      <Link to='/' className=" cursor-pointer focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 my-8 z-9999">Back to homepage</Link>
      <SplashCursor/>
    </div>
    :
    <>
    <BackgroundLines className='absolute'/>
     <div className="flex items-center justify-start w-full flex-col px-4 min-h-screen py-32">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          Your Personalized NPTEL  <br /> Quiz Companion
        </h2>
        <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
          Upload your course PDFs or choose from our pre-loaded NPTEL courses. Practice and test yourself week-wise — in Practice Mode with instant feedback or Test Mode htmlFor real exam experience.
        </p>
        <p className='text-white mt-8 max-w-xl mx-auto text-center'><span className='font-bold'>Note:</span> Please verify the quiz name displayed below, should be same as Uploaded File Name/ Course Name If you notice any discrepancies, kindly return to the home page and navigate back to this page.</p>
        <p className="max-w-xl mx-auto text-xl md:text-2xl text-purple-700 text-center mt-8 font-bold">
          {name}
        </p>
        <div className='mt-8 flex justify-center gap-6 items-center'>
          <ThemeProvider theme={customTheme}>
            <Dropdown label={week ? week === 'all' ? "All Weeks" : `Week ${week}` : "Select Week"} dismissOnClick={false} id='dropdown' >
              {weekList.map((weekKey, index) => (
                  <DropdownItem key={index} onClick={() => handleDropdown(weekKey)}>
                    {weekKey}
                  </DropdownItem>
                ))}
              <DropdownItem onClick={() => handleDropdown('all')}>All Weeks</DropdownItem>
            </Dropdown>
          </ThemeProvider>
          {!week ? <button
            type="button"
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 disabled:opacity-50 disabled:cursor-not-allowed z-30 cursor-pointer"
            disabled={!week}
          >
            Start Quiz
          </button> : 
            <button
            type="button"
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 disabled:opacity-50 disabled:cursor-not-allowed z-30 cursor-pointer"
            disabled={!week}
          >
            <Link to={`/quiz/${week}`}>
              Start Quiz
            </Link>
          </button>}
          </div>
          <Switcher11 isChecked={isChecked} setIsChecked={setIsChecked}/>
    </div>
    </>
  );
};

export default Quiz;
