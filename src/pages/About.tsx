import { Carousel } from "../components/Carousel";
import { BackgroundLines } from "../components/BackgroundLines";
import ProfileCard from '../components/ProfileCard'
import karan from '../assets/karan-min.png'
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
    }, [])
  const slideData = [
    {
      title: "Upload & Convert",
      button: "Try PDF Upload",
      src: "https://quiztelify.vercel.app/image1.png",
    },
    {
      title: "Quiz from Library",
      button: "Browse Quizzes",
      src: "https://quiztelify.vercel.app/image2.png",
    },
    {
      title: "Practice or Test",
      button: "Choose a Mode",
      src: "https://quiztelify.vercel.app/image3.png",
    },
    {
      title: "Track Your Progress",
      button: "Coming Soon",
      src: "https://quiztelify.vercel.app/Opengraph.png",
    },
  ];
  return (
    <div className="relative overflow-hidden w-full h-full py-20 flex flex-col items-center">
      <BackgroundLines className="absolute"/>
      <Carousel slides={slideData} />
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-6xl py-2 md:py-10 font-bold tracking-tight mt-16">
        About <span className="text-purple-600">Quiz</span>telify
      </h2>
      <div className="max-w-3xl text-center mb-16 text-white mx-8  sm:mx-12 md:mx-auto">
        <h3 className="text-xl md:text-2xl font-semibold text-purple-700 mb-4">About the Website</h3>
        <p className="text-sm md:text-lg">
          Quiztelify is a smart quiz generator tailored for NPTEL course content. You can either upload a course PDF to automatically parse and generate a quiz, or choose from a curated library of preloaded quizzes.
          <br className="hidden md:block" /><br />
          Once the quiz is generated, simply select a week and dive into your questions. You can attempt quizzes in two modes:
        </p>
        <ul className="text-sm md:text-lg list-disc list-inside mt-4">
          <li><span className="font-semibold">Practice Mode:</span> View answers instantly and learn as you go.</li>
          <li><span className="font-semibold">Test Mode:</span> Simulates an exam-like experience without immediate feedback.</li>
        </ul>
        <p className="text-sm md:text-lg mt-4">
          All questions are extracted using AI, filtered for validity, and structured in a clean weekly format to help students study more efficiently.
        </p>
      </div>
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-6xl py-2 md:py-10 font-bold tracking-tight mb-8">
        About The <span className="text-purple-600">Creator</span>
      </h2>
      <ProfileCard
        name="Karan Dugar"
        title="Full Stack Web Developer | MERN | VIT'25"
        handle="karannfr"
        status="Online"
        contactText="Contact Me"
        avatarUrl={karan}
        iconUrl="/headset.svg"
        showUserInfo={true}
        enableTilt={true}
        onContactClick={() => console.log('Contact clicked')}
      />
    </div>
  );
};

export default About

