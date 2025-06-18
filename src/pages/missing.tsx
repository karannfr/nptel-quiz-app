import { BackgroundLines } from "../components/BackgroundLines"
import { Link } from "react-router-dom"
import SplashCursor from "../components/SplashCursor"
const Missing = () => {
  return (
    <div className="flex flex-col justify-start items-center min-h-screen pt-48">
      <SplashCursor/>
      <BackgroundLines className="absolute"/>
      <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-5xl md:text-6xl lg:text-9xl font-sans relative z-9999 font-bold tracking-tight py-0">404</h1>
      <h3 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-9999 font-bold tracking-tight">Sorry, the page can't be found</h3>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center z-9999">The page you were looking for appears to have been <br />moved, deleted or does not exist.</p>
      <Link to='/' className=" cursor-pointer focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 my-8 z-9999">Back to homepage</Link>
    </div>
  )
}

export default Missing