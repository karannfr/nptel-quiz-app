import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom'
import RootLayout from "./layouts/RootLayout"
import Home from './pages/Home'
import { useState,useMemo } from 'react';
import Quiz from './pages/Quiz';
import QuizWeek from './pages/QuizWeek';
import Missing from './pages/missing';
import About from './pages/About';
export type QuestionType = {
  question: string;
  options: string[];
  answer: string;
};

function App() {
  const [isChecked, setIsChecked] = useState(false)
  const [file, setFile] = useState< File | null> (null);
  const [quiz,setQuiz] = useState <Record<string,QuestionType[]> | null> (null);
  const [name,setName] = useState <string | null> (null);
  const weekList = useMemo(() => {
    if (!quiz) return [];
    return Object.keys(quiz);
  }, [quiz]);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout/>}>
        <Route index element={<Home file={file} setFile={setFile} setQuiz={setQuiz} setName={setName}/>}/>
        <Route path='/quiz' element={<Quiz file={file} quiz={quiz} setQuiz={setQuiz} isChecked={isChecked} setIsChecked={setIsChecked} name={name} setName={setName} weekList={weekList}/>}/>
        <Route path='/quiz/:id' element={<QuizWeek setIsChecked={setIsChecked} isChecked={isChecked} quiz={quiz} setQuiz={setQuiz} name={name} setName={setName} weekList={weekList}/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='*' element={<Missing/>}/>
      </Route>
    )
  )
  return (
    <div className='mt-4 min-h-screen'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
