import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom'
import RootLayout from "./layouts/RootLayout"
import Home from './Home'
import { useState } from 'react';
import Quiz from './Quiz';
import QuizWeek from './QuizWeek';


export type QuestionType = {
  question: string;
  options: string[];
  answer: string;
};

function App() {
  const [isChecked, setIsChecked] = useState(false)
  const [file, setFile] = useState< File | null> (null);
  const [quiz,setQuiz] = useState <Record<string,QuestionType[]> | null> (null);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout/>}>
        <Route index element={<Home file={file} setFile={setFile} setQuiz={setQuiz}/>}/>
        <Route path='/quiz' element={<Quiz file={file} quiz={quiz} setQuiz={setQuiz} isChecked={isChecked} setIsChecked={setIsChecked}/>}/>
        <Route path='/quiz/:id' element={<QuizWeek isChecked={isChecked} quiz={quiz}/>}/>
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
