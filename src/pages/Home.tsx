import { BackgroundLines } from "../components/BackgroundLines";
import { Link } from "react-router-dom";
import React, { useState,useEffect } from "react";
import type { QuestionType } from "../App";
import wildlife from '../data/wildlife.json';
import forest from '../data/forest.json';
import economics from '../data/economics.json'
import geography from '../data/geography.json'
import SpotlightCard from "../components/SpotlightCard";
import Accordion from "../components/Accordion";
import Toast from "../components/Toast";

type HomeProps = {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setQuiz: React.Dispatch<React.SetStateAction<Record<string, QuestionType[]> | null>>;
  setName:  React.Dispatch<React.SetStateAction<string | null>>;
}

const Home: React.FC<HomeProps> = ({file,setFile, setQuiz, setName}) => {
  useEffect(() => {
    window.scroll(0,0);
  },[])
const [message,setErrorMessage] = useState< string|null >(null);
 const triggerToast = (msg: string) => { 
    setErrorMessage(null);
    setTimeout(() => {
      setErrorMessage(msg);
    }, 10);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 8000000) {
        triggerToast("File Size Too Big");
        return;
      }
      if (file.type !== "application/pdf") {
        triggerToast("Please upload a PDF only");
        return;
      }
      setFile(file);
      setName(file.name);
    }
  };
  return (
    <>
    <BackgroundLines className="absolute"/>
    <div className="min-h-screen py-16 xl:py-10 flex flex-col gap:32 items-center">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight ">
          Your Personalized NPTEL  <br /> Quiz Companion
        </h2>
        <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
          Upload your course PDFs or choose from our pre-loaded NPTEL courses. Practice and test yourself week-wise — in Practice Mode with instant feedback or Test Mode htmlFor real exam experience.
        </p>
        <div className="flex items-center justify-center w-64 sm:w-75 mt-10 cursor-pointer relative z-20">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-[#b19eef] border-dashed rounded-lg cursor-pointer bg-transparent dark:bg-transparent hover:bg-[#b19eef3f]">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-[#b19eef]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-[#b19eef]"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-[#b19eef]">PDF, TXT</p>
                    {file ? <p className="text-lg text-green-300 mt-6">{file.name}</p> : '' }
                    <input id="dropzone-file" type="file" className="text-[#b19eef] w-1/2 hidden" accept=".pdf" onChange={handleFileChange}/>
                </div>
            </label>
        </div> 
        {!file ? <button
          type="button"
          className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 disabled:opacity-50 disabled:cursor-not-allowed mt-3 mr-32 sm:mr-42 z-30 cursor-pointer"
          disabled={!file}
        >
          Generate Quiz
        </button> : 
          <button
          type="button"
          className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg  text-[6px] py-1 sm:text-sm px-5 sm:py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 disabled:opacity-50 disabled:cursor-not-allowed mt-3 mr-42 z-30 cursor-pointer"
          disabled={!file}
        >
          <Link to="/quiz">
            Generate Quiz
          </Link>
        </button>}
        <p className="text-lg text-white font-bold font-sans mt-8">Popular Courses</p>
        <div className="flex flex-wrap gap-7 w-64 sm:w-136 md:w-136 lg:w-206 xl:w-280 justify-start mt-8">
            <Link
              to="/quiz"
              key={0}
              onClick={() => {
                setName("Wild Life Ecology, IIT Kanpur");
                setQuiz(wildlife as Record<string, QuestionType[]>);
              }}
            >
              <SpotlightCard className="text-white cursor-pointer">
                <div className="flex flex-col justify-between h-full">
                  <h3>Wild Life Ecology, IIT Kanpur</h3>
                  <div>
                    <p>Year: 2024</p>
                    <p>Prof. Mainak Das, Dr. Ankur Awadhiya</p>
                  </div>
                </div>
              </SpotlightCard>
            </Link>
            <Link
              to="/quiz"
              key={1}
              onClick={() => {
                setName("Forests and their Management, IIT Kanpur");
                setQuiz(forest as Record<string, QuestionType[]>);
              }}
            >
              <SpotlightCard className="text-white cursor-pointer">
                <div className="flex flex-col justify-between h-full">
                  <h3>Forests and their Management, IIT Kanpur</h3>
                  <div>
                    <p>Year: 2025</p>
                    <p>Prof. Ankur Awadhiya</p>
                  </div>
                </div>
              </SpotlightCard>
            </Link>
            <Link
              to="/quiz"
              key={2}
              onClick={() => {
                setName("Conservation Economics, IIT Kanpur");
                setQuiz(economics as Record<string, QuestionType[]>);
              }}
            >
              <SpotlightCard className="text-white cursor-pointer">
                <div className="flex flex-col justify-between h-full">
                  <h3>Conservation Economics, IIT Kanpur</h3>
                  <div>
                    <p>Year: 2025</p>
                    <p>Dr. Ankur Awadhiya</p>
                  </div>
                </div>
              </SpotlightCard>
            </Link>
            <Link
              to="/quiz"
              key={3}
              onClick={() => {
                setName("Conservation Geography, IIT Kanpur");
                setQuiz(geography as Record<string, QuestionType[]>);
              }}
            >
              <SpotlightCard className="text-white cursor-pointer">
                <div className="flex flex-col justify-between h-full">
                  <h3>Conservation Geography, IIT Kanpur</h3>
                  <div>
                    <p>Year: 2024</p>
                    <p>Dr. Ankur Awadhiya</p>
                  </div>
                </div>
              </SpotlightCard>
            </Link>
        </div>
        {message && <Toast setErrorMessage={setErrorMessage} message={message}/>}
        <Accordion/>
    </div>
    </>
  )
};

export default Home